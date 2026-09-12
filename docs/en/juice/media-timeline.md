# Media timeline

A dedicated timeline that collects only notes with attached files, shown in a PixelFed-style grid/carousel layout. It's only available if an admin has enabled it from the JUICE feature settings (see [JUICE feature settings](./settings.md)).

## What's included

- Public-visibility notes with one or more attached files are included.
- Posts with multiple attachments are shown as a swipeable carousel. Swipes are recognized by distance and speed, so a light flick is enough, and prev/next buttons appear next to the image when using a mouse. The switch animation is also quick.

## Inline playback

Videos and audio can be played right in the timeline, without opening the lightbox.

- Videos get a dedicated control bar with loop playback, playback speed, picture-in-picture, and expand.
- Audio gets the same visualizer (poster's avatar + waveform) and control bar as the lightbox.
- The volume setting is shared across all inline playback in the lightbox and the media timeline (saved locally on your device, so once you adjust it, it stays the same for every video/audio you open afterward).

## Excluding a post from the timeline

From the "..." menu in the post form, you can turn on "Don't show in media timeline" to exclude that post from the media timeline. Use this for posts you'd rather not have appear there, such as food photos.

This setting only affects the media timeline. It doesn't affect regular timelines (home, local, etc.), the "Files" tab on profiles, search results, or any other file-filtered view.

## Showing or hiding the tab

Whether the media timeline tab appears in the timeline tab bar can be toggled individually per viewer from `/settings/juice`. See [JUICE feature settings](./settings.md) for details.

## Using it in Deck

You can also choose the media timeline from the type selector when adding or editing a "Timeline" column in the Deck UI. The source timeline (home/local/hybrid/global) can be set individually per column.
