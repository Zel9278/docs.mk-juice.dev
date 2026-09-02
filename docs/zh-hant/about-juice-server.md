# 關於本伺服器的營運方針

## 什麼是 Juice Server?

Juice Server 是追蹤 Misskey 非官方分支 [misskey-juice](https://github.com/Zel9278/misskey-juice) 的 [`juice/main` 分支](https://github.com/Zel9278/misskey-juice/tree/juice/main) 的官方伺服器。

## 作為測試伺服器的定位

Juice Server 是為了在實際營運環境中驗證 misskey-juice 開發的新功能和修復而建置和營運的。

- **目前啟用審核制註冊正是出於這一驗證目的。** 這不是任何人都可以自由註冊的伺服器,而是需要審核註冊申請內容後才能通過的方式。
- 有時會提前啟用 misskey-juice 中仍在驗證階段的功能,可能會出現意外問題。
- 如果您發現問題,請透過 Misskey 訊息聯絡管理員([@c30](https://mk-juice.dev/@c30)),這將對我們有很大幫助。

## 作為通用伺服器的營運

除了上述測試目的外,**我們還計劃將本伺服器作為面向創作者以及希望與他人正常交流的用戶的通用伺服器來營運。**

使用前請務必閱讀以下內容。

- [規則](./service/rules.md)
- [服務條款](./service/tos.md)

## 關於資料處理

- 資料庫會定期自動備份,並加密後儲存在外部儲存空間中。
- 但由於本伺服器屬於測試伺服器性質,不能完全排除因驗證中的問題導致資料遺失的可能性。敬請見諒。

## 聯絡方式

如有疑問、需求或錯誤回報,請透過 Misskey 訊息聯絡管理員([@c30](https://mk-juice.dev/@c30))。
