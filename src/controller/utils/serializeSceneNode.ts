import { SerializedSceneNode } from '~/shared/types'

export function serializeSceneNode({
  id,
  name,
  absoluteTransform,
  componentPropertyReferences,
  exportSettings,
  height,
  locked,
  parent,
  relativeTransform,
  removed,
  stuckNodes,
  type,
  visible,
  width,
  x,
  y,
  ...rest
}: SceneNode): SerializedSceneNode {
  let children: SerializedSceneNode[] = []
  if ('children' in rest) {
    children = rest.children.map(serializeSceneNode)
  }

  return {
    id,
    name,
    type,
    children,
    absoluteTransform,
    componentPropertyReferences,
    exportSettings,
    height,
    locked,
    parent: parent.id,
    relativeTransform,
    removed,
    stuckNodes: stuckNodes.map(node => node.id),
    visible,
    width,
    x,
    y,
  }
}
