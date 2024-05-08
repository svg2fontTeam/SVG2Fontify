import './ui.css';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { PluginMessageEnum } from './constants';

function saveZip(data: Record<string, any>) {
  const {
    fontName,
    svgs,
    ttf,
    woff,
    // woff2,
    eot,
    html,
    css,
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

  if (html) {
    const blob: Blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    zip?.file('fontView.html', blob);
  }

  if (css) {
    zip?.folder('css')?.file(`${fontName}.css`, css);
  }

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `${fontName}.zip`);
  });
}

// 유효성검사 추가 함수.
function regexpTestAdd(id: string, html: HTMLInputElement) {
  html.addEventListener('keyup', () => {
    const postVal = html.value;
    parent.postMessage(
      {
        pluginMessage: {
          type: PluginMessageEnum.CHECK_VALUE,
          data: { id: id, postVal: postVal },
        },
      },
      '*'
    );
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate');
  const fontNameInput = document.getElementById('fontName') as HTMLInputElement;
  const preClassInput = document.getElementById('preClass') as HTMLInputElement;
  const sufClassInput = document.getElementById('sufClass') as HTMLInputElement;
  const versionInput = document.getElementById('version') as HTMLInputElement;
  const reactChk = document.getElementById('react') as HTMLInputElement;
  const vueChk = document.getElementById('vue') as HTMLInputElement;
  const cssChk = document.getElementById('css') as HTMLInputElement;

  regexpTestAdd('fontName', fontNameInput);
  regexpTestAdd('preClass', preClassInput);
  regexpTestAdd('sufClass', sufClassInput);
  regexpTestAdd('version', versionInput);

  if (generateButton) {
    generateButton.onclick = () => {
      parent.postMessage(
        {
          pluginMessage: {
            type: PluginMessageEnum.SUBMIT,
            data: {
              fontName: fontNameInput.value,
              preClass: preClassInput.value,
              sufClass: sufClassInput.value,
              version: versionInput.value,
              react: reactChk.checked,
              vue: vueChk.checked,
              css: cssChk.checked,
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
    if (pluginMessage.type === PluginMessageEnum.CHECKED_VALUE) {
      const rtnVal = pluginMessage.data.rtnVal;
      if (pluginMessage.data.id === 'fontName') {
        fontNameInput.value = rtnVal;
      } else if (pluginMessage.data.id === 'preClass') {
        preClassInput.value = rtnVal;
      } else if (pluginMessage.data.id === 'sufClass') {
        sufClassInput.value = rtnVal;
      } else {
        versionInput.value = rtnVal;
      }
    }
  };
});
