import figmaLogo from '~/assets/figma-logo.svg'

export default function App() {
  return (
    <div className="p-5">
      <img className="w-20 mx-auto mb-5" src={figmaLogo} />
      <p className="text-center text-neutral-800 text-sm font-bold">
        Welcome to my plugin!
      </p>
    </div>
  )
}
