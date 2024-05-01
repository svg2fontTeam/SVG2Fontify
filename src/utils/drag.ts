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
  console.log(svgs);
  figma.ui.postMessage({ type: 'selected-svgs', svgs: svgs });

  window.onmessage = (event: MessageEvent) => {
    console.log(event.data.pluginMessage);
    const { type, svgs } = event.data.pluginMessage as { type: string; svgs: SceneNode[] };
    if (type === 'selected-svgs') {
      const countBadge = document.getElementById('count-badge');

      if (!countBadge) {
        console.error('Element with id "count-badge" not found.');
        return;
      }
      countBadge.textContent = svgs.length.toString();
      countBadge.style.display = 'flex';

      // 이곳에서 SVG 데이터를 처리하거나 사용자에게 보여줄 수 있음
    }
  };
}
