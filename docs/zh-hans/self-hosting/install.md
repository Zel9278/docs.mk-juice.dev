# 从零开始搭建

以下是全新安装 misskey-juice 的步骤。基本流程与[官方 Misskey 手动安装指南](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/)基本相同。

> [!warning] 在搭建公开服务器之前
> 无论是 misskey-juice 还是其他,运营一个公开的 Misskey 服务器所承担的责任都比想象中要大得多。**请在公开之前仔细阅读以下指南并慎重考虑。**
>
> - [chan-mai 撰写的 Misskey 服务器运营指南](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186)(日语)
> - [官方安装指南](https://misskey-hub.net/en/docs/for-admin/install/guides/)
>
> 特别是关于**数据库备份体系**、用户应对・内容审核带来的精神负担、导入自定义表情符号时的版权责任等方面,请事先充分考虑。
>
> **此提示不仅适用于 misskey-juice,同样适用于 Misskey 分支及 Misskey 本身。**

## 前提条件

- Node.js(遵循与官方 Misskey 相同的版本要求)
- pnpm
- PostgreSQL
- Redis(或兼容 Redis 的 valkey 等)
- FFmpeg

## 步骤

所有命令均在**代码仓库的根目录**下执行。

1. 建议为 misskey-juice 创建专用的操作系统用户。

   ```bash
   adduser --disabled-password --disabled-login misskey
   ```
2. 克隆代码仓库并 checkout 发布标签。

   ```bash
   sudo -iu misskey git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   git checkout <标签名>
   git submodule update --init
   ```
3. 安装依赖。

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. 创建配置文件。

   ```bash
   cp .config/example.yml .config/default.yml
   ```

   编辑 `.config/default.yml`,设置 `url`・数据库连接信息等。关于 JUICE 独有功能的设置项,请参阅 [JUICE 独有功能设置](../juice/settings.md)。
5. 进行构建和初始化(数据库迁移)。

   ```bash
   NODE_ENV=production pnpm run build
   pnpm run init
   ```
6. 启动服务器。

   ```bash
   NODE_ENV=production pnpm run start
   ```

   在生产环境中,建议使用 systemd 等工具将其配置为服务。

## 相关内容

- [关于本服务器的运营方针](../about-juice-server.md)
- [从官方 Misskey/其他分支迁移](./migration-from-misskey.md)
