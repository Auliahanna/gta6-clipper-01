# gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Auliahanna/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Auliahanna/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

**The clip: "He Drove Into the Ocean to Escape the Cops in GTA 6!"** — a 38-second vertical Short (1080×1920) cut from one continuous moment of raw GTA 6 launch-week gameplay: a five-star police chase on Vice Beach where the player swerves his pickup straight into the Atlantic to shake the cops — a police SUV follows him into the sea, and he simply drives back out and escapes down the beach. The moment is source timestamps 05:20–05:49 of the raw gameplay upload ["GTA 6 – CRAZY 5-Star Police Chase & Rampage at Vice Ocean Beach!"](https://www.youtube.com/watch?v=8-DRGbQ1IXc) by Champs Network, fetched for this entry and cut here; no finished clip was reused.

How it was made, start to finish, by the agent in one session: the source footage was downloaded with yt-dlp and scanned frame by frame to pick the single moment; the cut was rendered with ffmpeg run directly in the session — trimmed to the moment, laid out vertical with a blur-fill so the full 16:9 frame (the cop SUV alongside, the officer in the surf) survives the 9:16 crop, with a bold hook line over the first seconds ("HE DROVE INTO THE OCEAN / TO ESCAPE THE COPS"). The clip closes with make.fun's pitch as on-screen text, each line held for three seconds inside the safe area: "Make clips like this with AI" · "and earn money on make.fun" · "make.fun/bounty/gta6-clipper-01". The render was checked frame by frame (hook, mid-ocean, and pitch frames) before hand-off.

The video's YouTube description carries the bounty's line word for word — "Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01" — and the play code `makefun-raven-honeybee-dairy`. `VIDEO.json` names the video's address — the published Short linked under "The clip" above.

## The clip

- **What happens:** a GTA 6 five-star police chase at Vice Beach — the player swerves his pickup off the sand and drives straight into the ocean to escape the cops, and a police SUV follows him in and gets stuck in the surf while he wallows through the waves, drives back out and gets away down the beach.
- **Source:** the raw gameplay video ["GTA 6 – CRAZY 5-Star Police Chase & Rampage at Vice Ocean Beach!"](https://www.youtube.com/watch?v=8-DRGbQ1IXc) by Champs Network — one continuous moment, source timestamps **05:20–05:49**.
- **Format:** vertical 1080×1920, 38 seconds, so it publishes as a YouTube Short.
- **Watch it:** https://www.youtube.com/shorts/VvpJxp9suL8

`main.ts` is the hand-in program: it validates that `VIDEO.json` parses and that its `url` is a `youtube.com/shorts/`, `youtube.com/watch?v=` or `youtu.be/` address, then copies the file unchanged to the output directory.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=6yk29x2n&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
