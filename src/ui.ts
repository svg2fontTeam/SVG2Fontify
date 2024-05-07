import './ui.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PluginMessageEnum } from './constants';

function saveZip(data: Record<string, any>) {
  const {
    fontName,
    svgs,
    ttf,
    woff,
    // woff2,
    eot,
  } = data;
  const zip = new JSZip();

  for (const svg of svgs) {
    zip?.folder('svg')?.file(`${svg.metadata.name}.svg`, svg.content);
  }

  if (ttf) {
    zip?.folder('font')?.file(`${fontName}.ttf`, ttf);
  }

  if (woff) {
    zip?.folder('font')?.file(`${fontName}.woff`, woff);
  }

  // if(woff2){
  //   zip?.folder('font')?.file(`${fontName}.woff2`, item);
  // }

  if (eot) {
    zip?.folder('font')?.file(`${fontName}.eot`, eot);
  }

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${fontName}.zip`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const testButton = document.getElementById('generate');
  if (testButton) {
    testButton.onclick = () => {
      parent.postMessage({ pluginMessage: { type: PluginMessageEnum.SUBMIT, data: {} } }, '*');
    };
  } else {
    console.error("Element with id 'test' not found.");
  }

  window.onmessage = (msg: MessageEvent) => {
    //figma내에서 선택된 요소들 postMessage로 받아옴
    const pluginMessage = msg.data.pluginMessage;
    console.log('MSG_DATA :', pluginMessage);

    if (pluginMessage && pluginMessage.type === PluginMessageEnum.SELECTED_SVGS) {
      const countBadge = document.getElementById('count-badge');
      if (countBadge) {
        countBadge.textContent = `${pluginMessage.svgs.length}`;
      }
    }
    if (pluginMessage.type === PluginMessageEnum.SAVE_ICONFONT) {
      saveZip(pluginMessage.data);
    }
  };
});
