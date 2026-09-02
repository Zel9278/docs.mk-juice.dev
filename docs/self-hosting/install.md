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
- PostgreSQL(**18以降を推奨**。パフォーマンスと安定性の観点から、新規構築であれば可能な限り新しいバージョンを使ってください)
- Redis(またはRedis互換のvalkeyなど)
- FFmpeg

> [!note] 全文検索エンジンについて
> 標準のMisskeyは全文検索に`sqlLike`(PostgreSQLの`LIKE`検索)を使いますが、投稿数が増えると検索が遅くなりがちです。Juice Serverでは、より高速で日本語などのCJK言語の検索精度も高い[pgroonga](https://pgroonga.github.io/)の利用を推奨しています。導入手順は[下記](#pgroongaのセットアップ-推奨)を参照してください。

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

   本番運用では[systemdなどでサービス化すること](#systemdでサービス化する-推奨)を推奨します。

## pgroongaのセットアップ(推奨)

[pgroonga](https://pgroonga.github.io/)はPostgreSQL用の高速な全文検索拡張です。標準の`sqlLike`検索に比べて、投稿数が増えた場合の検索速度や、日本語などのCJK言語の検索精度が大きく向上します。

### インストール

ディストリビューションによって導入方法が異なります。

**Debian / Ubuntu**

Groongaプロジェクトが公式のAPTリポジトリを提供しているので、そちらを使うのが簡単です。

```bash
# Groonga公式リポジトリを追加(例はUbuntuの場合。バージョンごとの正確な手順はpgroonga公式サイトを参照)
curl -fsSL https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release -cs).deb -o groonga-apt-source-latest.deb
sudo apt install -y ./groonga-apt-source-latest.deb
sudo apt update
sudo apt install -y postgresql-18-pgroonga
```

`postgresql-18-pgroonga`の`18`は、利用しているPostgreSQLのメジャーバージョンに合わせて変更してください。

**Fedora / RHEL系**

Fedora/RHEL系では、利用しているPostgreSQLのバージョン向けのビルド済みpgroongaパッケージが提供されていないことが多く、**ソースからビルドする**必要があります。

```bash
# ビルドに必要なパッケージ
sudo dnf install -y groonga-devel postgresql-server-devel meson ninja-build ruby msgpack-devel cmake gcc-c++

git clone --recursive https://github.com/pgroonga/pgroonga.git
cd pgroonga
make PG_CONFIG=/usr/pgsql-18/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-18/bin/pg_config
```

> [!note]
> `PG_CONFIG`に渡すパスは、PostgreSQLの導入方法によって変わります。`which pg_config`などで実際のパスを確認してから指定してください。

**その他のディストリビューション**

[pgroonga公式ドキュメントのインストールガイド](https://pgroonga.github.io/install/)を参照してください。

### 有効化

インストール後、Misskeyが使用しているデータベースで拡張を有効化し、`note`テーブルにpgroongaインデックスを作成します。

```sql
CREATE EXTENSION IF NOT EXISTS pgroonga;
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text);
```

日本語の検索精度をさらに上げたい場合、PostgreSQLサーバー上でMeCab(`mecab-ipadic`)が利用可能であれば、以下のようにMeCabベースのトークナイザーを指定することもできます。

```sql
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text) WITH (tokenizer='TokenMecab');
```

最後に、`.config/default.yml`の`fulltextSearch.provider`を`sqlPgroonga`に変更し、Misskeyを再起動してください。

```yaml
fulltextSearch:
  provider: sqlPgroonga
```

## systemdでサービス化する(推奨)

本番運用では、以下のようなsystemdユニットファイルを`/etc/systemd/system/misskey.service`として配置することを推奨します。

```ini
[Unit]
Description=Misskey daemon
After=network.target postgresql.service redis-server.service

[Service]
Type=simple
User=misskey
WorkingDirectory=/home/misskey/misskey
ExecStart=/home/misskey/.local/share/pnpm/pnpm start
Environment="NODE_ENV=production"
Environment="NODE_OPTIONS=--max-old-space-size=2048"
Environment="PNPM_HOME=/home/misskey/.local/share/pnpm"
Environment="PATH=/home/misskey/.local/share/pnpm/bin:/home/misskey/.local/share/pnpm:/usr/local/bin:/usr/bin:/bin"
# jemalloc: 長期運転時の RSS 断片化抑制。decay を短めにして未使用ページを OS へ返す
Environment="LD_PRELOAD=/usr/lib64/libjemalloc.so.2"
Environment="MALLOC_CONF=background_thread:true,dirty_decay_ms:5000,muzzy_decay_ms:5000"
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
TimeoutSec=60
Restart=always
RestartSec=5
# Environment="MK_ONLY_SERVER=1"

# メモリの安全弁(サーバーのRAMに合わせて調整)
MemoryHigh=10G
MemoryMax=12G
MemorySwapMax=0

[Install]
WantedBy=multi-user.target
```

### 各設定項目について

- `User`/`WorkingDirectory`: misskey-juiceをクローンした専用OSユーザーとそのディレクトリに合わせてください。
- `ExecStart`: pnpmの実行ファイルのパスは環境によって異なります。`which pnpm`などで確認してください。マイグレーションはこのユニットに含まれていないため、バージョンアップ時は起動(再起動)前に手動で`pnpm migrate`を実行してください。
- `PNPM_HOME`/`PATH`: systemdはログインシェルの`.bashrc`などを経由しないため、`pnpm`コマンド自体が見つかるようPATHを明示的に指定する必要があります。
- `NODE_OPTIONS=--max-old-space-size`: Node.jsのヒープサイズ上限です。サーバーのRAMに合わせて調整してください。
- `LD_PRELOAD`/`MALLOC_CONF`: [jemalloc](https://jemalloc.net/)を使ったメモリアロケータの差し替えです。標準のアロケータ(glibc malloc)は長期稼働時にメモリの断片化でRSSが徐々に増え続けることがあり、jemallocへの切り替えで改善が期待できます。`dirty_decay_ms`/`muzzy_decay_ms`を短くすることで、未使用になったメモリページをより早くOSに返却させています。導入方法は[下記](#jemallocの導入)を参照してください。
- `MemoryHigh`/`MemoryMax`/`MemorySwapMax`: systemdによるメモリ使用量の安全弁です。`MemoryHigh`を超えるとメモリ確保が徐々に絞られ、`MemoryMax`を超えるとOOM killerによって強制終了されます。サーバー全体のRAM容量に合わせて調整してください。
- コメントアウトされている`Environment="MK_ONLY_SERVER=1"`は現時点では未使用の予約的な行です。通常はコメントのままで問題ありません。

### jemallocの導入

ディストリビューションによってパッケージ名とインストール先のパスが異なります。

**Fedora / RHEL系**

```bash
sudo dnf install -y jemalloc
```

通常は`/usr/lib64/libjemalloc.so.2`にインストールされます。

**Debian / Ubuntu**

```bash
sudo apt install -y libjemalloc2
```

通常は`/usr/lib/x86_64-linux-gnu/libjemalloc.so.2`(CPUアーキテクチャによってパスが異なります)にインストールされます。

**Arch Linux**

```bash
sudo pacman -S jemalloc
```

正確なパスが分からない場合は、以下のコマンドで確認できます。

```bash
ldconfig -p | grep jemalloc
```

ユニットファイルの`LD_PRELOAD`は、確認したパスに合わせて書き換えてください。

## 関連

- [このサーバーの運用方針について](../about-juice-server.md)
- [本家Misskey/他フォークからの移行](./migration-from-misskey.md)
