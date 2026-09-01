# 0から構築する

misskey-juiceを新規にインストールする場合の手順です。基本的な流れは[本家Misskeyの手動インストールガイド](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/)とほぼ同じです。

> [!warning] 公開サーバーを立てる前に
> misskey-juiceに限らず、公開Misskeyサーバーを運営することは、想像以上の責任を伴います。**公開する前に、以下のガイドをよく読んで検討してください。**
>
> - [chan-maiさんによるMisskeyサーバー運用ガイド](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186)
> - [公式のインストールガイド](https://misskey-hub.net/ja/docs/for-admin/install/guides/)
>
> 特に**データベースのバックアップ体制**、利用者対応・モデレーションの精神的負荷、カスタム絵文字インポート時の著作権責任については、事前によく検討してください。
>
> **この注意はmisskey-juiceに限らず、Misskeyフォーク・Misskey自体全般に当てはまります。**

## 前提条件

- Node.js(本家Misskeyと同じバージョン要件に準拠)
- pnpm
- PostgreSQL
- Redis(またはRedis互換のvalkeyなど)
- FFmpeg

## 手順

コマンドはすべて**リポジトリのルートディレクトリ**で実行します。

1. misskey-juice専用のOSユーザーを作成することを推奨します。

   ```bash
   adduser --disabled-password --disabled-login misskey
   ```
2. リポジトリをクローンし、リリースタグをcheckoutします。

   ```bash
   sudo -iu misskey git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   git checkout <タグ名>
   git submodule update --init
   ```
3. 依存関係をインストールします。

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. 設定ファイルを作成します。

   ```bash
   cp .config/example.yml .config/default.yml
   ```

   `.config/default.yml`を編集し、`url`・データベース接続情報などを設定してください。JUICE独自機能の設定項目については、[JUICE独自機能の設定](../juice/settings.md)を参照してください。
5. ビルドと初期化(マイグレーション)を行います。

   ```bash
   NODE_ENV=production pnpm run build
   pnpm run init
   ```
6. 起動します。

   ```bash
   NODE_ENV=production pnpm run start
   ```

   本番運用ではsystemdなどでサービス化することを推奨します。

## 関連

- [このサーバーの運用方針について](../about-juice-server.md)
- [本家Misskey/他フォークからの移行](./migration-from-misskey.md)
