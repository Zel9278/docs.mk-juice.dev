# MIDI player

A lightweight built-in player for MIDI files (.mid/.midi) attached to notes. It runs purely on Web Audio API oscillator synthesis, without any external soundfont.

## Features

- Supports synthesis recipes for each GM (General MIDI) instrument family, so different instruments sound distinct.
- Supports control changes and pitch bend.
- A 128-key keyboard visualizer shows which notes are sounding, color-coded per track.
- Volume control and a seek bar.
- Live display of BPM and the current polyphony (number of notes playing).
- A peak limiter running on an AudioWorklet, to prevent clipping.
- Media Session API support, so you can play/pause and control it from your phone's lock screen or notification area.

## Maximum file size

Because parsing and playing a file with an extreme number of note events (e.g. "black MIDI") can freeze the browser, there's a maximum file size allowed for playback (default 500KB). Admins can change this limit from the control panel's JUICE settings. Files over the limit are treated as a regular attachment instead of being played back.
