# Migrating from upstream Misskey/other forks

A guide for anyone running their own Misskey server who wants to switch the software to misskey-juice.

> [!warning] Warning
> These steps are general guidance and do not guarantee behavior across every environment, every version, or every fork. **Always back up your database first, and if possible, rehearse the migration in a staging environment before applying it to production.**
>
> Also, if you plan to keep running a public server, we recommend reading [chan-mai's Misskey server operation guide](https://mq1.dev/entry/krpvl5itbr9h#h0cb67a7186) (Japanese) and [the official installation guide](https://misskey-hub.net/en/docs/for-admin/install/guides/). This note applies not just to misskey-juice, but to Misskey forks and Misskey itself in general.

## Where misskey-juice fits in

misskey-juice is a fork that branched off from upstream Misskey's [`Release: 2026.7.0`](https://github.com/misskey-dev/misskey/releases/tag/2026.7.0). Its migration history inherits everything up through upstream 2026.7.0, with JUICE's original feature additions layered on top.

Because of this, **if you're running upstream Misskey (develop) at roughly 2026.7.0 or later, you can likely migrate the same way you would perform a normal minor/major update.**

On the other hand, if you're running a fork that has diverged significantly from upstream Misskey, such as [CherryPick](https://github.com/kokonect-link/cherrypick), the migration history itself differs, so following these steps as-is is unlikely to work. In that case, consider a fresh install plus exporting/importing your data instead of a direct migration.

## Migration steps

The overall flow is nearly the same as [upstream Misskey's update procedure](https://misskey-hub.net/en/docs/for-admin/install/guides/manual/). Run all commands from the **root directory of the repository** (there's no need to manually `cd` into subdirectories like `packages/backend`).

1. **Back up your database** (e.g. with `pg_dump`). This is the single most important step.
2. Get the misskey-juice source.

   ```bash
   git clone --recursive https://github.com/Zel9278/misskey-juice.git
   cd misskey-juice
   ```

   Check out the latest [release tag](https://github.com/Zel9278/misskey-juice/releases) and initialize submodules.

   ```bash
   git checkout <tag name>
   git submodule update --init
   ```
3. Install dependencies.

   ```bash
   NODE_ENV=production pnpm install --frozen-lockfile
   ```
4. Build.

   ```bash
   NODE_ENV=production pnpm run build
   ```
5. Copy your existing `.config/default.yml` as-is into this repository's `.config/default.yml` (db/redis connection info etc. does not need to change). For JUICE-specific settings, see [JUICE feature settings](../juice/settings.md).
6. Run migrations (you can run this from the root directory as-is).

   ```bash
   pnpm run migrate
   ```
7. Start the server and confirm it's working correctly. If you're running it as a systemd service, point `WorkingDirectory` at the new directory before restarting.

## After migrating

- Some [JUICE features](../juice/index.md) are disabled by default. Enable them as needed from the "JUICE" item in the control panel.
- If something goes wrong, roll back using the backup you took in step 1.
