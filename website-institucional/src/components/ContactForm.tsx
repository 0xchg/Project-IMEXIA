import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import { ChevronDown, CircleCheck } from 'lucide-react'
import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { contactLinks } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import { buttonBase, buttonVariants } from './buttonStyles.ts'

type FieldName = 'name' | 'email' | 'phone' | 'service' | 'message'
type Values = Record<FieldName, string>
type Errors = Partial<Record<Exclude<FieldName, 'service'>, string>>
// sent: WhatsApp opened in a new tab; blocked: the browser stopped the new tab
type Status = 'idle' | 'sent' | 'blocked'

const empty: Values = { name: '', email: '', phone: '', service: '', message: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const order = ['name', 'email', 'phone', 'message'] as const

const control =
  'min-h-11 w-full rounded-box border border-border bg-canvas px-4 py-3 text-base text-ink transition-colors duration-150 focus:border-accent aria-invalid:border-danger'

interface FieldProps {
  id: string
  label: ReactNode
  error?: string
  className?: string
  children: ReactNode
}

function Field({ id, label, error, className = '', children }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

// no server behind the site: the form writes the message and hands it to WhatsApp
function ContactForm() {
  const { contact, services } = useContent()
  const { fields } = contact
  const prefix = useId()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [link, setLink] = useState('')

  const idFor = (name: FieldName) => `${prefix}-${name}`
  const describe = (name: Exclude<FieldName, 'service'>) => ({
    id: idFor(name),
    name,
    value: values[name],
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${idFor(name)}-error` : undefined,
  })

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name as FieldName
    setValues((current) => ({ ...current, [name]: event.target.value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const validate = ({ name, email, phone, message }: Values): Errors => {
    const digits = phone.replace(/\D/g, '')
    return {
      name: name.trim() ? undefined : contact.errors.name,
      email: emailPattern.test(email.trim()) ? undefined : contact.errors.email,
      phone: !phone.trim() || (digits.length >= 9 && digits.length <= 15) ? undefined : contact.errors.phone,
      message: message.trim() ? undefined : contact.errors.message,
    }
  }

  const compose = ({ name, email, phone, service, message }: Values) => {
    const serviceTitle = services.find(({ id }) => id === service)?.title ?? contact.serviceOther
    return [
      contact.greeting,
      '',
      `${fields.name}: ${name.trim()}`,
      `${fields.email}: ${email.trim()}`,
      ...(phone.trim() ? [`${fields.phone}: ${phone.trim()}`] : []),
      `${fields.service}: ${serviceTitle}`,
      '',
      message.trim(),
    ].join('\n')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = order.find((name) => found[name])
    if (firstInvalid) {
      document.getElementById(idFor(firstInvalid))?.focus()
      setStatus('idle')
      return
    }
    const url = `${contactLinks.whatsapp}?text=${encodeURIComponent(compose(values))}`
    setLink(url)
    const opened = window.open(url, '_blank')
    if (opened) opened.opener = null
    setStatus(opened ? 'sent' : 'blocked')
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-6 rounded-box bg-surface p-6 md:p-8">
      <h2 className="text-2xl font-semibold">{contact.formTitle}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id={idFor('name')} label={fields.name} error={errors.name}>
          <input {...describe('name')} type="text" autoComplete="name" onChange={update} className={control} />
        </Field>
        <Field id={idFor('email')} label={fields.email} error={errors.email}>
          <input {...describe('email')} type="email" autoComplete="email" onChange={update} className={control} />
        </Field>
        <Field
          id={idFor('phone')}
          label={
            <>
              {fields.phone} <span className="font-normal text-muted">({contact.optional})</span>
            </>
          }
          error={errors.phone}
        >
          <input {...describe('phone')} type="tel" autoComplete="tel" onChange={update} className={control} />
        </Field>
        <Field id={idFor('service')} label={fields.service}>
          <div className="relative">
            <select
              id={idFor('service')}
              name="service"
              value={values.service}
              onChange={update}
              className={`${control} appearance-none pr-10`}
            >
              <option value="">{contact.serviceOther}</option>
              {services.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
            />
          </div>
        </Field>
        <Field id={idFor('message')} label={fields.message} error={errors.message} className="md:col-span-2">
          <textarea {...describe('message')} rows={5} onChange={update} className={`${control} resize-y`} />
        </Field>
      </div>

      <div className="flex flex-col items-start gap-4">
        <button type="submit" className={`${buttonBase} ${buttonVariants.primary}`}>
          <SiWhatsapp aria-hidden="true" title="" className="size-5" />
          {contact.submit}
        </button>
        <div role="status" className="text-sm">
          {status === 'sent' && (
            <p className="flex items-start gap-2">
              <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-accent" />
              <span>
                {contact.sent}{' '}
                <a href={link} target="_blank" rel="noreferrer" className="font-semibold text-accent underline">
                  {contact.openWhatsapp}
                </a>
              </span>
            </p>
          )}
          {status === 'blocked' && (
            <p>
              {contact.blocked}{' '}
              <a href={link} target="_blank" rel="noreferrer" className="font-semibold text-accent underline">
                {contact.openWhatsapp}
              </a>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default ContactForm
