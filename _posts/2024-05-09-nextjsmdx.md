---
title: 📘Next.js 에 markdown 설치 하기
author: Changhee Park
date: 2024-05-09 00:00:00 +0900
categories: [Nextjs]
tags: [Nextjs, mdx, md]
render_with_liquid: false
---

```bash
# ✨ Next.js에서 MDX 사용하기

## 📦 MDX 관련 패키지 설치

yarn add @next/mdx @mdx-js/loader @mdx-js/react
yarn add --dev @types/mdx
```

- **`@next/mdx`**: Next.js에서 MDX를 지원하기 위한 공식 패키지
- **`@mdx-js/loader`**: MDX 문서를 컴파일하는 Webpack 로더
- **`@mdx-js/react`**: MDX 문서 내에서 React 컴포넌트를 사용하기 위한 기능을 제공합니다.
- **`@types/mdx`**: TypeScript 프로젝트에서 MDX 파일에 대한 타입 지원을 제공합니다.
- **`remark-prism`**: 마크다운 내 코드 블록을 하이라이팅하기 위한 패키지 (선택사항)

## **🔧 `next.config.mjs` 수정**

```tsx
tsxCopy code
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    appDir: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // 필요한 경우 MDX 옵션 및 플러그인 추가
  },
});

export default withMDX(nextConfig);

```

- **`pageExtensions`** 부분에 **`md`**, **`mdx`**를 추가해줍니다.
- **`withMDX`**를 추가해줍니다.

## **⚙️ `ts.config.json` 설정**

```json
jsonCopy code
{
  "compilerOptions": {
    // 필요한 옵션 추가
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.md",
    "**/*.mdx"
  ]
}

```

- **`include`** 부분에 **`md`** 파일과 **`mdx`** 파일을 추가해줍니다.

## **🛠 `mdx-components.tsx` 작성**

**`mdx-components.tsx`** 파일을 작성하여 개별 커스텀 설정이 가능합니다.

```tsx
tsxCopy code
import type { MDXComponents } from "mdx/types";

export const HighlightedText = ({ children }: { children: React.ReactNode }) => {
  return <span style={{ backgroundColor: "yellow" }}>{children}</span>;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 style={{ color: "blue" }} {...props} />,
    HighlightedText,
  };
}

```

## **🏗 `mdx-provider.tsx` 작성**

```tsx
tsxCopy code
import { MDXProvider } from "@mdx-js/react";
import { useMDXComponents } from "./mdx-components";

export function MDXComponentsProvider({ children }: { children: React.ReactNode }) {
  const components = useMDXComponents({});
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

```

**`provider`**는 **`.md`**, **`.mdx`** 파일의 하위 컴포넌트를 사용할 수 있게 해줍니다.

## **📄 `.md` 또는 `.mdx` 파일 작성**

````
mdCopy code
# Welcome.mdx

This is a blog post written in **MDX**.

- List item 1
- List item 2

<HighlightedText> This text is highlighted in MDX! </HighlightedText>```python
print('hello')

````

## 📃 `.tsx` 페이지 작성

````tsx

## 📃 페이지 작성

```tsx
"use client";

import Welcome from "@/markdown/welcome.mdx";
import Test from "@/markdown/test.md";
import { MDXComponentsProvider } from "@/mdx/mdx-provider";

export default function Page() {
  return (
    <MDXComponentsProvider>
      <Welcome />
      <Test />
    </MDXComponentsProvider>
  );
}

````

---

# **🖍️ 마크다운 코드 하이라이팅 수정**

- **remark-gfm**

```bash
yarn add remark-gfm
```

**`remark-gfm`**은 마크다운 파일에서 표나 리스트를 더 다채롭게 표현해주는 라이브러리입니다.

## **🔧 `next.config.mjs` 수정**

```tsx
import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    appDir: true
  }
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight] // rehype 플러그인 추가
  }
});

export default withMDX(nextConfig);
```

**`remark-gfm`**을 **`options`** 항목에 추가

---

# **🌈 코드 하이라이팅 방법 선택**

## **방법 1: 🖌️ rehype-highlight & prismjs**

### **설치**

```bash
yarn add rehype-highlight prismjs
```

### **`globals.css`에 추가**

```css
/* globals.css */
@import "prismjs/themes/prism.css";
```

### **`next.config.mjs` 수정**

```tsx
options: {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeHighlight],
}
```

---

## **방법 2: 🖼️ react-syntax-highlighter**

### **설치**

```bash
yarn add react-syntax-highlighter
yarn add @types/react-syntax-highlighte
```

### **`code-block` 컴포넌트 정의**

```tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { [테마정의부분] as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  value: string;
}

export const CodeBlock = ({ language, value }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language={language} style={theme}>
      {value}
    </SyntaxHighlighter>
  );
};

```

### **`mdx-components.tsx` 수정**

```tsx
import React from "react";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./code-block";

export const HighlightedText = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <span style={{ backgroundColor: "yellow" }}>{children}</span>;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 style={{ color: "blue" }} {...props} />,
    code: (props) => {
      const { className, children } = props as any;
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <CodeBlock language={match[1]} value={String(children).trim()} />
      ) : (
        <code {...props} />
      );
    },
    HighlightedText
  };
}
```

이 과정을 거치면 코드가 깔끔하게 된다.
