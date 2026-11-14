# DramaR² — Rebuttal Demos

Complete static website handoff, prepared on 15 November 2026.

## Start here

`index.html` is the entry point. This is plain HTML, CSS, and JavaScript: no build step, package installation, API keys, or backend is required. All media needed by the page is included using relative paths.

Extract the ZIP and open `index.html` locally. For browser-based development, serve this directory with a static HTTP server. A media-aware server with byte-range support is recommended for video seeking.

## Current page

1. **Method comparison** (`#comparison`): Three Sunsets only, with five methods.
2. **RSI across rounds** (`#rsi`): A Call from Tomorrow, two episodes at Baseline and Rounds 6, 9, and 12.
3. **Complete production and RSI workflow** (`#workflow`): The First Drop from the original project page, with story beats, multi-view assets, spatial layout, a shot plan, local repair comparison, editing, the full episode, and the expanded outer-loop walkthrough.
4. **Consistency across random seeds** (`#variability`): Three 25-second generations from the same field-work production request, with shared images and voice references.

The webpage is English-only. Workflow content is already expanded. Section navigation uses buttons; no visible external links or download links have been added.

## Files to edit

- `index.html`: page text, workflow, seed comparison, and embedded players.
- `style.css`: layout and styling.
- `app.js`: method selection, episode/round selection, and synchronized playback.
- `media.js`: media catalog loaded by the page.
- `media.json`: readable copy of the same catalog. Keep it synchronized with `media.js`.
- `videos/`: full comparison, RSI, and First Drop videos.
- `assets/`: poster images and favicon.
- `evidence/first-drop/`: First Drop reference assets, frames, and repair videos.
- `evidence/production-seeds/`: three generated videos, image and voice references, English prompt, and generation settings.
- `ASSET_MANIFEST.json`: byte counts and SHA-256 hashes for every included website asset.

If you rename a media file or move it to another host, update its references in both the media catalogs and `index.html` as applicable. No video or audio was re-encoded for this handoff.

## GitHub handoff

The extracted folder is the website root. Keep `index.html`, `app.js`, `style.css`, `media.js`, and the media directories at the same relative locations. Use this folder as the static publish directory. `.nojekyll` is included for static hosting.

The complete package includes 19 video files and is approximately 783 MB before ZIP overhead. The largest video is approximately 88 MB. The receiving AI can choose a repository upload and media-hosting approach appropriate to the current GitHub limits; changing hosting must preserve the existing file references or update them consistently.

This handoff does not create a repository or publish the website. Unused older demos, internal source mappings, local execution records, credentials, and macOS metadata are excluded.
