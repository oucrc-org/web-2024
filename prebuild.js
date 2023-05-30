const path = require('node:path');
const fs = require('fs');
const baseDir = process.cwd();

/**
 * NextがVercelで想定している環境変数にNetlifyが対応しておらず
 * 下書きプレビューが失敗するため、ビルド前に修正する
 * TODO: [ここ](https://github.com/vercel/next.js/issues/49169)で修正が報告されたら削除
 * @see https://answers.netlify.com/t/server-edge-not-defined-error-on-nextjs-ssr-functions-cause-site-to-return-500-errors/91793/31
 */
const prebuildScripts = async () => {
  console.log(
    '[prebuild.js] Fixing build issue. Details: https://github.com/vercel/next.js/issues/49169'
  );

  const file = path.join(
    baseDir,
    '/node_modules',
    'next/dist/server/require-hook.js'
  );

  const content = await fs.promises.readFile(file, 'utf-8');
  await fs.promises.writeFile(
    file,
    content.replace(
      'if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {',
      'if (true) {'
    )
  );
};

prebuildScripts();
