import { PluginMessageEnum, WarningMsg } from './constants';
import { Data, ConvertFont, FontOptionsType, FontStreamType } from './types';
import drag from './utils/drag';
import { generateSVGCode, iconToFont } from './utils/generate';
import {
  generateReactClassComponentFile,
  generateVueComponentFile,
} from './utils/generate-component';
import { generateCssFile } from './utils/generate-css';
import { generateAndSaveHTML } from './utils/generate-html';
import validationChkAction from './utils/input';
import { notify } from './utils/notify';
import { createVersionPage } from './utils/versionPage';

const ERROR_MESSAGE = {
  ERROR: '에러가 발생했습니다.',
  WARNING: '경고가 발생했습니다.',
  INFO: '정보입니다.',
  NOT_FOUND: '데이터를 찾을 수 없습니다.',
} as const;

const errorHandler = (msg: keyof typeof ERROR_MESSAGE) => {
  return ERROR_MESSAGE[msg];
};

figma.showUI(__html__, { width: 360, height: 420 });


figma.ui.onmessage = async (msg: { type: string; data: Data }) => {
  const { data: figmaUIData } = msg;
  if (!figmaUIData) {
    console.error(errorHandler('NOT_FOUND'));
    return;
  }

  if (msg.type === PluginMessageEnum.SUBMIT) {
    const { data: figmaUIData } = msg;
    const {
      version = false,
      fontName = 'SVG2Fontify',
      preClass = 'icon',
      sufClass = '',
      react = false,
      vue = false,
      count = '0',
    } = figmaUIData;

    if (count === '0') {
      const message = WarningMsg.SELECT_ZERO;
      return notify(message, true, 2000);
    }

    if (version) {
      createVersionPage('title', figma);
    }

    const svgList = await generateSVGCode(figma);
    const fontStream = await iconToFont(svgList, {
      fontName,
      fontHeight: 1000,
      normalize: true,
    } as unknown as FontOptionsType);
    const htmlFile = generateAndSaveHTML({
      name: fontName,
      prefix: preClass,
      suffix: sufClass,
      svgList: svgList,
    } as unknown as ConvertFont);
    const postData: FontStreamType = {
      svgs: svgList,
      fontName,
      html: htmlFile,
      ...fontStream,
    };

    if (react) {
      const reactClassFile = generateReactClassComponentFile({
        fontName: fontName,
        prefix: preClass,
        suffix: sufClass,
        icons: svgList,
      });

      postData.react = reactClassFile;
    }

    if (vue) {
      const vueFile = generateVueComponentFile({
        fontName: fontName,
        prefix: preClass,
        suffix: sufClass,
        icons: svgList,
      });

      postData.vue = vueFile;
    }
    const cssFile = generateCssFile(preClass, fontName, sufClass, svgList);
    postData.css = cssFile;

    figma.ui.postMessage({
      type: PluginMessageEnum.SAVE_ICONFONT,
      data: postData,
    });
  }

  if (msg.type === PluginMessageEnum.CHECK_VALUE) {
    const rtnVal = validationChkAction(msg.data.id, msg.data.postVal);
    figma.ui.postMessage({
      type: PluginMessageEnum.CHECKED_VALUE,
      data: { id: msg.data.id, rtnVal: rtnVal },
    });
  }
};

figma.on('selectionchange', () => {
  drag();
});

drag();
