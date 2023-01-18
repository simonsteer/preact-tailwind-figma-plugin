import { RouteComponent } from '~/types'
import { useRouteTo } from '~/ui/lib'

export const Overview: RouteComponent<'Overview'> = ({ name, pages }) => {
  const routeTo = useRouteTo()

  return (
    <div className="p-3">
      <h1>Overview</h1>
      <p>
        {name} has {pages} pages
      </p>
      <button
        className="p-1 rounded-md bg-sky-400 mt-1"
        onClick={() => routeTo('Home')}
      >
        go to home
      </button>
    </div>
  )
}
