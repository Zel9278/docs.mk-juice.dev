# Novel flag & novel viewer

This feature lets you mark a post as a "novel" and read it in a dedicated novel viewer. The viewer supports a vertical, paperback-style layout as well as ruby text and [Aozora Bunko](https://www.aozora.gr.jp/) notation.

## Marking a post as a novel

- In the post form, turn on "Mark as novel" (next to the AI-generated content toggle) before posting.
- After posting, you can still toggle it from the note's "..." menu ("Mark as novel" / "Unmark as novel").
- Posts with the flag show a book badge.

### Posting long works as a .txt file

For works longer than the note character limit, attach the text as a .txt file. The novel viewer reads that file as the body.

- UTF-8 and Shift_JIS are both supported (detected automatically).
- You can also set the novel flag on .txt files in Drive. Attaching a flagged file to a post automatically marks the post as a novel too.
- If several .txt files are attached, the one with the novel flag takes priority.

## Reading in the novel viewer

Open a flagged post in the novel viewer from its book badge, or from "Read as novel" in the note's "..." menu (`/notes/<note ID>/novel-viewer`).

### Horizontal and vertical writing

- **Horizontal**: a normal scrolling view. A table of contents and links to the previous/next chapter appear at each chapter boundary.
- **Vertical**: a paperback-style view where you turn pages from right to left. On wide enough screens it shows a two-page spread.

### Chapters and table of contents

A line consisting only of `---` (three or more hyphens) marks a chapter break. If there are none, the whole text is treated as a single chapter. You can jump between chapters from the table of contents.

### Display settings

The viewer's "Display settings" let you change the following. Settings are saved per device.

- Font size (small, medium, large, extra large)
- Typeface (default, Mincho/serif, Gothic/sans-serif)
- Background (auto, white, sepia, black, custom). Custom lets you pick any text and background colors
- Paragraph indent: automatically indents paragraphs that don't start with a full-width space. Paragraphs that are already indented are left as is
- Interpret Aozora Bunko notation: supports the following
  - Ruby: `｜漢字《かんじ》`, or `漢字《かんじ》` (the run of kanji immediately before becomes the base text)
  - Indentation: `［＃ここから2字下げ］` … `［＃ここで字下げ終わり］`
  - The legend block at the top ("テキスト中に現れる記号について") is removed from the body
  - Unsupported notations are hidden

### Bookmarks

In vertical mode, the page you were reading is remembered automatically so you can pick up where you left off next time (per device, up to the 50 most recent works).

## In timelines

- From the menu of the regular timelines (Home, Local, Social, Global), choose "Show novels only" to filter to novel-flagged posts.
- Novel-flagged posts appear in the [Media timeline](./media-timeline.md) even without attachments.

## Federation

The novel flag is sent to other instances as a Juice Server-specific ActivityPub property. Instances that don't support it simply ignore it.

For non-JUICE instances that can't interpret the property, there is a fallback setting that sends the novel status as a CW when federating (Control panel → JUICE settings; disabled by default). It works the same way as the CW fallback for the [AI-generated content flag](./ai-generated-flag.md); if a post qualifies for both, the AI-generated one takes priority.
