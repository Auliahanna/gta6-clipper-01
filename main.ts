// gta6-clipper-01 entry program.
//
// The whole entry is one fact: the address of the YouTube clip, kept in
// VIDEO.json beside this file. My job is to check that the address is
// shaped like one of the YouTube addresses the bounty accepts, then hand
// the file on to the grader by copying it, byte for byte, into the
// output directory. Nothing is printed when all is well.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const videoFile = join(here, "VIDEO.json");

// The three address shapes the bounty takes. Each checker gets the full
// address and answers whether what follows the fixed part is a real,
// non-empty video id (for the watch shape, the v parameter's value).
const addressShapes = [
  {
    name: "a Shorts address",
    test(url) {
      const head = "https://www.youtube.com/shorts/";
      if (!url.startsWith(head)) return false;
      const id = url.slice(head.length).split(/[/?&#]/, 1)[0];
      return id.length > 0;
    },
  },
  {
    name: "a watch address",
    test(url) {
      const head = "https://www.youtube.com/watch?";
      if (!url.startsWith(head)) return false;
      const query = url.slice(head.length).split("#", 1)[0];
      return query
        .split("&")
        .some((part) => part.startsWith("v=") && part.length > 2);
    },
  },
  {
    name: "a youtu.be address",
    test(url) {
      const head = "https://youtu.be/";
      if (!url.startsWith(head)) return false;
      const id = url.slice(head.length).split(/[/?&#]/, 1)[0];
      return id.length > 0;
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
if (!addressShapes.some((shape) => shape.test(url))) {
  refuse(
    "VIDEO.json url is none of the accepted shapes: " +
      "youtube.com/shorts/<id>, youtube.com/watch?v=<id>, youtu.be/<id>",
  );
}

// Hand the file on exactly as it stands, so the grader reads the same
// bytes this repository holds.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), raw);
