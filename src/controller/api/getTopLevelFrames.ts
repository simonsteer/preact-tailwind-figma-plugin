export const getTopLevelFrames = () =>
  figma.currentPage.children
    .filter(child => child.type === 'FRAME')
    .map(({ id, name }) => ({ id, name }))
