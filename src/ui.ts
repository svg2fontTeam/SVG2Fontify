import './ui.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// figma.on 내에서 사용 불가
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

// 유효성검사 추가 함수.
function regexpTestAdd(id: string, html: HTMLInputElement, isErr: boolean) {
  html.addEventListener('keyup', () => {
    const postVal = html.value;
    parent.postMessage({ pluginMessage: { type: id, isErr, postVal } }, '*');
    window.onmessage = (event) => {
      const rtnVal = event.data.pluginMessage.rtnVal;
      html.value = rtnVal;
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // btn click event
  const fontNameEle = document.getElementById('fontName') as HTMLInputElement;
  const preClassEle = document.getElementById('preClass') as HTMLInputElement;
  const sufClassEle = document.getElementById('sufClass') as HTMLInputElement;
  const versionEle = document.getElementById('version') as HTMLInputElement;
  const testButton = document.getElementById('generate');
  const reactEle = document.getElementById('react') as HTMLInputElement;
  const vueEle = document.getElementById('vue') as HTMLInputElement;
  const cssEle = document.getElementById('css') as HTMLInputElement;

  regexpTestAdd('fontName', fontNameEle, true);
  regexpTestAdd('preClass', preClassEle, true);
  regexpTestAdd('sufClass', sufClassEle, true);
  regexpTestAdd('version', versionEle, true);

  if (testButton) {
    testButton.onclick = () => {
      parent.postMessage(
        { pluginMessage: { type: 'create-page', version: '버전 페이지입니다' } },
        '*'
      );
      parent.postMessage(
        {
          pluginMessage: {
            type: 'post-input',
            arrInput: {
              fontName: fontNameEle.value,
              preClass: preClassEle.value,
              sufClass: sufClassEle.value,
              version: versionEle.value,
              react: reactEle.value,
              vue: vueEle.value,
              css: cssEle.value,
            },
          },
        },
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
