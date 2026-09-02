# 更新履歴

misskey-juiceのJUICE独自機能に関する主な変更履歴です。本家Misskey由来の変更は含みません。全履歴は[GitHubのリリースページ](https://github.com/Zel9278/misskey-juice/releases)をご覧ください。

## test-dispatch-verify

### Server
- Feat: dispatch動作確認用のダミーエントリ

**Full Changelog**: https://example.com

## v2026.7.0-juice+2.5

- [絵文字申請](./emoji-request.md)・アバターデコレーション申請・[承認式新規登録](./approval-signup.md)の承認/却下を、モデレーター権限を持たないユーザーにもロール単位で個別に許可できるように

## v2026.7.0-juice+2.4

- 一般ユーザーがアバターデコレーションを申請できる「アバターデコレーション申請」ページを追加([絵文字申請](./emoji-request.md)と同じ仕組み)
- 管理画面のJUICE独自項目にバッジが表示されていなかった不具合を修正

## v2026.7.0-juice+2.3

- Webhookの送信先がDiscordのWebhook URLの場合、自動的に見やすいEmbed形式に整形して送信するように

## v2026.7.0-juice+2.2

- このリリースから`juice/main`ブランチへの公開を開始
- pgroonga検索で、`OR`や`-`等の記号を含む単語だと検索が失敗する不具合を修正
- (chan-maiさんの貢献)絵文字申請承認時のファイル破損、サインイン時の承認待ちチェックのタイミングなどを修正

## v2026.7.0-juice+2.1

- アプリ内の[About JUICEページ](./about-page.md)にコントリビューター欄を追加

## v2026.7.0-juice+2.0

JUICE独自機能をまとめて追加した大型リリースです。主な追加機能:

- [承認式新規登録](./approval-signup.md)
- [AI生成物フラグ](./ai-generated-flag.md)
- [絵文字申請](./emoji-request.md)
- [ユーザーランキング](./user-ranking.md)
- [リレータイムライン](./relay-timeline.md)
- [ウィジェット表示位置設定](./widget-position.md)
- [お知らせの投票機能](./announcement-poll.md)
- [LaTeX(数式)表示](./latex.md)
- 他ユーザーへの自分専用ニックネーム機能
- ログイン失敗時の本人通知
- アプリ内の[About JUICEページ](./about-page.md)を新設

## v2026.7.0-juice+1.0

Misskey 2026.7.0をベースとした初回リリース。misskey-artから以下を移植:

- [センシティブ画像の表示に関する修正](./cw-image-blur-fix.md)
- [お知らせのリアクション機能](./announcement-reaction.md)
- 開発用DBの誤消去防止ガード
