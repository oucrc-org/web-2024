# web-2023

```sh
yarn
cp .env.local.example .env.local
yarn dev
```

## 環境変数

|key|必須/任意|default|説明|
|---|---|---|---|
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
