# 从官方 Misskey/其他分支迁移

本指南适用于自行运营 Misskey 服务器,希望将软件切换为 misskey-juice 的用户。

> [!warning] 注意
> 此处的步骤仅为一般性指导,不保证在所有环境・所有版本・所有分支下均能正常运行。**请务必事先备份数据库,如条件允许,建议先在预发布环境中进行一次演练后再应用于生产环境。**
>
> 此外,若您计划继续运营为公开服务器,建议同时阅读 [chan-mai 撰写的 Misskey 服务器运营指南](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186)(日语)及[官方安装指南](https://misskey-hub.net/en/docs/for-admin/install/guides/)。此提示不仅适用于 misskey-juice,同样适用于 Misskey 分支及 Misskey 本身。

## misskey-juice 的定位

misskey-juice 是从官方 Misskey 的 [`Release: 2026.7.0`](https://github.com/misskey-dev/misskey/releases/tag/2026.7.0) 分支而来的项目。其迁移历史也继承了官方 2026.7.0 版本为止的全部内容,并在此基础上叠加了 JUICE 独有的功能添加部分。

因此,**如果您正在运营官方 Misskey(develop),且版本相当于 2026.7.0 或更新,则很可能可以按照常规的次要/主要版本更新的方式进行迁移。**

另一方面,若您运营的是像 [CherryPick](https://github.com/kokonect-link/cherrypick) 这样与官方 Misskey 存在较大差异的分支,由于迁移历史本身不同,预计难以按照本步骤进行迁移。此情况下,建议不进行迁移,而是重新搭建后再考虑数据的导出/导入。

## 迁移步骤

基本流程与[官方 Misskey 的更新步骤](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/)基本相同。所有命令均在**代码仓库的根目录**下执行(无需手动切换到 `packages/backend` 等子目录)。

1. **备份数据库**(如使用 `pg_dump` 等)。这是最重要的步骤。
2. 获取 misskey-juice 源代码。

   ```bash
   git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   ```

   Checkout 最新的[发布标签](https://github.com/Zel9278/misskey-juice/releases)并初始化子模块。

   ```bash
   git checkout <标签名>
   git submodule update --init
   ```
3. 安装依赖。

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. 构建。

   ```bash
   NODE_ENV=production pnpm run build
   ```
5. 将现有的 `.config/default.yml` 原样复制为本代码仓库的 `.config/default.yml`(数据库/redis 连接信息等无需更改)。关于 JUICE 独有功能的设置项,请参阅 [JUICE 独有功能设置](../juice/settings.md)。
6. 执行数据库迁移(可直接在根目录下运行)。

   ```bash
   pnpm run migrate
   ```
7. 启动服务器并确认是否正常运行。若通过 systemd 等方式将其配置为服务,请将 `WorkingDirectory` 指向新目录后再重启。

## 迁移后的注意事项

- 部分 [JUICE 独有功能](../juice/index.md) 默认处于禁用状态。请根据需要在控制面板的"JUICE"项目中启用。
- 如遇到任何问题,请使用步骤 1 中创建的备份进行回滚。
