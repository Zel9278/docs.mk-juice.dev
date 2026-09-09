# Post language

Lets you explicitly specify a language for each post. It federates in a format compatible with Mastodon.

## Specifying a language when posting

In the note composer, you can explicitly specify the post's language (a BCP 47 language tag). If not specified, your display language setting is used as the default.

For ActivityPub federation, this uses the AS2-standard `contentMap` (compatible with Mastodon and Akoma).

## Timeline language filter

From the JUICE feature settings, you can filter which posts appear on the Home, Local, and Global timelines by language. This is inspired by Mastodon's "Filtered languages", with a few differences:

- It applies to all timelines.
- Renotes are judged by the language of the renoted note.
- When the filter is active (one or more languages selected), notes with no language specified are also filtered out and hidden.

You can also toggle this directly from the "..." menu on the timeline screen.

You can choose whether your own notes are always shown even when the filter is active (on by default). When turned off, your own notes are filtered by language just like everyone else's. This setting has no effect on the Global timeline.

## Specifying a language in search

The advanced search options for note search and reaction search include filtering by the post's language.

## Showing only local users

The "..." menu on the Home timeline has a toggle to filter down to only local users' posts — useful if you want to temporarily hide posts from remote users you follow.
