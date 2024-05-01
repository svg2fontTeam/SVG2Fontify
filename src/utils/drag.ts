export default async function drag() {
  const nodes = figma.currentPage.selection;

  if (nodes.length < 0) {
    console.log('선택된 노드가 없습니다.');
    return;
  }

  const filterSvg = nodes.filter(
    (el) => el.type === 'VECTOR' || el.type === 'FRAME' || el.type === 'COMPONENT'
  );
  const isNotSvg = nodes.filter(
    (el) => el.type !== 'VECTOR' && el.type !== 'FRAME' && el.type !== 'COMPONENT'
  );

  if (isNotSvg.length > 0) {
    console.log(isNotSvg.map((el) => el.type));
    console.log('백터가 아닌 노드가 있습니다.');
    return;
  }

  const svgs = await Promise.all(
    filterSvg.map(async (node) => {
      const svgFile = await node.exportAsync({ format: 'SVG' });
      return { name: node.name, svg: svgFile };
    })
  );

  figma.ui.postMessage({ type: 'selected-svgs', svgs: svgs });
}
