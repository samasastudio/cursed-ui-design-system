# `/public/scenes/` — Demo clips for `CursedScene`

This directory is the home for the short, looping video clips used by the
`CursedScene` Storybook stories. No real clips are committed yet — it's up to
you (or whoever is styling this release) to curate them.

> **For production hosting, multi-codec delivery, CDN headers, signed URLs,
> and troubleshooting**, see the Storybook docs page **Cursed UI → Video
> Sources** (`src/stories/cursed/VideoSources.mdx`). This README covers
> only the local-dev placeholder workflow.

The Storybook stories in `src/stories/cursed/Scene.stories.tsx` currently
point at a stable MDN CC0 placeholder (`flower.mp4`). Replace the `DEMO_SRC`
and `DEMO_POSTER` constants in that file with `/scenes/<name>.mp4` +
`/scenes/<name>.jpg` once you've dropped real assets here. Vite + Storybook
serve `public/` from the site root, so `/scenes/sakura.mp4` resolves to
`public/scenes/sakura.mp4`.

## Expected files

Suggested initial set (names are referenced only by story constants you can
rename at will — nothing in `CursedScene` itself expects specific filenames):

| File         | Intent                         | Aspect |
| ------------ | ------------------------------ | ------ |
| `sakura.mp4` | Cherry blossoms / petals fall  | 16/9   |
| `sakura.jpg` | First-frame poster             | 16/9   |
| `waves.mp4`  | Ocean / shoreline loop         | 16/9   |
| `waves.jpg`  | First-frame poster             | 16/9   |
| `clouds.mp4` | Sky / cloud movement timelapse | 16/9   |
| `clouds.jpg` | First-frame poster             | 16/9   |

## Clip spec

Target each clip at:

- **Container**: MP4 (H.264 `high` profile, AAC audio stripped).
- **Resolution**: 1280×720 (or native if lower).
- **Duration**: 2–4 seconds. Must loop cleanly (first frame ≈ last frame).
- **Bitrate**: ~1.2–1.8 Mbps. Keep each file **under 500 KB** if at all
  possible; the whole point of `CursedScene` is to be ambient decoration, not
  a media player.
- **Audio**: none. `CursedScene` forces `muted` and there is no audio API
  surface — shipping silent tracks just wastes bytes.
- **Poster**: JPEG (or WebP if you prefer), same aspect as the clip, ~80–120 KB
  max. This is what renders when `prefers-reduced-motion` is active and during
  the load gap, so it should be a frame you're happy to look at statically.

Example ffmpeg recipe (adjust input path / duration):

```bash
ffmpeg -i source.mp4 \
  -t 3 \
  -an \
  -vf "scale=1280:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -movflags +faststart \
  -b:v 1500k -maxrate 1800k -bufsize 3000k \
  sakura.mp4

ffmpeg -i sakura.mp4 -frames:v 1 -q:v 3 sakura.jpg
```

## Sourcing

Use **CC0** or equivalent public-domain footage only — this repo is intended
to ship as a design system someday, so we cannot carry studio anime frames.

Good starting points:

- [Pexels Videos](https://www.pexels.com/videos/) — Pexels license, free for
  commercial use, no attribution required. Search e.g. _sakura_, _wave loop_,
  _clouds timelapse_.
- [Pixabay Videos](https://pixabay.com/videos/) — Pixabay license, similar
  terms.
- [Coverr](https://coverr.co/) — CC0 stock loops curated for web backgrounds.

Keep a note of the source URL for each file you commit, either in this README
or in a sibling `SOURCES.md`, so future contributors know where assets came
from.
