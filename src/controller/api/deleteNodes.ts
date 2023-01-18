export const deleteNodes = (ids: string[]) => {
  const deleted: string[] = []
  ids.forEach(id => {
    const node = figma.getNodeById(id)
    if (node) {
      node.remove()
      deleted.push(id)
    }
  })

  return deleted
}
