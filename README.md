# web-2023

[web-2021](https://github.com/oucrc-org/web-2021)のNext.jsバージョンです

## web-2021との違い

- 殆どの部分をReact Server Componentで描画するようになりました
  - 最終的にはNetlify次第ですが、パフォーマンス向上が期待できます

### 記事

- 記事投稿後、ビルドをトリガーする必要がなくなり、待ち時間がゼロになりました
  - 公開直後は404になる場合があります
  - 一覧の2ページ目以降の更新がすぐに行われない場合があります
- 公開前にプレビューを表示できるようになりました
- Markdownで記事を書けるようになりました
  - ほとんどの人は使わないだろうからオプショナルにしています。MDを書いた場合はリッチエディタより優先されます
  - Markdownの場合、GitHub Flavored機能が使える他、シンタックスハイライトの言語を指定できます
- リッチエディタでもMDでも、シンタックスハイライトがサーバーサイドで行われるようになりました
  - 記事表示の時点でハイライトが適用されます
  - MathJaxはクライアントサイドのままです
- 広報への通知が「本文、コメント、記事URL」のツイート用URLを含むようになりました

### 部員

- 過去何年間の部員まで表示するか、環境変数で変更可能になりました

### フォーム

- フォームのバリデーションが細かくなりました

## デプロイ

Netlifyに任せてください。

## 環境変数

|key|必須/任意|default|説明|
|---|---|---|---|
|`MICROCMS_REQUESTS_PER_SECOND`|任意|60|[microCMSのGET APIの秒間呼び出し最大回数](https://document.microcms.io/manual/limitations#h1eb9467502)|
|`MICROCMS_SERVICE_DOMAIN`|必須||microCMSのAPIのサブドメイン部分|
|`MICROCMS_API_KEY`|必須||microCMSのAPIキー|
|`MICROCMS_ARTICLE_WEBHOOK_SECRET`|必須||ランダムな文字列をmicroCMSのカスタム通知で設定|
|`MICROCMS_MEMBER_WEBHOOK_SECRET`|必須||ランダムな文字列をmicroCMSのカスタム通知で設定|
|`MICROCMS_NEWS_WEBHOOK_SECRET`|必須||ランダムな文字列をmicroCMSのカスタム通知で設定|
|`SLACK_NOTICE_WEBHOOK_URL`|必須||広報チャンネルのWebhook URL|
|`GOOGLE_FORM_ID_CONTACT`|必須||お問い合わせGoogleフォームのID|
|`GOOGLE_FORM_ID_JOIN`|必須||入部GoogleフォームのID|
|`NEXT_PUBLIC_GTAG_ID`|任意||アナリティクスを埋め込んだ Tag Manager　のID or アナリティクスのgtag ID|
|`NEXT_PUBLIC_ARTICLE_COUNT_PER_PAGE`|任意|9|一覧における1ページあたりの記事数|
|`NEXT_PUBLIC_MAX_MEMBER_YEARS`|任意|8|部員紹介で、歴代の部員全員を載せるとビルドに時間がかかる。<br>そのため、この環境変数で対象の年度数を絞れる|

## License

### Icons

- [Ant Design Icons](https://github.com/ant-design/ant-design-icons)
  - MIT License.
- [Heroicons](https://github.com/tailwindlabs/heroicons)
  - MIT License.
