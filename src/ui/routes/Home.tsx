import { RouteComponent } from '~/types'
import { useRouteTo } from '~/ui/lib'

export const Home: RouteComponent<'Home'> = () => {
  const routeTo = useRouteTo()

  return (
    <div className="p-3">
      <h1>Home</h1>
      <button
        className="p-1 rounded-md bg-sky-400 mt-1"
        onClick={() => routeTo('About')}
      >
        go to about
      </button>
    </div>
  )
}
