export const Overview = (limit: number) => {
  const name = figma.root.name
  const pages = figma.root.children.slice(0, limit).map(page => page.name)

  return { name, pages }
}
