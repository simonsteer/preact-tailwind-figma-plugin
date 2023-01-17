import { RouteComponent } from '~/shared/types/routes'
import { useRouteTo } from '~/ui/hooks'

export const About: RouteComponent<'About'> = ({ data }) => {
  const routeTo = useRouteTo()

  return (
    <div>
      <h1>{data}</h1>
      <button
        className="p-3 rounded-md bg-sky-400 mt-4"
        onClick={() => routeTo('Home')}
      >
        go to home
      </button>
    </div>
  )
}
