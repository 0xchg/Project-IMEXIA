// the two drifting lights behind the navy sections; the parent needs `relative isolate overflow-hidden`
function Glows() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -top-1/2 -right-1/3 -z-10 aspect-square w-full animate-drift bg-[radial-gradient(closest-side,var(--color-accent-fill),transparent)] opacity-60 motion-reduce:animate-none lg:w-2/3"
      />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -bottom-1/2 -z-10 aspect-square w-full animate-drift bg-[radial-gradient(closest-side,var(--color-glow),transparent)] opacity-30 [animation-direction:alternate-reverse] motion-reduce:animate-none lg:w-1/2"
      />
    </>
  )
}

export default Glows
