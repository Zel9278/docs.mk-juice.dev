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
- PostgreSQL(**推荐 18 及以上版本**。如为全新搭建,出于性能和稳定性考虑,请尽量使用较新的版本)
- Redis(或兼容 Redis 的 valkey 等)
- FFmpeg

> [!note] 关于全文搜索引擎
> 标准 Misskey 的全文搜索默认使用 `sqlLike`(PostgreSQL 的 `LIKE` 搜索),但随着帖子数量增加,搜索速度往往会变慢。Juice Server 推荐使用 [pgroonga](https://pgroonga.github.io/),它速度更快,且对日语等 CJK 语言的搜索准确度也更高。安装步骤请参阅[下文](#设置-pgroonga推荐)。

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

   在生产环境中,建议[使用 systemd 等工具将其配置为服务](#使用-systemd-配置为服务推荐)。

## 设置 pgroonga(推荐)

[pgroonga](https://pgroonga.github.io/) 是一款用于 PostgreSQL 的高速全文搜索扩展。相比标准的 `sqlLike` 搜索,当帖子数量增加时,它能提供更快的搜索速度,以及对日语等 CJK 语言更高的搜索准确度。

### 安装

不同发行版的安装方法有所不同。

**Debian / Ubuntu**

Groonga 项目提供了官方 APT 仓库,使用它安装最为简便。

```bash
# 添加 Groonga 官方仓库(以下为 Ubuntu 示例,各版本的具体步骤请参阅 pgroonga 官方网站)
curl -fsSL https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release -cs).deb -o groonga-apt-source-latest.deb
sudo apt install -y ./groonga-apt-source-latest.deb
sudo apt update
sudo apt install -y postgresql-18-pgroonga
```

请将 `postgresql-18-pgroonga` 中的 `18` 替换为您所使用的 PostgreSQL 主版本号。

**Fedora / RHEL 系**

Fedora/RHEL 系发行版通常没有针对所用 PostgreSQL 版本预编译好的 pgroonga 软件包,因此需要**从源代码编译**。

```bash
# 编译所需的软件包
sudo dnf install -y groonga-devel postgresql-server-devel meson ninja-build ruby msgpack-devel cmake gcc-c++

git clone --recursive https://github.com/pgroonga/pgroonga.git
cd pgroonga
make PG_CONFIG=/usr/pgsql-18/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-18/bin/pg_config
```

> [!note]
> 传给 `PG_CONFIG` 的路径因 PostgreSQL 的安装方式而异。请先用 `which pg_config` 等命令确认实际路径后再指定。

**其他发行版**

请参阅 [pgroonga 官方文档的安装指南](https://pgroonga.github.io/install/)。

### 启用

安装完成后,在 Misskey 所使用的数据库中启用该扩展,并为 `note` 表创建 pgroonga 索引。

```sql
CREATE EXTENSION IF NOT EXISTS pgroonga;
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text);
```

如果希望进一步提升日语的搜索准确度,且 PostgreSQL 服务器上可使用 MeCab(`mecab-ipadic`),还可以像下面这样指定基于 MeCab 的分词器。

```sql
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text) WITH (tokenizer='TokenMecab');
```

最后,将 `.config/default.yml` 中的 `fulltextSearch.provider` 改为 `sqlPgroonga`,并重启 Misskey。

```yaml
fulltextSearch:
  provider: sqlPgroonga
```

## 使用 systemd 配置为服务(推荐)

在生产环境中,建议将如下 systemd unit 文件放置为 `/etc/systemd/system/misskey.service`。

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
# jemalloc: 抑制长时间运行时的 RSS 碎片化。将 decay 设置得较短,以更快将未使用页面归还给 OS
Environment="LD_PRELOAD=/usr/lib64/libjemalloc.so.2"
Environment="MALLOC_CONF=background_thread:true,dirty_decay_ms:5000,muzzy_decay_ms:5000"
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
TimeoutSec=60
Restart=always
RestartSec=5
# Environment="MK_ONLY_SERVER=1"

# 内存安全阀(请根据服务器的 RAM 进行调整)
MemoryHigh=10G
MemoryMax=12G
MemorySwapMax=0

[Install]
WantedBy=multi-user.target
```

### 各设置项说明

- `User`/`WorkingDirectory`: 请与克隆 misskey-juice 所用的专用操作系统用户及其目录保持一致。
- `ExecStart`: pnpm 可执行文件的路径因环境而异,请用 `which pnpm` 等方式确认。数据库迁移不包含在此 unit 中,因此版本升级时需要在启动(重启)前手动执行 `pnpm migrate`。
- `PNPM_HOME`/`PATH`: 由于 systemd 不会读取登录 shell 的 `.bashrc` 等文件,因此需要显式指定 PATH,以便系统能够找到 `pnpm` 命令本身。
- `NODE_OPTIONS=--max-old-space-size`: Node.js 的堆内存上限,请根据服务器的 RAM 进行调整。
- `LD_PRELOAD`/`MALLOC_CONF`: 使用 [jemalloc](https://jemalloc.net/) 替换默认的内存分配器。标准分配器(glibc malloc)在长时间运行后,可能因内存碎片化导致 RSS 逐渐增长,而切换为 jemalloc 有助于改善这一问题。缩短 `dirty_decay_ms`/`muzzy_decay_ms` 可以让未使用的内存页更快归还给操作系统。安装方法请参阅[下文](#安装-jemalloc)。
- `MemoryHigh`/`MemoryMax`/`MemorySwapMax`: systemd 提供的内存使用安全阀。超过 `MemoryHigh` 后内存分配会逐渐受限,超过 `MemoryMax` 后进程会被 OOM killer 强制终止。请根据服务器整体的 RAM 容量进行调整。
- 已注释的 `Environment="MK_ONLY_SERVER=1"` 目前是未使用的预留行,通常保持注释状态即可。

### 安装 jemalloc

不同发行版的软件包名称和安装路径有所不同。

**Fedora / RHEL 系**

```bash
sudo dnf install -y jemalloc
```

通常会安装到 `/usr/lib64/libjemalloc.so.2`。

**Debian / Ubuntu**

```bash
sudo apt install -y libjemalloc2
```

通常会安装到 `/usr/lib/x86_64-linux-gnu/libjemalloc.so.2`(路径因 CPU 架构而异)。

**Arch Linux**

```bash
sudo pacman -S jemalloc
```

如果不确定具体路径,可以使用以下命令确认。

```bash
ldconfig -p | grep jemalloc
```

请根据确认到的路径修改 unit 文件中的 `LD_PRELOAD`。

## 相关内容

- [关于本服务器的运营方针](../about-juice-server.md)
- [从官方 Misskey/其他分支迁移](./migration-from-misskey.md)
