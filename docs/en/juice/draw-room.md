# Drawing chat

A feature that lets you create a room where multiple people draw on the same canvas together. Open it from the navigation menu or the "Games" page (`/draw`).

## Creating a room

From "Create a room", the room owner chooses:

- **Room name**
- **Visibility**: "Followers only" or "All local users"
- **Maximum number of people who can draw**: 2 to 512, and can be changed later. People beyond the limit can still enter the room as spectators
- **Canvas size**: one of the presets — Landscape (1600×900), Portrait (900×1600), Square (1200×1200), Large square (2048×2048), Extra large square (3840×3840) — or a custom width and height between 100 and 3840. It can be changed later, in which case the canvas expands or crops from the top-left corner. Strokes that fall outside after shrinking are not deleted, so they reappear if you enlarge it again
- **Keep on the server after ending**: if turned off, the drawing and chat are deleted one hour after the room ends

Depending on your role, you may not be able to create rooms. Even then, you can still join other people's rooms.

## Joining and spectating

- Open rooms are listed on the drawing chat page. When you enter a room, you first open it as a spectator.
- Press "Join to draw" to start drawing. If the room is full, you can only spectate.
- Spectators can also write in the chat (up to 500 characters per message). Emoji and custom emoji can be used, and each message shows its time.
- People who have the room open (online) are shown in a list. People who close the room or switch to another tab become offline.
- The room owner can "Remove from drawers" anyone who is drawing (they remain as a spectator).
- The room owner can also leave the drawers and spectate with "Switch to spectator mode". They remain the room owner, so they can rejoin as a drawer even when the room is full.

## Drawing

- **Pen**: supports pen pressure from pen tablets and similar devices. You can choose the "Normal brush", "Soft (watercolor) brush", or "Pixel (crisp)" brush.
- **Eraser**: its size can be set separately from the pen.
- **Lasso fill**: fills the area you enclose.
- **Fill (bucket)**: fills the area enclosed by lines around the point you click.
- **Paint inside lines**: lets you paint only inside the lines that enclose the point where you start drawing.
- **Eyedropper**: picks a color from the canvas. You can also press `I`, or click while holding Alt.
- **Color, size, and opacity**: the maximum size depends on the canvas size.
- **Undo**: `Ctrl+Z` also works.
- **Clear my layer**: erases all of your own strokes.

### Selecting and moving

- **Rectangle select / Lasso select**: selects your own strokes. Strokes are cut at the edge of the selected area, so you can select just part of a stroke. Hold Shift while selecting to add to the selection.
- **Move**: moves the selected strokes, or your entire layer if nothing is selected.
- Selected strokes can be rotated left or right, or deleted (`Delete` / `Backspace`). Press `Esc` to clear the selection.

Strokes are separated into a layer per person, so you can never erase someone else's strokes. You can show or hide each layer, and toggle showing your own layer on top. The room owner can also erase another person's layer with "Clear this layer". There is a limit to how much each person can draw on their layer; operations beyond it are rejected by the server and undone.

Other people's cursors are shown as circles with their avatars.

## Navigating the canvas

- **Zoom**: mouse wheel, the zoom in/out buttons, `Ctrl+＋` / `Ctrl+－`, or pinch with two fingers on touch devices. You can zoom in up to 3200%. If you turn off "Zoom with the mouse wheel", the wheel pans the view instead and zooming becomes `Ctrl`+wheel (this setting is saved in your browser)
- **Pan**: `Shift`+wheel, drag with the middle mouse button, drag while holding the space bar, the Hand tool (`H`), or slide with two fingers on touch devices. The Hand tool moves only the view, not your strokes
- **Rotate**: rotate the canvas with the rotate left/right buttons, or with two fingers on smartphones and similar devices. "Reset rotation" returns it to normal
- **Pixelated Zoom**: shows pixels as-is without smoothing when zoomed in (also applied to the overview map). At 800% or more in this mode, a pixel grid is also shown
- **Overview map**: shows which part of the whole canvas you're viewing. It can be shown or hidden
- **Fit to screen**: returns to a zoom level where the whole canvas fits (`Ctrl+0`)

On smartphones and narrow windows (including the deck), the canvas takes up more space and the layers and chat appear in panels that slide up from the bottom. Buttons show their names, and the buttons in the page header are grouped into a named menu.

## Saving and posting as an image

Whether the room is still open or has ended, you can turn the whole canvas, or an area you select by dragging, into an image:

- Save image to Drive
- Post image as a note
- Download image

You can choose PNG (uncompressed), WebP (the same compression Misskey uses on upload), or JPEG.

## Ending a room

- The room owner can end the room with "End the drawing chat". Once ended, no one can draw anymore.
- Rooms with "Keep on the server after ending" turned on remain view-only after ending and can be found under "Saved drawings". Rooms with it turned off are deleted one hour after ending, so save or post an image before then if you want to keep it.
- Open rooms where nothing has been drawn or said for 24 hours are ended automatically.

## Reporting and moderation

- You can [report](./abuse-report.md) the room itself (its owner) with "Report room" in the room menu, and a chat message (its sender) from the message. The content at the time of the report is preserved and shown in the reports in the control panel.
- Moderators can delete problematic rooms, even while they are open. Deletions are recorded in the moderation log. While a moderator is inspecting a room, this is not shown to the people in it.

## Settings for admins

- In the JUICE settings of the control panel, you can enable or disable drawing chat as a whole (enabled by default). When disabled, no one can create or enter rooms, and it disappears from the menu.
- Role policies let you configure the following per role:
  - **Create drawing chat rooms**: even when turned off, users can still spectate and join other people's rooms (on by default)
  - **Maximum drawing chat canvas size**: the maximum for each of width and height (100–3840, default 3840). Applied when creating a room and when changing its size later
