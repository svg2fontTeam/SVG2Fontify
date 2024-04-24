/**
 *
 * @param {string} title - page의 명이 될 version name
 */

export const createVersionPage = async (title: string) => {
  // 페이지 생성 후 현재 페이지 아래로 정렬
  // @see https://github.com/destefanis/Discord-Figma-Project-Scaffold
  const versionPage = figma.createPage();
  versionPage.name = title;
  versionPage.backgrounds = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
  figma.root.insertChild(figma.root.children.indexOf(figma.currentPage) + 1, versionPage);

  //  페이지를 로드합니다.
  await versionPage.loadAsync();
  // 현재 선택된 프레임 가져옵니다(arr 형태)
  const selectedItem = figma.currentPage.selection;

  if (selectedItem) {
    const layersToCopy = selectedItem;
    for (const layer of layersToCopy) {
      const clone = layer.clone();
      versionPage.appendChild(clone);
    }
  }

  // 생성된 페이지로 이동합니다.
  await figma.setCurrentPageAsync(versionPage);

  return versionPage;
};
