export const getSelection = () =>
  figma.currentPage.selection.map(({ id, name }) => ({
    id,
    name,
  }))
