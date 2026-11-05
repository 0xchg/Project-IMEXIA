// shared by ButtonLink and the form's submit button, so links and buttons look the same
export const buttonVariants = {
  primary: 'bg-accent text-canvas hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/40',
  outline: 'border border-canvas/40 text-canvas hover:border-canvas hover:bg-canvas/10',
}

export const buttonBase =
  'inline-flex min-h-11 items-center gap-2 rounded-box px-6 font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95'
