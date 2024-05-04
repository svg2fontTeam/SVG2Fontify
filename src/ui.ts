import './ui.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// figma.on 내에서 사용 불가
function saveZip(data: Record<string, any>) {
  const { fontName, svgs } = data;
  const zip = new JSZip();

  for (const svg of svgs) {
    zip?.folder('svg')?.file(`${svg.metadata.name}.svg`, svg.content);
  }
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${fontName}.zip`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // btn click event
  const testButton = document.getElementById('generate');
  if (testButton) {
    testButton.onclick = () => {
      parent.postMessage(
        { pluginMessage: { type: 'create-page', version: '버전 페이지입니다' } },
        '*'
      );
    };
  } else {
    console.error("Element with id 'test' not found.");
  }

  window.onmessage = (msg: MessageEvent) => {
    const pluginMessage = msg.data.pluginMessage;
    console.log('DATA@@@@@ :', pluginMessage);

    //figma내에서 선택된 요소들 postMessage로 받아옴
    if (pluginMessage && pluginMessage.type === 'selected-svgs') {
      const countBadge = document.getElementById('count-badge');
      if (countBadge) {
        countBadge.textContent = `${pluginMessage.svgs.length}`;
      }
    }
    if (pluginMessage.type === 'save-iconfont') {
      // zip으로 압축하여 저장
      saveZip(pluginMessage.data);
    }
  };
});
