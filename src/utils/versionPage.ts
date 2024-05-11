export function createPage(title: string, target = figma) {
  const page = target.createPage();
  page.name = title;
  page.backgrounds = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];

  return page;
}

export function getselectedItems(target = figma) {
  const selectedItem = target.currentPage.selection;

  if (selectedItem.length === 0) {
    throw new Error('파일이 선택되지 않았습니다.');
  }

  const layersToCopy = selectedItem;
  return layersToCopy.map((layer) => layer.clone());
}

export const createVersionPage = async (title: string, target = figma) => {
  const items = getselectedItems(target);
  const versionPage = createPage(title, target);

  target.root.insertChild(target.root.children.indexOf(target.currentPage) + 1, versionPage);

  await versionPage.loadAsync();

  items.forEach((item) => versionPage.appendChild(item));

  await figma.setCurrentPageAsync(versionPage);
};
