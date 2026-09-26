# Novel editor

An editor for writing text for the [novel flag & novel viewer](./novel.md). Open it from the navigation menu (`/novel-editor`). When you're done, you can post the text as a .txt file with the novel flag.

## Works and drafts

- Each work has its own title, text, and target length. Switch between them from "Works", or create a "New work".
- Drafts are **saved automatically in this browser**, and stay in sync with other tabs in the same browser.
- Because drafts are stored in the browser, they are not shared with other devices or browsers. Clearing the browser's data also deletes the drafts, so keep important works on your device as well with "Save as .txt". If a draft can't be saved because the browser's storage is full, a notice appears.

## Writing

Notations in the text (annotations such as ruby and emphasis dots, chapter titles, section breaks, page breaks, bold, etc.) are highlighted in color so they're easy to tell apart. The following can be inserted with buttons:

| Button | What it inserts |
| --- | --- |
| Ruby | Adds ruby to the selected text (inserted as `[[rb:base > reading]]`) |
| Emphasis dots | Adds filled sesame (﹅), open sesame (﹆), filled circle (●), or open circle (○) emphasis dots to the selected text |
| Formatting | Makes the selected text bold, italic, or strikethrough |
| Indent | Indents the selected lines by the number of characters you specify |
| Chapter title | Inserts a title for the chapter starting here (`[chapter:…]`) |
| Section break | Breaks the chapter here (`---`) |
| Page break | Starts a new page here (`[newpage]`) |
| Dash / ellipsis | Inserts `――` or `……` |

For details on what each notation means, see [Novel flag & novel viewer](./novel.md#writing-syntax).

### Display and input settings

- Indent new paragraphs when pressing Enter
- Close brackets automatically
- Keep the current line in the middle of the screen
- Show the preview side by side
- Typeface, font size, and line height

"Focus mode" shows the editor in full screen. "Find and replace" also supports case-sensitive, regular expression, and whole-word searches.

## Table of contents and length

- The table of contents shows the length of each chapter; clicking one jumps to it.
- The character count, the equivalent number of Japanese manuscript pages (400-character sheets, counted as 20 characters per line with a new line for each paragraph), and the length of the selection are shown. Spaces, line breaks, ruby readings, and notations such as annotations are not counted.
- If you set a "Target length", your progress toward it is shown.

## Preview

You can preview the text with the same look as the novel viewer. On wide screens it appears next to the editor; on narrow screens it opens in a separate window. It updates as you write.

## Pre-post check

The "Pre-post check" lists possible issues in a separate window. Clicking an item jumps to that line in the editor. The results update as you write, and you're also notified of any issues when posting (you can still post with "Post anyway"). It mainly points out:

- Ruby problems (no kanji before 《》, a word containing non-kanji without `｜`, or a mistyped ruby notation)
- Unclosed brackets, or closing brackets without a matching opening bracket
- Bold, strikethrough, or emphasis-dot annotations not closed on the same line, and unclosed indentation annotations
- Annotations the novel viewer doesn't support (`［＃改ページ］` isn't supported, so it suggests using `[newpage]` instead)
- `[newpage]` not on a line by itself, empty chapters, and a first chapter without `[chapter:…]`
- A single ellipsis or dash, using "・・・", or no full-width space after ！ or ？

## Opening, saving, and posting

- **Open**: opens a .txt file from your device or Drive as a new work. The text encoding is detected automatically.
- **Save as .txt**: saves the text as a .txt file.
- **Post**: uploads the text to Drive as a .txt file and attaches it to the post form with the novel flag.
