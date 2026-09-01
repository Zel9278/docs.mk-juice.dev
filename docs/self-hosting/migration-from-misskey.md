# 本家Misskey/他フォークからの移行

自分でMisskeyサーバーを運営している方が、ソフトウェアをmisskey-juiceに乗り換える場合のガイドです。

> [!warning]
> ここでの手順は一般的な考え方の案内であり、すべての環境・すべてのバージョン・すべてのフォークでの動作を保証するものではありません。**必ず事前にデータベースのバックアップを取り、可能であればステージング環境で一度リハーサルしてから本番に適用してください。**

## misskey-juiceの位置づけ

misskey-juiceは、本家Misskeyの[`Release: 2026.7.0`](https://github.com/misskey-dev/misskey/releases/tag/2026.7.0)から分岐したフォークです。マイグレーション履歴も本家2026.7.0までを引き継いだ上で、そこにJUICE独自の機能追加分が積まれています。

そのため、**本家Misskey(develop)を2026.7.0相当以降まで運用している場合は、通常のマイナー/メジャーアップデートと同じ要領で移行できる可能性が高いです。**

一方で、[CherryPick](https://github.com/kokonect-link/cherrypick)のように本家Misskeyから大きく分岐しているフォークを運用している場合は、マイグレーション履歴自体が異なるため、この手順どおりの移行は難しいと考えられます。この場合は移行ではなく、新規に構築した上でデータのエクスポート/インポートを検討してください。

## 移行手順

基本的な流れは、[本家Misskeyのアップデート手順](https://misskey-hub.net/ja/docs/for-admin/install/guides/manual/)とほぼ同じです。コマンドはすべて**リポジトリのルートディレクトリ**で実行します(`packages/backend`などのサブディレクトリへ手動で移動する必要はありません)。

1. **データベースのバックアップを取る**(`pg_dump`など)。これが最も重要な手順です。
2. misskey-juiceのソースを取得します。

   ```bash
   git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   ```

   最新の[リリースタグ](https://github.com/Zel9278/misskey-juice/releases)をcheckoutし、サブモジュールを初期化します。

   ```bash
   git checkout <タグ名>
   git submodule update --init
   ```
3. 依存関係をインストールします。

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. ビルドします。

   ```bash
   NODE_ENV=production pnpm run build
   ```
5. 既存の`.config/default.yml`をそのままこのリポジトリの`.config/default.yml`としてコピーします(db/redisの接続情報などは変更不要です)。JUICE独自機能の設定項目については、[JUICE独自機能の設定](../juice/settings.md)を参照してください。
6. マイグレーションを実行します(ルートディレクトリでそのまま実行できます)。

   ```bash
   pnpm run migrate
   ```
7. サーバーを起動し、正常に動作するか確認します。systemdなどでサービス化している場合は、`WorkingDirectory`を新しいディレクトリに向けてから再起動してください。

## 移行後の注意

- JUICE独自機能([JUICE独自機能一覧](../juice/index.md))は既定で無効になっているものもあります。必要に応じてコントロールパネルの「JUICE」項目から有効化してください。
- 何か問題が起きた場合は、手順1で取ったバックアップからロールバックしてください。
