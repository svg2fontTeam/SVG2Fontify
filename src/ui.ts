import './ui.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// figma.on 내에서 사용 불가
function saveZip(data: Record<string, any>) {
  const { fontName, svgs } = data;
  const zip = new JSZip();

  for (const svg of svgs) {
    zip?.folder('svg')?.file(`${svg.name}.svg`, svg.code);
  }
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${fontName}.zip`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const testButton = document.getElementById('generate');
  if (testButton) {
    testButton.onclick = () => {
      parent.postMessage(
        { pluginMessage: { type: 'create-page', version: '버전 페이지입니다' } },
        '*'
      );

      window.onmessage = (msg: MessageEvent) => {
        //figma내에서 선택된 요소들 postMessage로 받아옴
        const { data } = msg.data.pluginMessage;
        console.log(data, 'data@@@@@');
        // zip으로 압축하여 저장
        saveZip(data);
      };
    };
  } else {
    console.error("Element with id 'test' not found.");
  }
});
document.addEventListener('DOMContentLoaded', () => {
  window.onmessage = (event) => {
    const pluginMessage = event.data.pluginMessage;

    if (pluginMessage && pluginMessage.type === 'selected-svgs') {
      const countBadge = document.getElementById('count-badge');
      if (countBadge) {
        countBadge.textContent = `${pluginMessage.svgs.length}`;
      }
    }
  };
});
