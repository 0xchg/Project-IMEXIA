// shared by ButtonLink and the form's submit button, so links and buttons look the same
export const buttonVariants = {
  primary: 'bg-accent-fill text-on-accent hover:bg-accent-strong hover:shadow-lg hover:shadow-accent-fill/40',
  outline: 'border border-on-deep/40 text-on-deep hover:border-on-deep hover:bg-on-deep/10',
}

export const buttonBase =
  'group inline-flex min-h-11 items-center gap-2 rounded-box px-6 text-sm font-semibold tracking-wide uppercase transition duration-200 hover:-translate-y-0.5 active:scale-95'
