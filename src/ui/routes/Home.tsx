import { RouteComponent } from '~/shared/types/routes'
import { useRouteTo } from '~/ui/hooks'

export const Home: RouteComponent<'Home'> = ({ data }) => {
  const routeTo = useRouteTo()

  return (
    <div>
      <h1>{data}</h1>
      <button
        className="p-3 rounded-md bg-sky-400 mt-4"
        onClick={() => routeTo('About')}
      >
        go to about
      </button>
    </div>
  )
}
