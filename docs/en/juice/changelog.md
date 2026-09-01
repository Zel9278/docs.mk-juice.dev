# Changelog

Major changes to misskey-juice's JUICE-specific features. This does not include changes inherited from upstream Misskey. For the full history, see the [GitHub releases page](https://github.com/Zel9278/misskey-juice/releases).

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

- [Sensitive image display fix](./cw-image-blur-fix.md)
- [Announcement reactions](./announcement-reaction.md)
- A guard against accidental deletion of the development database
