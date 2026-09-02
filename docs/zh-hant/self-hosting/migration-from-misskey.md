# 從官方 Misskey/其他分支遷移

本指南適用於自行營運 Misskey 伺服器,希望將軟體切換為 misskey-juice 的使用者。

> [!warning] 注意
> 此處的步驟僅為一般性指導,不保證在所有環境・所有版本・所有分支下均能正常運作。**請務必事先備份資料庫,如條件允許,建議先在預備環境中進行一次演練後再套用於正式環境。**
>
> 此外,若您計劃繼續營運為公開伺服器,建議同時閱讀 [chan-mai 撰寫的 Misskey 伺服器營運指南](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186)(日語)及[官方安裝指南](https://misskey-hub.net/en/docs/for-admin/install/guides/)。此提示不僅適用於 misskey-juice,同樣適用於 Misskey 分支及 Misskey 本身。

## misskey-juice 的定位

misskey-juice 是從官方 Misskey 的 [`Release: 2026.7.0`](https://github.com/misskey-dev/misskey/releases/tag/2026.7.0) 分支而來的專案。其遷移歷史也繼承了官方 2026.7.0 版本為止的全部內容,並在此基礎上疊加了 JUICE 獨有的功能新增部分。

因此,**如果您正在營運官方 Misskey(develop),且版本相當於 2026.7.0 或更新,則很可能可以按照常規的次要/主要版本更新的方式進行遷移。**

另一方面,若您營運的是像 [CherryPick](https://github.com/kokonect-link/cherrypick) 這樣與官方 Misskey 存在較大差異的分支,由於遷移歷史本身不同,預計難以按照本步驟進行遷移。此情況下,建議不進行遷移,而是重新建置後再考慮資料的匯出/匯入。

## 遷移步驟

基本流程與[官方 Misskey 的更新步驟](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/)基本相同。所有指令均在**程式碼庫的根目錄**下執行(無需手動切換到 `packages/backend` 等子目錄)。

1. **備份資料庫**(如使用 `pg_dump` 等)。這是最重要的步驟。
2. 取得 misskey-juice 原始碼。

   ```bash
   git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   ```

   Checkout 最新的[發布標籤](https://github.com/Zel9278/misskey-juice/releases)並初始化子模組。

   ```bash
   git checkout <標籤名稱>
   git submodule update --init
   ```
3. 安裝相依套件。

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. 建置。

   ```bash
   NODE_ENV=production pnpm run build
   ```
5. 將現有的 `.config/default.yml` 原樣複製為本程式碼庫的 `.config/default.yml`(資料庫/redis 連線資訊等無需變更)。關於 JUICE 獨有功能的設定項目,請參閱 [JUICE 獨有功能設定](../juice/settings.md)。
6. 執行資料庫遷移(可直接在根目錄下執行)。

   ```bash
   pnpm run migrate
   ```
7. 啟動伺服器並確認是否正常運作。若透過 systemd 等方式將其設定為服務,請將 `WorkingDirectory` 指向新目錄後再重新啟動。

## 遷移後的注意事項

- 部分 [JUICE 獨有功能](../juice/index.md) 預設處於停用狀態。請視需要在控制面板的「JUICE」項目中啟用。
- 如遇到任何問題,請使用步驟 1 中建立的備份進行回復。

## 關於 PostgreSQL 版本

出於效能與穩定性考量,Juice Server 建議升級到**PostgreSQL 18 以上版本**。如果您打算在此次遷移中同時升級 PostgreSQL 本身,請先使用 `pg_upgrade` 或 `pg_dumpall`/`pg_restore` 完成 PostgreSQL 端的遷移,再執行上述步驟 1~7(PostgreSQL 本身的版本升級與 misskey-juice 的資料庫遷移是兩項獨立的工作)。

## 遷移至 pgroonga(建議)

將全文檢索從預設的 `sqlLike` 切換為 pgroonga,可以大幅提升檢索速度與準確度(尤其是日語等 CJK 語言)。安裝與啟用方法請參閱[《從零開始建置》指南中的 pgroonga 部分](./install.md#設定-pgroonga-建議)。

如果遷移的伺服器已經累積了大量貼文,為 `note` 表建立索引(`CREATE INDEX ... USING pgroonga`)可能需要較長時間。如果條件允許,請在使用人數較少的時段進行此操作。
