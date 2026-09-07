# Reaction enhancements

Several enhancements to standard Misskey's reaction feature.

## Piggybacking on reactions

Clicking a reaction another user already added to a note lets you add the same reaction yourself. The same permission checks as a normal reaction apply (role restrictions, sensitive content, local-only, etc.).

Piggybacking on a reaction made with a remote instance's custom emoji can mean using that instance's emoji image without the copyright holder's permission, so this is opt-in from the JUICE feature settings in the control panel (disabled by default).

::: warning Note
Piggybacking on a reaction using a remote instance's emoji may mean using that emoji image without the copyright holder's permission. The judgment call on licensing is at each user's own risk.

Juice Server currently has this feature enabled for the purpose of testing how it works.
:::

## Resolving remote custom emoji reactions

When a reaction string (`:name@host:`) specifies a custom emoji on a remote host, reactions from local users only are resolved by looking for the emoji in this order: the specified host → local → the note author's host.

For reactions received from remote servers, only the reacting user's own host is used, as before, to prevent impersonation. If you disable this feature in the JUICE settings, the previous behavior (only the reacting user's own host, i.e. local) applies as well.

## Emoji info menu

The "Info" menu you get by clicking an emoji (showing details like its license and the host it's served from) now works for a remote instance's custom emoji, not just local ones. This applies not only to reactions, but also to emoji embedded in a note body, CW, or profile.

## Reaction search

The search page has a dedicated "Reactions" tab that filters notes by reactions you've added.

- You can filter by "notes I reacted to at all", or by a specific reaction.
- The same advanced search options, date range, search scope, and automatic linking of URLs/@users/#tags as note search are also available.
- For privacy reasons, only your own reactions are covered.
