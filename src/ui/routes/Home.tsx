import { RouteComponent } from '~/shared/types/routes'
import { useRouteTo } from '~/ui/hooks'

export const Home: RouteComponent<'Home'> = ({ data }) => {
  const routeTo = useRouteTo()

  return (
    <div className="p-3">
      <h1>{data}</h1>
      <button
        className="p-1 rounded-md bg-sky-400 mt-1"
        onClick={() => routeTo('About')}
      >
        go to about
      </button>
    </div>
  )
}
