import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

/**
 * 設定不要でハイライト可能な言語一覧▼
 * @see https://github.com/wooorm/lowlight#syntaxes
 * もし上記以外に必要なら、以下のように追加できる
 */
import dart from 'highlight.js/lib/languages/dart';

/**
 * HTMLのコードにhljsの変形を適用する SSR対応
 * コンポーネントにhljsのCSSが必要
 * HTMLにTeXを混ぜていてややこしいため、数式はクライアントサイドで描画する
 *
 * @see https://dev.classmethod.jp/articles/2020-04-15-conv-html-use-rehype/
 * @see https://github.com/rehypejs/rehype-highlight
 */
export async function parseHtml(html: string) {
  const parsed = await unified()
    // まずHTMLをパースする
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    // コードにハイライトを適用する
    .use(rehypeHighlight, {
      detect: true,
      // デフォルト以外の検知可能言語を追加
      languages: { dart },
    })
    .use(rehypeStringify)
    .process(html);

  return parsed.toString();
}

/**
 * TODO: remarkを追加し、上記と同様にMarkdownをパースする
 */
