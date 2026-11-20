// gta6-clipper-01 entry program.
//
// The whole entry is one fact: the address of the YouTube clip, kept in
// VIDEO.json beside this file. My job is to check that the address is
// shaped like one of the YouTube addresses the bounty accepts and that
// it carries a genuine YouTube video id, then hand the file on to the
// grader by copying it, byte for byte, into the output directory.
// Nothing is printed when all is well.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const videoFile = join(here, "VIDEO.json");

// A YouTube video id is exactly 11 characters drawn from letters,
// digits, hyphen and underscore. Anything shorter, longer or holding
// other characters is not an id, however plausible the address looks.
const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;

// The three address shapes the bounty takes. Each extractor gets the
// full address and either pulls the video id out of it or answers null
// when the address is not that shape at all.
const addressShapes = [
  {
    name: "a Shorts address",
    extract(url) {
      const head = "https://www.youtube.com/shorts/";
      if (!url.startsWith(head)) return null;
      return url.slice(head.length).split(/[/?&#]/, 1)[0];
    },
  },
  {
    name: "a watch address",
    extract(url) {
      const head = "https://www.youtube.com/watch?";
      if (!url.startsWith(head)) return null;
      const query = url.slice(head.length).split("#", 1)[0];
      for (const part of query.split("&")) {
        if (part.startsWith("v=")) return part.slice(2);
      }
      return null;
    },
  },
  {
    name: "a youtu.be address",
    extract(url) {
      const head = "https://youtu.be/";
      if (!url.startsWith(head)) return null;
      return url.slice(head.length).split(/[/?&#]/, 1)[0];
    },
  },
];

function refuse(message) {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// Read and parse. A file that is not JSON, or JSON of the wrong shape,
// is refused rather than handed on.
const raw = readFileSync(videoFile);
let parsed;
try {
  parsed = JSON.parse(raw.toString("utf8"));
} catch {
  refuse("VIDEO.json is not valid JSON");
}
if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
  refuse("VIDEO.json must hold a JSON object");
}
const url = parsed.url;
if (typeof url !== "string" || url.length === 0) {
  refuse('VIDEO.json must carry a non-empty string "url"');
}

// Match the address against the accepted shapes, then hold the id it
// carries to the real id format: an address in the right shape but
// with a mangled id is refused just the same.
let videoId = null;
for (const shape of addressShapes) {
  const found = shape.extract(url);
  if (found !== null) {
    videoId = found;
    break;
  }
}
if (videoId === null) {
  refuse(
    "VIDEO.json url is none of the accepted shapes: " +
      "youtube.com/shorts/<id>, youtube.com/watch?v=<id>, youtu.be/<id>",
  );
}
if (!videoIdPattern.test(videoId)) {
  refuse(
    `VIDEO.json url carries "${videoId}", which is not a YouTube video id: ` +
      "an id is exactly 11 characters of A-Z, a-z, 0-9, - or _",
  );
}

// Hand the file on exactly as it stands, so the grader reads the same
// bytes this repository holds.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), raw);
