import Script from 'next/script';
import React from 'react';

/* ツイート埋め込みをするページに配置 */
export default function TwitterWidgetsScript() {
  return (
    <Script
      async
      strategy="afterInteractive"
      src="https://platform.twitter.com/widgets.js"
    />
  );
}
