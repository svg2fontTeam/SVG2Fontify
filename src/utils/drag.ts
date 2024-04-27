export default function drag() {
  figma.ui.onmessage = (msg: { type: string }) => {
    if (msg.type === 'get-selected-svgs') {
      const selection = figma.currentPage.selection;
      const svgs = selection.filter(
        (node: SceneNode) => node.type === 'VECTOR' || node.type === 'FRAME'
      );

      // SVG 요소들의 정보를 UI로 전송
      figma.ui.postMessage({ type: 'selected-svgs', svgs: svgs });
    }
  };

  // UI 스크립트에서는 아래와 같이 메시지를 받을 수 있음
  window.onmessage = (event: MessageEvent) => {
    const { type, svgs } = event.data.pluginMessage as { type: string; svgs: SceneNode[] };
    if (type === 'selected-svgs') {
      console.log('Selected SVGs:', svgs);
      // 이곳에서 SVG 데이터를 처리하거나 사용자에게 보여줄 수 있음
    }
  };
}
