export type SelectionData = {
  data: SerializedSceneNode[]
  id: string
}

export type SerializedSceneNode = {
  id: SceneNode['id']
  name: SceneNode['name']
  absoluteTransform: SceneNode['absoluteTransform']
  componentPropertyReferences: SceneNode['componentPropertyReferences']
  exportSettings: SceneNode['exportSettings']
  height: SceneNode['height']
  locked: SceneNode['locked']
  relativeTransform: SceneNode['relativeTransform']
  removed: SceneNode['removed']
  type: SceneNode['type']
  visible: SceneNode['visible']
  width: SceneNode['width']
  x: SceneNode['x']
  y: SceneNode['y']
  stuckNodes: string[]
  parent: string
  children: SerializedSceneNode[]
}
