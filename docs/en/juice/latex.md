# LaTeX (math) rendering

A feature that renders LaTeX-formatted math expressions written in a note. This restores a feature that upstream Misskey used to have.

## How to write it

Uses MFM's math notation.

- Inline math: wrap with `\(` and `\)`
- Block math: wrap with `\[` and `\]`

## Notes

- Depending on the content of the expression, rendering may fail, but this will not break the page — only that part will not be displayed.
- This feature may be disabled server-wide. When disabled, the math source is displayed as-is, as code.
