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

export type FontOptionsType = {
  fontName: string;
  fontHeight: number;
  normalize: boolean;
};

export type RegexpObj = {
  id: string;
  postVal: string;
};

export type data = {
  fontName: string;
  preClass: string;
  sufClass: string;
  version: string;
  react: boolean;
  vue: boolean;
  css: boolean;
};
