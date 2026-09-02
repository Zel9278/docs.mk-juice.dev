# 從零開始建置

以下是全新安裝 misskey-juice 的步驟。基本流程與[官方 Misskey 手動安裝指南](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/)基本相同。

> [!warning] 在建置公開伺服器之前
> 無論是 misskey-juice 還是其他,營運一個公開的 Misskey 伺服器所承擔的責任都比想像中要大得多。**請在公開之前仔細閱讀以下指南並謹慎考慮。**
>
> - [chan-mai 撰寫的 Misskey 伺服器營運指南](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186)(日語)
> - [官方安裝指南](https://misskey-hub.net/en/docs/for-admin/install/guides/)
>
> 特別是關於**資料庫備份體系**、使用者應對・內容審核帶來的精神負擔、匯入自訂表情符號時的著作權責任等方面,請事先充分考慮。
>
> **此提示不僅適用於 misskey-juice,同樣適用於 Misskey 分支及 Misskey 本身。**

## 先決條件

- Node.js(遵循與官方 Misskey 相同的版本要求)
- pnpm
- PostgreSQL(**建議使用 18 以上版本**。若為全新建置,出於效能與穩定性考量,請盡量使用較新的版本)
- Redis(或相容 Redis 的 valkey 等)
- FFmpeg

> [!note] 關於全文檢索引擎
> 標準 Misskey 的全文檢索預設使用 `sqlLike`(PostgreSQL 的 `LIKE` 檢索),但隨著貼文數量增加,檢索速度往往會變慢。Juice Server 建議使用 [pgroonga](https://pgroonga.github.io/),它速度更快,且對日語等 CJK 語言的檢索準確度也更高。安裝步驟請參閱[下文](#設定-pgroonga建議)。

## 步驟

所有指令均在**程式碼庫的根目錄**下執行。

1. 建議為 misskey-juice 建立專用的作業系統使用者。

   ```bash
   adduser --disabled-password --disabled-login misskey
   ```
2. 複製程式碼庫並 checkout 發布標籤。

   ```bash
   sudo -iu misskey git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   git checkout <標籤名稱>
   git submodule update --init
   ```
3. 安裝相依套件。

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. 建立設定檔。

   ```bash
   cp .config/example.yml .config/default.yml
   ```

   編輯 `.config/default.yml`,設定 `url`・資料庫連線資訊等。關於 JUICE 獨有功能的設定項目,請參閱 [JUICE 獨有功能設定](../juice/settings.md)。
5. 進行建置與初始化(資料庫遷移)。

   ```bash
   NODE_ENV=production pnpm run build
   pnpm run init
   ```
6. 啟動伺服器。

   ```bash
   NODE_ENV=production pnpm run start
   ```

   在正式環境中,建議[使用 systemd 等工具將其設定為服務](#使用-systemd-設定為服務建議)。

## 設定 pgroonga(建議)

[pgroonga](https://pgroonga.github.io/) 是一款用於 PostgreSQL 的高速全文檢索擴充功能。相比標準的 `sqlLike` 檢索,當貼文數量增加時,它能提供更快的檢索速度,以及對日語等 CJK 語言更高的檢索準確度。

### 安裝

不同發行版的安裝方法有所不同。

**Debian / Ubuntu**

Groonga 專案提供了官方 APT 儲存庫,使用它安裝最為簡便。

```bash
# 新增 Groonga 官方儲存庫(以下為 Ubuntu 範例,各版本的詳細步驟請參閱 pgroonga 官方網站)
curl -fsSL https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release -cs).deb -o groonga-apt-source-latest.deb
sudo apt install -y ./groonga-apt-source-latest.deb
sudo apt update
sudo apt install -y postgresql-18-pgroonga
```

請將 `postgresql-18-pgroonga` 中的 `18` 替換為您所使用的 PostgreSQL 主版本號。

**Fedora / RHEL 系**

Fedora/RHEL 系發行版通常沒有針對所用 PostgreSQL 版本預先編譯好的 pgroonga 套件,因此需要**從原始碼編譯**。

```bash
# 編譯所需的套件
sudo dnf install -y groonga-devel postgresql-server-devel meson ninja-build ruby msgpack-devel cmake gcc-c++

git clone --recursive https://github.com/pgroonga/pgroonga.git
cd pgroonga
make PG_CONFIG=/usr/pgsql-18/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-18/bin/pg_config
```

> [!note]
> 傳給 `PG_CONFIG` 的路徑會因 PostgreSQL 的安裝方式而異。請先用 `which pg_config` 等指令確認實際路徑後再指定。

**其他發行版**

請參閱 [pgroonga 官方文件的安裝指南](https://pgroonga.github.io/install/)。

### 啟用

安裝完成後,在 Misskey 所使用的資料庫中啟用該擴充功能,並為 `note` 表建立 pgroonga 索引。

```sql
CREATE EXTENSION IF NOT EXISTS pgroonga;
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text);
```

如果希望進一步提升日語的檢索準確度,且 PostgreSQL 伺服器上可使用 MeCab(`mecab-ipadic`),還可以像下面這樣指定基於 MeCab 的分詞器。

```sql
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text) WITH (tokenizer='TokenMecab');
```

最後,將 `.config/default.yml` 中的 `fulltextSearch.provider` 改為 `sqlPgroonga`,並重新啟動 Misskey。

```yaml
fulltextSearch:
  provider: sqlPgroonga
```

## 使用 systemd 設定為服務(建議)

在正式環境中,建議將如下 systemd unit 檔案放置為 `/etc/systemd/system/misskey.service`。

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
# jemalloc: 抑制長時間運作時的 RSS 碎片化。將 decay 設定得較短,以更快將未使用頁面歸還給 OS
Environment="LD_PRELOAD=/usr/lib64/libjemalloc.so.2"
Environment="MALLOC_CONF=background_thread:true,dirty_decay_ms:5000,muzzy_decay_ms:5000"
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
TimeoutSec=60
Restart=always
RestartSec=5
# Environment="MK_ONLY_SERVER=1"

# 記憶體安全閥(請根據伺服器的 RAM 進行調整)
MemoryHigh=10G
MemoryMax=12G
MemorySwapMax=0

[Install]
WantedBy=multi-user.target
```

### 各設定項說明

- `User`/`WorkingDirectory`: 請與複製 misskey-juice 所用的專用作業系統使用者及其目錄保持一致。
- `ExecStart`: pnpm 執行檔的路徑因環境而異,請用 `which pnpm` 等方式確認。資料庫遷移不包含在此 unit 中,因此版本升級時需要在啟動(重新啟動)前手動執行 `pnpm migrate`。
- `PNPM_HOME`/`PATH`: 由於 systemd 不會讀取登入 shell 的 `.bashrc` 等檔案,因此需要明確指定 PATH,以便系統能夠找到 `pnpm` 指令本身。
- `NODE_OPTIONS=--max-old-space-size`: Node.js 的堆積記憶體上限,請根據伺服器的 RAM 進行調整。
- `LD_PRELOAD`/`MALLOC_CONF`: 使用 [jemalloc](https://jemalloc.net/) 取代預設的記憶體配置器。標準配置器(glibc malloc)在長時間運作後,可能因記憶體碎片化導致 RSS 逐漸增長,而切換為 jemalloc 有助於改善此問題。縮短 `dirty_decay_ms`/`muzzy_decay_ms` 可以讓未使用的記憶體頁更快歸還給作業系統。安裝方法請參閱[下文](#安裝-jemalloc)。
- `MemoryHigh`/`MemoryMax`/`MemorySwapMax`: systemd 提供的記憶體使用安全閥。超過 `MemoryHigh` 後記憶體配置會逐漸受限,超過 `MemoryMax` 後行程會被 OOM killer 強制終止。請根據伺服器整體的 RAM 容量進行調整。
- 已註解的 `Environment="MK_ONLY_SERVER=1"` 目前是未使用的保留行,通常保持註解狀態即可。

### 安裝 jemalloc

不同發行版的套件名稱和安裝路徑有所不同。

**Fedora / RHEL 系**

```bash
sudo dnf install -y jemalloc
```

通常會安裝到 `/usr/lib64/libjemalloc.so.2`。

**Debian / Ubuntu**

```bash
sudo apt install -y libjemalloc2
```

通常會安裝到 `/usr/lib/x86_64-linux-gnu/libjemalloc.so.2`(路徑因 CPU 架構而異)。

**Arch Linux**

```bash
sudo pacman -S jemalloc
```

如果不確定確切路徑,可以使用以下指令確認。

```bash
ldconfig -p | grep jemalloc
```

請根據確認到的路徑修改 unit 檔案中的 `LD_PRELOAD`。

## 相關內容

- [關於本伺服器的營運方針](../about-juice-server.md)
- [從官方 Misskey/其他分支遷移](./migration-from-misskey.md)
