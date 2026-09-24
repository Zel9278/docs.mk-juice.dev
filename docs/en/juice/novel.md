# Novel flag & novel viewer

This feature lets you mark a post as a "novel" and read it in a dedicated novel viewer. The viewer supports a vertical, paperback-style layout, [Aozora Bunko](https://www.aozora.gr.jp/) notation such as ruby text and emphasis dots, and pixiv novel notation.

## Posting as a novel

### Adding the novel flag

- **In the post form**: turn on the book icon in the bottom toolbar (next to the AI-generated content button).
- **After posting**: from your note's "..." menu, choose "Mark as novel" / "Unmark as novel" to toggle it later.
- **.txt files in Drive**: from the file's menu in Drive, choose "Mark as novel". Attaching a flagged file to a post automatically marks the post as a novel too (you can still turn it off manually).

Posts with the novel flag:

- Show a book badge next to the author's name on timelines and the note detail page. Clicking it opens the novel viewer.
- Can also be opened in the novel viewer from "Read as novel" in the "..." menu.
- Appear in the [Media timeline](./media-timeline.md) even without attachments.
- Can be filtered with "Show novels only" in the menu of the regular timelines (Home, Local, Social, Global).

### Where to put the text

- **Short works**: write them directly in the note body.
- **Long works**: attach the text as a .txt file. This lets you publish works longer than the note character limit.
  - UTF-8, Shift_JIS, and EUC-JP are all supported (detected automatically).
  - If a .txt file is attached, its contents are shown as the novel instead of the note body.
  - If several .txt files are attached, the one marked as a novel in Drive takes priority.

## Writing syntax

The novel viewer shows the text **exactly as written**. MFM (links, mentions, hashtags, custom emoji, `$[…]` functions, `<center>`, etc.) is not interpreted and appears as plain text. Only the following notations, commonly used in novels, are applied.

### Chapters and page breaks

| Syntax | Meaning |
| --- | --- |
| `---` (on its own line, three or more hyphens) | Chapter break. Each chapter is listed in the table of contents, and in horizontal mode "Previous chapter", "Contents", and "Next chapter" appear at each chapter |
| `[newpage]` (on its own line) | Page break (same as pixiv novels). In horizontal mode, one page is shown at a time with "Previous page" / "Next page"; in vertical mode, a new page always starts here |
| `[chapter:Title]` | Chapter title. Shown as a title in the text and used as the name in the table of contents (chapters without one are shown as "Chapter N") |

```text
[chapter:One: The Beginning]
Text...

---

[chapter:Two: Continued]
Text...

[newpage]

[chapter:Three: A chapter on the next page]
Text...
```

::: tip
If you also add `[chapter:…]` to the first chapter, the table of contents shows its name instead of "Chapter 1".
:::

### Ruby (reading aids)

| Syntax | Example |
| --- | --- |
| `｜base《reading》` (Aozora Bunko) | `｜潮待ち便《しおまちびん》` |
| `kanji《reading》` (omitting ｜) | `潮見島《しおみじま》` |
| `＊base《reading》`, `*base《reading》`, `\|base《reading》` | `＊御立会《おたちあい》` |
| `[[rb:base > reading]]` (pixiv) | `[[rb:灯台守 > とうだいもり]]` |
| `$[ruby base reading]` (MFM) | `$[ruby 真鍮 しんちゅう]` |

::: warning
If you omit the `｜` marker, the ruby applies **only to the run of kanji immediately before** 《》 (an Aozora Bunko rule). For example, in `潮待ち便《しおまちびん》` the kanji run is broken by "ち", so only "便" gets the ruby. When adding ruby to a word that includes non-kanji characters, always mark where it starts, as in `｜潮待ち便《しおまちびん》`.
:::

### Emphasis dots (Aozora Bunko)

| Syntax | Example |
| --- | --- |
| `［＃「target」に傍点］` | `潮待ち便［＃「潮待ち便」に傍点］` |
| `［＃傍点］…［＃傍点終わり］` | `［＃傍点］ここだけ［＃傍点終わり］` |

- The official Aozora Bunko style places the target text **immediately before** the annotation (placing it right after also works).
- Besides `傍点` (filled sesame), `白ゴマ傍点` (open sesame), `丸傍点` (filled circle), and `白丸傍点` (open circle) are also available.
- The dots appear to the right of the text in vertical mode and above it in horizontal mode.

### Indentation (Aozora Bunko)

```text
［＃ここから2字下げ］
Lines to indent
Lines to indent
［＃ここで字下げ終わり］
```

The given number of full-width spaces is added to the start of each line in the block.

### Text decoration

| Syntax | Result |
| --- | --- |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `~~strikethrough~~` | ~~strikethrough~~ |

- These can be nested (e.g. `**bold with ~~strikethrough~~ inside**`), and ruby can be used inside them.
- They only apply **when opened and closed on the same line**. If they span a line break, the symbols are shown as-is.
- If the symbol is immediately followed (or preceded) by a space, as in `* note`, it is treated as a plain symbol rather than decoration.

### Other pixiv novel notations

| Syntax | Result |
| --- | --- |
| `[[jumpuri:Label > URL]]` | Only the label text (no link is created) |
| `[jump:N]` | Not shown |
| `[pixivimage:…]` | Not shown |

### Aozora Bunko-format text

- The legend block at the top ("【テキスト中に現れる記号について】", enclosed by ruled lines) is removed automatically.
- Any other `［＃…］` annotations not listed here (unsupported ones) are removed from the display entirely.

If the reader has turned off "Interpret Aozora Bunko notation" in the display settings, 《》 ruby, emphasis dots, and indentation annotations are not interpreted and appear as plain text (it is on by default).

### Automatic paragraph indent

When the reader's "Paragraph indent" display setting is on (the default), lines that don't start with a space get one full-width space of indentation automatically. Lines starting with the following are not indented:

- Lines that already start with a space (full-width or half-width)
- Opening brackets: `「 『 （ ( 〔 ［ [ ｛ { 〈 《 【 〘 〖 ｢ “ ‘`
- Symbols: `・ ･ ― — ﹅ ﹆ ● ○ ◎ ◯ ◆ ◇ ■ □ ★ ☆ ※ 、 。 ，`

This keeps dialogue lines (「」) and scene-break symbols (◆, ＊, ●○, etc.) from being indented unintentionally. Lines starting with the ruby notation `[[rb:…]]` are indented like normal text lines.

### How vertical writing is displayed

- Latin letters and digits are set upright, one character at a time.
- Characters such as `…` `‥` `―` `—` and half-width `( ) [ ] { } < > - ~ =` are rotated 90 degrees for vertical writing.
- If ruby would fall across a page boundary, the page is broken just before it so the ruby isn't cut off (so page widths may vary slightly).

### Checklist before posting

- You added the novel flag (or attached a .txt file with the novel flag)
- Ruby on words containing non-kanji characters is marked with `｜`
- If you want chapter names in the table of contents, the first chapter also has `[chapter:…]`
- Decorations such as bold are opened and closed on the same line
- Long works are attached as a .txt file

## Reading in the novel viewer

- **Horizontal / vertical writing**: you can switch between them. Vertical mode turns pages from right to left like a paperback, and shows a two-page spread on wide enough screens.
- **Turning pages** (vertical mode): in addition to the buttons below the page, you can swipe (swiping right goes to the next page) or use the keyboard's ← (next page) / → (previous page).
- **Read in full screen**: shows only the text across the whole screen. You can still open the table of contents and display settings, and switch writing direction, while in full screen.
- **Display settings**: change font size, typeface (default, Mincho/serif, Gothic/sans-serif), background (auto, white, sepia, black, custom), paragraph indent, and Aozora Bunko notation. Settings are saved per device.
- **Bookmarks**: remembers the page you were reading in vertical mode and resumes from there next time (per device, up to the 50 most recent works).
- **Character count and estimated reading time**: shown below the author's name. Spaces, line breaks, and ruby readings are not counted, and the time is based on about 500 characters per minute.
- When you resize the window, pages are re-laid out while keeping your reading position.

## How it looks on other servers

The novel flag is sent to other servers as a Juice Server-specific ActivityPub property. Between JUICE servers it federates as a novel; servers that don't support it simply ignore it.

- If the admin has enabled "Novel post CW fallback" (Control panel → JUICE settings; disabled by default), non-JUICE servers show the post with a CW that says "novel". It works the same way as the CW fallback for the [AI-generated content flag](./ai-generated-flag.md); if a post qualifies for both, the AI-generated one takes priority.
- On non-JUICE servers the text is shown as a regular note, so notations such as `［＃…］` and `[newpage]` appear as plain text.
