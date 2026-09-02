# 更新日志

关于 misskey-juice 中 JUICE 独有功能的主要更新日志。不包含源自官方 Misskey 的变更内容。完整历史记录请参阅 [GitHub 发布页面](https://github.com/Zel9278/misskey-juice/releases)。

> [!note]
> 新版本发布后会自动添加到[日语更新日志](../../juice/changelog.md)中,但本简体中文页面仅为手动更新,可能无法及时反映最新内容。如需最新信息,请同时参阅日语页面(或上方 GitHub 发布页面)。

## v2026.7.0-juice+2.5

- [表情符号申请](./emoji-request.md)・头像装饰申请・[审核制注册](./approval-signup.md)的批准/驳回权限,现已可按角色单独授权给不具备版主权限的用户

## v2026.7.0-juice+2.4

- 新增"头像装饰申请"页面,普通用户可申请头像装饰(与[表情符号申请](./emoji-request.md)采用相同机制)
- 修复管理界面中 JUICE 独有项目未显示徽章的问题

## v2026.7.0-juice+2.3

- Webhook 发送目标为 Discord Webhook URL 时,现已支持自动检测并整理为易读的 Embed 格式发送

## v2026.7.0-juice+2.2

- 自本版本起开始向 `juice/main` 分支公开发布
- 修复 pgroonga 搜索时,含有 `OR` 或 `-` 等符号的关键词会导致搜索失败的问题
- (chan-mai 贡献)修复表情符号申请批准时的文件损坏问题、登录时待审核检查的时序问题等

## v2026.7.0-juice+2.1

- 应用内 [About JUICE 页面](./about-page.md) 新增贡献者栏目

## v2026.7.0-juice+2.0

集中新增大量 JUICE 独有功能的重大版本。主要新增功能:

- [审核制注册](./approval-signup.md)
- [AI 生成内容标记](./ai-generated-flag.md)
- [表情符号申请](./emoji-request.md)
- [用户排行榜](./user-ranking.md)
- [中继时间线](./relay-timeline.md)
- [小组件位置设置](./widget-position.md)
- [公告投票功能](./announcement-poll.md)
- [LaTeX(数学公式)显示](./latex.md)
- 面向其他用户的专属昵称功能
- 登录失败时的本人通知
- 新增应用内 [About JUICE 页面](./about-page.md)

## v2026.7.0-juice+1.0

以 Misskey 2026.7.0 为基础的首个版本。从 misskey-art 移植了以下内容:

- [敏感图片显示相关修复](./cw-image-blur-fix.md)
- [公告表情回应功能](./announcement-reaction.md)
- 开发用数据库误删除防护措施
