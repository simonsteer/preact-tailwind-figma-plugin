import clsx from 'clsx'
import { RouteComponent } from '~/types'
import { useRouteTo, useAPI, useSelection } from '~/ui/lib'

export const About: RouteComponent<'About'> = () => {
  const routeTo = useRouteTo()
  const api = useAPI()

  const selection = useSelection()

  return (
    <div className="p-3 text-sm">
      <h1>About</h1>
      <button
        className="p-1 rounded-md bg-sky-400 mt-1"
        onClick={() => routeTo('Overview', 2)}
      >
        go to overview
      </button>
      <button
        className="p-1 rounded-md bg-red-400 ml-1 text-white"
        onClick={() => api('createRectangles', 3, 0.7)}
      >
        create rectangles
      </button>
      <h3 className="mt-4 underline">Selection:</h3>
      <div className="flex flex-wrap gap-1 my-1">
        {selection.map(node => (
          <div key={node.id} className="p-1 bg-teal-600 text-white">
            {node.name}
          </div>
        ))}
      </div>
      <button
        disabled={selection.length === 0}
        className={clsx(
          'p-1 rounded-md bg-stone-300',
          selection.length === 0 && 'opacity-50'
        )}
        onClick={() =>
          api(
            'deleteNodes',
            selection.map(s => s.id)
          )
        }
      >
        delete selected nodes
      </button>
    </div>
  )
}
