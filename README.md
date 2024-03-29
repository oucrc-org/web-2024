# web-2024

[web-2021](https://github.com/oucrc-org/web-2021)のNext.jsにおける実装

## このリポジトリを実用に移す条件

- ~~App Routerがベータでなくなること ([公式ドキュメント](https://beta.nextjs.org/docs/app-directory-roadmap)を参照)~~ 解決
  - ~~プレビュー機能~~ 解決
  - ~~APIルート: `route.ts`での`res.revalidate`ができず無駄に`pages/api`がある~~ 解決
- NetlifyがOn-Demand ISRに対応すること
  - 詳細は #31 参照

## web-2021との違い

- 殆どの部分をReact Server Componentで描画するようになりました
  - 最終的にはNetlify次第ですが、パフォーマンス向上が期待できます

### 記事

- **一覧で、本文の冒頭ではなく、Twitter用コメントを概要として使うようにしました**
  - 通信量削減のためです
- ~~記事投稿後、ビルドをトリガーする必要がなくなり、待ち時間がゼロになりました~~ [Netlifyの対応待ち](https://github.com/netlify/next-runtime/issues/1288)
  - ~~公開直後は404になる場合があります~~
  - ~~一覧の2ページ目以降の更新がすぐに行われない場合があります~~

### 部員

- 過去何年間の部員まで表示するか、環境変数で変更可能になりました

### フォーム

- フォームのバリデーションが細かくなりました

## デプロイ

Netlifyに任せてください。

[pnpm用に環境変数の設定が必要](https://docs.netlify.com/integrations/frameworks/next-js/overview/#pnpm-support)かも。

## 環境変数

|key|必須/任意|default|説明|
|---|---|---|---|
|`MICROCMS_REQUESTS_PER_SECOND`|任意|30|[microCMSのGET APIの秒間呼び出し最大回数](https://document.microcms.io/manual/limitations#h1eb9467502)|
|`MICROCMS_MAX_GET_COUNT`|任意|1000|最大記事数。ローカルで動作確認時に下げることでビルドを短縮できる|
|`MICROCMS_SERVICE_DOMAIN`|必須||microCMSのAPIのサブドメイン部分|
|`MICROCMS_API_KEY`|必須||microCMSのAPIキー|
|`MICROCMS_ARTICLE_WEBHOOK_SECRET`|必須||ランダムな文字列をmicroCMSのカスタム通知で設定|
|`MICROCMS_MEMBER_WEBHOOK_SECRET`|必須||ランダムな文字列をmicroCMSのカスタム通知で設定|
|`MICROCMS_NEWS_WEBHOOK_SECRET`|必須||ランダムな文字列をmicroCMSのカスタム通知で設定|
|`SLACK_NOTICE_WEBHOOK_URL`|必須||広報チャンネルのWebhook URL|
|`GOOGLE_FORM_ID_CONTACT`|必須||お問い合わせGoogleフォームのID|
|`GOOGLE_FORM_ID_JOIN`|必須||入部GoogleフォームのID|
|`GOOGLE_FORM_MOCK`|任意|false|Googleフォーム動作をモックするか|
|`NEXT_PUBLIC_GTM_ID`|任意||アナリティクスを埋め込んだ Tag ManagerのコンテナID<br>なお、ページ遷移を正しく取得するには、GA4において「拡張計測」をONにする必要がある([ソース](https://zenn.dev/waddy/scraps/940ac10e7c3f94))|
|`NEXT_PUBLIC_ARTICLE_COUNT_PER_PAGE`|任意|9|一覧における1ページあたりの記事数|
|`NEXT_PUBLIC_MAX_MEMBER_YEARS`|任意|8|部員紹介で、歴代の部員全員を載せるとビルドに時間がかかる。<br>そのため、この環境変数で対象の年度数を絞れる|

## 開発

```sh
pnpm i
pnpm dev
```

## License

### Icons

- [Ant Design Icons](https://github.com/ant-design/ant-design-icons)
  - MIT License.
- [Heroicons](https://github.com/tailwindlabs/heroicons)
  - MIT License.
