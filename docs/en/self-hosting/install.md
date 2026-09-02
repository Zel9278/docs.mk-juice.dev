# Building from scratch

Steps for a fresh install of misskey-juice. The overall flow is nearly the same as [upstream Misskey's manual installation guide](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/).

> [!warning] Before running a public server
> Running a public Misskey server, whether misskey-juice or otherwise, carries more responsibility than you might expect. **Please read the following guides carefully and think it through before making it public.**
>
> - [chan-mai's Misskey server operation guide](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186) (Japanese)
> - [The official installation guide](https://misskey-hub.net/en/docs/for-admin/install/guides/)
>
> In particular, please carefully consider **your database backup setup**, the emotional burden of handling users and moderation, and copyright responsibility when importing custom emoji.
>
> **This note applies not just to misskey-juice, but to Misskey forks and Misskey itself in general.**

## Prerequisites

- Node.js (following the same version requirements as upstream Misskey)
- pnpm
- PostgreSQL (**18 or later is recommended**. For a fresh install, use as new a version as you reasonably can for performance and stability reasons)
- Redis (or a Redis-compatible alternative such as valkey)
- FFmpeg

> [!note] About the full-text search engine
> Standard Misskey uses `sqlLike` (PostgreSQL's `LIKE` search) for full-text search, which tends to get slower as the number of notes grows. Juice Server recommends using [pgroonga](https://pgroonga.github.io/) instead, which is faster and gives much better search accuracy for CJK languages such as Japanese. See [below](#setting-up-pgroonga-recommended) for setup instructions.

## Steps

Run all commands from the **root directory of the repository**.

1. We recommend creating a dedicated OS user for misskey-juice.

   ```bash
   adduser --disabled-password --disabled-login misskey
   ```
2. Clone the repository and check out a release tag.

   ```bash
   sudo -iu misskey git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   git checkout <tag name>
   git submodule update --init
   ```
3. Install dependencies.

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. Create your configuration file.

   ```bash
   cp .config/example.yml .config/default.yml
   ```

   Edit `.config/default.yml` to set the `url`, database connection information, and so on. For JUICE-specific settings, see [JUICE feature settings](../juice/settings.md).
5. Build and initialize (run migrations).

   ```bash
   NODE_ENV=production pnpm run build
   pnpm run init
   ```
6. Start the server.

   ```bash
   NODE_ENV=production pnpm run start
   ```

   For production, we recommend [running it as a service using systemd](#setting-it-up-as-a-systemd-service-recommended).

## Setting up pgroonga (recommended)

[pgroonga](https://pgroonga.github.io/) is a fast full-text search extension for PostgreSQL. Compared to the standard `sqlLike` search, it gives much better search speed as your note count grows, and much better search accuracy for CJK languages such as Japanese.

### Installing it

The installation method differs by distribution.

**Debian / Ubuntu**

The Groonga project provides an official APT repository, which is the easiest way to install it.

```bash
# Add the official Groonga repository (example for Ubuntu; check pgroonga's site for exact steps per version)
curl -fsSL https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release -cs).deb -o groonga-apt-source-latest.deb
sudo apt install -y ./groonga-apt-source-latest.deb
sudo apt update
sudo apt install -y postgresql-18-pgroonga
```

Replace the `18` in `postgresql-18-pgroonga` with the major version of PostgreSQL you're using.

**Fedora / RHEL family**

Fedora/RHEL-family distributions often don't ship a prebuilt pgroonga package for the PostgreSQL version you're using, so you'll need to **build it from source**.

```bash
# Packages required to build it
sudo dnf install -y groonga-devel postgresql-server-devel meson ninja-build ruby msgpack-devel cmake gcc-c++

git clone --recursive https://github.com/pgroonga/pgroonga.git
cd pgroonga
make PG_CONFIG=/usr/pgsql-18/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-18/bin/pg_config
```

> [!note]
> The path you pass to `PG_CONFIG` depends on how PostgreSQL was installed. Check the actual path with `which pg_config` before specifying it.

**Other distributions**

See the [official pgroonga installation guide](https://pgroonga.github.io/install/).

### Enabling it

After installing it, enable the extension on the database Misskey uses, and create a pgroonga index on the `note` table's text column.

```sql
CREATE EXTENSION IF NOT EXISTS pgroonga;
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text);
```

If you want even better accuracy for Japanese text and MeCab (`mecab-ipadic`) is available on the PostgreSQL host, you can specify a MeCab-based tokenizer instead:

```sql
CREATE INDEX note_text_pgroonga_index ON note USING pgroonga (text) WITH (tokenizer='TokenMecab');
```

Finally, change `fulltextSearch.provider` to `sqlPgroonga` in `.config/default.yml` and restart Misskey.

```yaml
fulltextSearch:
  provider: sqlPgroonga
```

## Setting it up as a systemd service (recommended)

For production, we recommend placing a systemd unit file like the following at `/etc/systemd/system/misskey.service`.

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
# jemalloc: keeps RSS fragmentation down over long-running uptimes. Shorter decay times return unused pages to the OS sooner
Environment="LD_PRELOAD=/usr/lib64/libjemalloc.so.2"
Environment="MALLOC_CONF=background_thread:true,dirty_decay_ms:5000,muzzy_decay_ms:5000"
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
TimeoutSec=60
Restart=always
RestartSec=5
# Environment="MK_ONLY_SERVER=1"

# Memory safety valve (adjust to your server's RAM)
MemoryHigh=10G
MemoryMax=12G
MemorySwapMax=0

[Install]
WantedBy=multi-user.target
```

### About each setting

- `User`/`WorkingDirectory`: match these to the dedicated OS user and directory where you cloned misskey-juice.
- `ExecStart`: the path to the pnpm executable varies by environment; check it with `which pnpm`. Migrations aren't run by this unit, so run `pnpm migrate` manually before restarting whenever a version upgrade requires one.
- `PNPM_HOME`/`PATH`: systemd doesn't source your shell's `.bashrc` or similar, so you need to set `PATH` explicitly so the `pnpm` command itself can be found.
- `NODE_OPTIONS=--max-old-space-size`: Node.js's heap size limit. Adjust it to your server's RAM.
- `LD_PRELOAD`/`MALLOC_CONF`: swaps in [jemalloc](https://jemalloc.net/) as the memory allocator. The default allocator (glibc malloc) can let RSS grow gradually over long uptimes due to memory fragmentation; switching to jemalloc tends to improve this. Shortening `dirty_decay_ms`/`muzzy_decay_ms` makes it return unused memory pages to the OS sooner. See [below](#installing-jemalloc) for how to install it.
- `MemoryHigh`/`MemoryMax`/`MemorySwapMax`: systemd's memory safety valve. Once `MemoryHigh` is exceeded, memory allocation is gradually throttled; once `MemoryMax` is exceeded, the OOM killer terminates the process. Adjust these to your server's total RAM.
- The commented-out `Environment="MK_ONLY_SERVER=1"` line is currently unused/reserved. It's fine to leave it commented out.

### Installing jemalloc

The package name and install path differ by distribution.

**Fedora / RHEL family**

```bash
sudo dnf install -y jemalloc
```

Usually installed at `/usr/lib64/libjemalloc.so.2`.

**Debian / Ubuntu**

```bash
sudo apt install -y libjemalloc2
```

Usually installed at `/usr/lib/x86_64-linux-gnu/libjemalloc.so.2` (the path varies by CPU architecture).

**Arch Linux**

```bash
sudo pacman -S jemalloc
```

If you're not sure of the exact path, you can check with:

```bash
ldconfig -p | grep jemalloc
```

Update the unit file's `LD_PRELOAD` to match the path you found.

## Related

- [About this server's operating policy](../about-juice-server.md)
- [Migrating from upstream Misskey/other forks](./migration-from-misskey.md)
