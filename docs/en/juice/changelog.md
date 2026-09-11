# Changelog

Major changes to misskey-juice's JUICE-specific features. This does not include changes inherited from upstream Misskey. For the full history, see the [GitHub releases page](https://github.com/Zel9278/misskey-juice/releases).

> [!note]
> This page is updated manually and may lag behind the [Japanese changelog](../../juice/changelog.md). If you need the latest information, please check the Japanese page (or the GitHub releases page above) as well.

## v2026.9.0-juice+3.4

- Added the [media timeline](./media-timeline.md), a PixelFed-style dedicated timeline that collects only posts with attached files in a grid/carousel layout (only available if an admin has enabled it). Both video and audio can be played inline, and individual posts can be excluded from it
- Changed the volume setting to be shared across all inline playback in the lightbox and the media timeline (saved locally on the device)
- Which timelines appear in the timeline tab bar can now be individually hidden per viewer from `/settings/juice`

## v2026.9.0-juice+3.3

- Fixed the pending-request warning banner (emoji requests, approval-required signups, etc.) not clearing while the control panel was open, even after the requests were resolved
- Fixed reordering the navigation bar, emoji palette, and widgets on smartphones not working correctly with touch input (especially long-press)
- Fixed buttons (e.g. change avatar, save) overlapping the "Back"/"Continue" footer buttons in the post-signup profile setup dialog on short, landscape-oriented screens

## v2026.9.0-juice+3.2

- New emoji/avatar decoration request notifications, new approval-required signup applications, and new contact form submissions now also appear in the standard notification list (🔔), not just the realtime toast/banner. Role-policy holders who aren't moderators now receive realtime notifications app-wide as well
- [Emoji requests](./emoji-request.md) and avatar decoration requests can now be cancelled by the requester themselves while still pending
- The "Register with invitation code" button on the welcome page / "Add account" menu, and the "Explore other servers" button, can each be hidden via admin settings
- Added a new standard theme, "Juice Orange" (light/dark), based on the JUICE brand color, and set it as the default theme
- The [relay timeline](./relay-timeline.md) now shows which relay each note was delivered through
- Fixed the [display language filter](./post-language.md#timeline-language-filter) not applying to some timelines and realtime streaming. Also revised how notes with no specified language are handled, and how always-showing your own notes is configured
- Added a confirmation dialog before closing the "delete and edit" form to prevent accidental closes, and fixed content being lost when closing without editing
- Fixed remote emoji reaction piggybacking falling back to a heart on upstream Misskey and other forks
- Added English, Korean, and Simplified Chinese translations for JUICE-specific strings

## v2026.9.0-juice+3.1

- The [emoji info menu](./reaction-enhancements.md#emoji-info-menu) now also works for emoji embedded in a note body, CW, or profile, not just reactions
- The maximum number of reaction types on an [announcement reaction](./announcement-reaction.md) is now configurable via role policy (20 by default)
- Added a copyright note about using remote emoji via reaction piggybacking to the admin panel and the in-app [About JUICE page](./about-page.md) as well
- Fixed display and real-time update issues with the Favorites deck column
- Split the job queue widget's notification sound setting into a separate on/off toggle and sound choice

## v2026.9.0-juice+3.0

A major release aligned with tracking upstream Misskey 2026.9.0. Main additions:

- [Reaction enhancements](./reaction-enhancements.md) (piggybacking on reactions, resolving remote custom emoji reactions, a reaction search tab, and more)
- [Post language](./post-language.md)
- [Note search enhancements](./note-search-enhancements.md)
- [Contact form](./contact-form.md)
- Added batch requests, replacement requests, and edit-on-approval to emoji and avatar decoration requests
- The number of users shown in [user ranking](./user-ranking.md) is now configurable from the JUICE settings (default 3)
- Expanded moderation/admin notifications (new emoji requests, contact form submissions, etc. now show in real time in the control panel)
- Localized system emails
- Various security enhancements (broader captcha coverage, notifying users of failed logins, exclusive locking during review, etc.)
- Added a "Favorites" column to the Deck UI
- Added a boot log display and a customizable splash text setting to the loading screen
- The job queue widget's notification sound can now be changed to a sound of your choice

## v2026.7.0-juice+2.5

- Approval/rejection of [emoji requests](./emoji-request.md), avatar decoration requests, and [approval-based signup](./approval-signup.md) can now be delegated per-role to users without moderator permissions

## v2026.7.0-juice+2.4

- Added an "Avatar Decoration Request" page, letting regular users request avatar decorations (using the same mechanism as [emoji requests](./emoji-request.md))
- Fixed JUICE-specific items in the admin panel not showing their badge

## v2026.7.0-juice+2.3

- When a Webhook's destination is a Discord Webhook URL, it's now automatically detected and formatted as a Discord embed

## v2026.7.0-juice+2.2

- Public releases now track the `juice/main` branch starting with this release
- Fixed pgroonga search failing on words containing symbols such as `OR` or `-`
- (Contributed by chan-mai) Fixed file corruption on emoji request approval, timing of the pending-approval check at sign-in, and more

## v2026.7.0-juice+2.1

- Added a contributors section to the in-app [About JUICE page](./about-page.md)

## v2026.7.0-juice+2.0

A major release that added a bundle of JUICE-specific features at once. Main additions:

- [Approval-based signup](./approval-signup.md)
- [AI-generated content flag](./ai-generated-flag.md)
- [Emoji requests](./emoji-request.md)
- [User ranking](./user-ranking.md)
- [Relay timeline](./relay-timeline.md)
- [Widget position setting](./widget-position.md)
- [Announcement polls](./announcement-poll.md)
- [LaTeX (math) rendering](./latex.md)
- Personal nicknames for other users
- Notifying the account owner on failed login attempts
- A new in-app [About JUICE page](./about-page.md)

## v2026.7.0-juice+1.0

The first release, based on Misskey 2026.7.0. Ported from misskey-art:

- Sensitive image display fix (fixed upstream in Misskey 2026.9.0, so this is no longer a JUICE-specific feature)
- [Announcement reactions](./announcement-reaction.md)
- A guard against accidental deletion of the development database
