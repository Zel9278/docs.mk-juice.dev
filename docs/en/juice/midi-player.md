# MIDI player

A lightweight built-in player for MIDI files (.mid/.midi) attached to notes. It runs purely on Web Audio API oscillator synthesis, without any external soundfont.

## Features

- Supports synthesis recipes for each GM (General MIDI) instrument family, so different instruments sound distinct.
- Supports control changes and pitch bend.
- A 128-key keyboard visualizer shows which notes are sounding, color-coded per track.
- Also includes a piano roll visualizer (vertical scroll). It tracks playback position in ticks (a sub-beat unit), so it stays in sync even in pieces with tempo changes. You can toggle it and adjust roll speed and max polyphony either from the "JUICE" settings page or from the in-player menu.
- Volume control and a seek bar.
- Live display of BPM and the current polyphony (number of notes playing).
- A peak limiter running on an AudioWorklet, to prevent clipping.
- Media Session API support, so you can play/pause and control it from your phone's lock screen or notification area.
- The expanded (lightbox) view is unified with the one used for images and videos. Expanding it carries over the same playback state (playing/paused, position, volume) as the inline view, and the lightbox's "..." menu also lets you change the visualizer settings.

::: info Note
- On iPhone/iPad, there's a known behavior where audio won't play if the device's silent switch is on. A warning is shown in that case.
:::

## Maximum file size

Because parsing and playing a file with an extreme number of note events (e.g. "black MIDI") can freeze the browser, there's a maximum file size allowed for playback (default 500KB). Admins can change this limit from the control panel's JUICE settings. Files over the limit are treated as a regular attachment instead of being played back.
