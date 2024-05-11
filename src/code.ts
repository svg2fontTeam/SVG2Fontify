import { PluginMessageEnum, WarningMsg } from './constants';
import { Data, ConvertFont, FontOptionsType, FontStreamType } from './types';
import drag from './utils/drag';
import { generateSVGCode, iconToFont } from './utils/generate';
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

figma.showUI(__html__, { width: 360, height: 640 });
console.log('플러그인이 시작되었습니다.');

figma.ui.onmessage = async (msg: { type: string; data: Data }) => {
  console.log('ON_MSG : ', msg);
  const { data: figmaUIData } = msg;
  if (!figmaUIData) {
    console.error(errorHandler('NOT_FOUND'));
    return;
  }

  if (msg.type === PluginMessageEnum.SUBMIT) {
    // TODO: 추후 version, fontName input 데이터로 분기
    //FIXME 구조분해할당 사용 -> 더 간결하게 변경, falsy에 대한 핸들링 보다 초기값에 대한 핸들링을 바로 직관적으로 할 수 있습니다.
    const { data: figmaUIData } = msg;
    const {
      version = false,
      fontName = 'SVG2Fontify',
      preClass = 'icon',
      sufClass = '',
      react = false,
      vue = false,
      css = '',
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

    //FIXME 임시변수제거 -> 순간 그 변수를 CRUD하는 사이드 이팩트 효과가 날 수 있습니다.
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

    if (css) {
      //XXX css 파일 생성 한개 함수로 변경
      //FIXME: any 타입을 사용하지 않고, 정확한 타입을 사용하는 것이 좋습니다.
      const cssFile = generateCssFile(preClass, fontName, sufClass, svgList);
      postData.css = cssFile;
    }

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
