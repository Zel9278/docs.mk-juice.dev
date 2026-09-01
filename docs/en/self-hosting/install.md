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
- PostgreSQL
- Redis (or a Redis-compatible alternative such as valkey)
- FFmpeg

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

   For production, we recommend running it as a service using systemd or similar.

## Related

- [About this server's operating policy](../about-juice-server.md)
- [Migrating from upstream Misskey/other forks](./migration-from-misskey.md)
