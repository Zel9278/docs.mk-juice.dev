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
- PostgreSQL
- Redis(或相容 Redis 的 valkey 等)
- FFmpeg

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

   在正式環境中,建議使用 systemd 等工具將其設定為服務。

## 相關內容

- [關於本伺服器的營運方針](../about-juice-server.md)
- [從官方 Misskey/其他分支遷移](./migration-from-misskey.md)
