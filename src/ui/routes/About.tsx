import { useState } from 'react'
import { RouteComponent } from '~/shared/types/routes'
import { useRouteTo, useAPI, useSelection } from '~/ui/hooks'

export const About: RouteComponent<'About'> = ({ data }) => {
  const routeTo = useRouteTo()
  const api = useAPI()

  const [topLevelFrames, setTopLevelFrames] = useState<
    { id: string; name: string }[]
  >([])

  const selection = useSelection()

  return (
    <div className="p-3">
      <h1>{data}</h1>
      <button
        className="p-1 rounded-md bg-sky-400 mt-1"
        onClick={() => routeTo('Home')}
      >
        go to home
      </button>
      <button
        className="p-1 rounded-md bg-red-400 ml-1 text-white"
        onClick={async () => {
          setTopLevelFrames(await api('getTopLevelFrames'))
        }}
      >
        get top-level frames
      </button>
      <div className="mt-4 flex flex-wrap gap-1">
        {topLevelFrames.map(frame => (
          <div key={frame.id} className="p-1 bg-neutral-600 text-white">
            {frame.name}
          </div>
        ))}
      </div>
      <h3 className="mt-4 mb-1 underline">Selection:</h3>
      <div className="flex flex-wrap gap-1">
        {selection.map(node => (
          <div key={node.id} className="p-1 bg-teal-600 text-white">
            {node.name}
          </div>
        ))}
      </div>
    </div>
  )
}
