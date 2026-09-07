# 更新日誌

關於 misskey-juice 中 JUICE 獨有功能的主要更新日誌。不包含源自官方 Misskey 的變更內容。完整歷史記錄請參閱 [GitHub 發布頁面](https://github.com/Zel9278/misskey-juice/releases)。

> [!note]
> 新版本發布後會自動新增到[日語更新日誌](../../juice/changelog.md)中,但本繁體中文頁面僅為手動更新,可能無法及時反映最新內容。如需最新資訊,請同時參閱日語頁面(或上方 GitHub 發布頁面)。

## v2026.9.0-juice+3.0

跟進官方 Misskey 2026.9.0 的重大版本。主要新增功能:

- [表情回應功能增強](./reaction-enhancements.md)(跟隨回應、遠端自訂表情回應解析、表情回應搜尋分頁等)
- [貼文語言](./post-language.md)
- [貼文搜尋增強](./note-search-enhancements.md)
- [聯絡表單](./contact-form.md)
- 為表情符號・頭像裝飾申請新增批次申請、替換申請及核准時編輯功能
- [使用者排行榜](./user-ranking.md)的顯示人數現可在 JUICE 設定中調整(預設 3 人)
- 擴充審核・管理員通知(表情符號申請、聯絡表單等新提交內容會即時顯示在控制面板中)
- 系統郵件多語言支援
- 各類安全性增強(擴大 captcha 適用範圍、登入失敗時通知本人、審核處理的互斥控制等)
- 為 Deck UI 的欄目新增「收藏」
- 啟動載入畫面新增啟動日誌顯示及自訂啟動語設定
- 工作佇列小工具的提示音現可更換為自選音效

## v2026.7.0-juice+2.5

- [表情符號申請](./emoji-request.md)・頭像裝飾申請・[審核制註冊](./approval-signup.md)的批准/駁回權限,現已可按角色單獨授權給不具備板主權限的使用者

## v2026.7.0-juice+2.4

- 新增「頭像裝飾申請」頁面,一般使用者可申請頭像裝飾(與[表情符號申請](./emoji-request.md)採用相同機制)
- 修復管理介面中 JUICE 獨有項目未顯示徽章的問題

## v2026.7.0-juice+2.3

- Webhook 傳送目標為 Discord Webhook URL 時,現已支援自動偵測並整理為易讀的 Embed 格式傳送

## v2026.7.0-juice+2.2

- 自本版本起開始向 `juice/main` 分支公開發布
- 修復 pgroonga 搜尋時,含有 `OR` 或 `-` 等符號的關鍵字會導致搜尋失敗的問題
- (chan-mai 貢獻)修復表情符號申請批准時的檔案損壞問題、登入時待審核檢查的時序問題等

## v2026.7.0-juice+2.1

- 應用程式內 [About JUICE 頁面](./about-page.md) 新增貢獻者欄目

## v2026.7.0-juice+2.0

集中新增大量 JUICE 獨有功能的重大版本。主要新增功能:

- [審核制註冊](./approval-signup.md)
- [AI 生成內容標記](./ai-generated-flag.md)
- [表情符號申請](./emoji-request.md)
- [使用者排行榜](./user-ranking.md)
- [中繼時間軸](./relay-timeline.md)
- [小工具位置設定](./widget-position.md)
- [公告投票功能](./announcement-poll.md)
- [LaTeX(數學公式)顯示](./latex.md)
- 面向其他使用者的專屬暱稱功能
- 登入失敗時的本人通知
- 新增應用程式內 [About JUICE 頁面](./about-page.md)

## v2026.7.0-juice+1.0

以 Misskey 2026.7.0 為基礎的首個版本。從 misskey-art 移植了以下內容:

- 敏感圖片顯示相關修復(已在官方 Misskey 2026.9.0 中修復,現已不再是 JUICE 獨有功能)
- [公告表情回應功能](./announcement-reaction.md)
- 開發用資料庫誤刪除防護措施
