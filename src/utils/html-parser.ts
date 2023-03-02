import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

import rehypeHighlight from 'rehype-highlight';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import python from 'highlight.js/lib/languages/python';
import shell from 'highlight.js/lib/languages/shell';

import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

/**
 * HTMLのコードにhljsとTexの変形を適用する SSR対応
 * コンポーネントにhljsとKaTeXのCSSが必要
 * @see https://dev.classmethod.jp/articles/2020-04-15-conv-html-use-rehype/
 * @see https://github.com/rehypejs/rehype-highlight
 * @see https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex
 */
export const parseHtml = async (html: string) => {
  return await unified()
    // まずHTMLをパースする
    .use(rehypeParse, { fragment: true })
    // コードにハイライトを適用する
    .use(rehypeHighlight, {
      languages: { csharp, css, go, java, javascript, kotlin, python, shell },
    })
    // 数式を描画する
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(html);
};
