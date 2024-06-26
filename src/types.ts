import { Readable } from 'stream';

export interface ReadableWithMetadata extends Readable {
  metadata?: {
    unicode: string[];
    name: string;
  };
}

export type SVGListType = {
  content: string;
  metadata: {
    unicode: string[];
    name: string;
  };
};
export type FontStreamType = {
  svgs: SVGListType[];
  fontName: string;
  html: string;
  css?: string;
  svgFont: unknown;
  ttf: Buffer;
  eot: Buffer;
  woff: Buffer;
  react?: string;
  vue?: string;
};

export type FontOptionsType = {
  fontName: string;
  fontHeight: number;
  normalize: boolean;
};

export type Data = {
  fontName?: string;
  preClass?: string;
  sufClass?: string;
  version?: string;
  react: boolean;
  vue: boolean;
  count: string;
  id: string;
  postVal: string;
};

export type ConvertFont = {
  name: string;
  prefix: string;
  suffix: string;
  svgList: SVGListType[];
};

export type ComponentGeneratorParameter = {
  fontName: string;
  prefix: string;
  suffix: string;
  icons: SVGListType[];
};
