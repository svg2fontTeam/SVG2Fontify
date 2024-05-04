type ComponentGeneratorParameter = {
  fontName: string;
  prefix: string;
  icons: Record<string, string>;
};

const toPascalCase = (str: string) => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
};

const generateReactImport = (fontName: string) => {
  return `import React from 'react';\nimport from './${fontName}.css';\n`;
};
const generateEnum = (icons: Record<string, string>) => {
  return `export enum Icons {\n${Object.entries(icons)
    .map(([name]) => `${toPascalCase(name)} = '${name}'`)
    .join(',\n')}\n}\n`;
};
const generateReactInterface = () => {
  return `export interface IconInterface {\nname: Icons;\n}\n`;
};

export const generateReactFunctionComponent = ({
  fontName,
  prefix,
  icons,
}: ComponentGeneratorParameter) => {
  return `${generateReactImport(fontName)}
  ${generateEnum(icons)}
  ${generateReactInterface()}
  export const Icon = ({name}: IconInterface) => <i className={\`${prefix} \${name}\`}></i>;`;
};

export const generateReactClassComponent = ({
  fontName,
  prefix,
  icons,
}: ComponentGeneratorParameter) => {
  return `${generateReactImport(fontName)}
  ${generateEnum(icons)}
  ${generateReactInterface()}
  export class Icon extends React.Component<IconInterface> {
    render() {
      return <i className={\`${prefix} \${this.props.name}\`}></i>;
    }
  }`;
};

export const generateVueComponent = ({ fontName, prefix, icons }: ComponentGeneratorParameter) => {
  return `
  <template>
    <i :class="\`${prefix} \${name}\`"></i>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  ${generateEnum(icons)}
  
  export default defineComponent({
    name: '${fontName}',
    props: {
      name: {
        type: String as PropType<Icons>,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  @import './${fontName}.css';
  </style>
    `;
};
