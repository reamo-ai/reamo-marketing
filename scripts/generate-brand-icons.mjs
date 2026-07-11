import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const fontPath = join(root, "assets/fonts/Montserrat-Bold.ttf");

GlobalFonts.registerFromPath(fontPath, "Montserrat");

const WHITE = "#ffffff";
const BLACK = "#111111";
const TAGLINE = "rgba(17, 17, 17, 0.55)";

const TAGLINE_TEXT = "THE REAL ESTATE AGENT MIDDLE OFFICE™";

/** Matches the nav wordmark: Montserrat bold R centered on white. */
function renderBrandIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = WHITE;
  ctx.fillRect(0, 0, size, size);

  const fontSize = Math.round(size * 0.57);
  ctx.font = `700 ${fontSize}px Montserrat`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const metrics = ctx.measureText("R");
  const capHeight = metrics.actualBoundingBoxAscent;
  // Center the visible cap height, then nudge down slightly for optical balance.
  const opticalNudge = size <= 32 ? fontSize * 0.1 : fontSize * 0.06;
  const baselineY = (size - capHeight) / 2 + capHeight + opticalNudge;

  ctx.fillStyle = BLACK;
  ctx.fillText("R", size / 2, baselineY);

  return canvas.toBuffer("image/png");
}

function renderOpenGraphImage() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = WHITE;
  ctx.fillRect(0, 0, width, height);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const centerX = width / 2;

  const wordmarkSize = 150;
  const taglineSize = 22;
  const gap = 34;

  ctx.font = `700 ${wordmarkSize}px Montserrat`;
  ctx.letterSpacing = "0px";
  const wordmarkCap = ctx.measureText("Reamo").actualBoundingBoxAscent;

  ctx.font = `700 ${taglineSize}px Montserrat`;
  ctx.letterSpacing = "3px";
  const taglineCap = ctx.measureText(TAGLINE_TEXT).actualBoundingBoxAscent;

  const blockHeight = wordmarkCap + gap + taglineCap;
  const blockTop = (height - blockHeight) / 2;
  const wordmarkBaselineY = blockTop + wordmarkCap;
  const taglineBaselineY = wordmarkBaselineY + gap + taglineCap;

  ctx.font = `700 ${wordmarkSize}px Montserrat`;
  ctx.letterSpacing = "0px";
  ctx.fillStyle = BLACK;
  ctx.fillText("Reamo", centerX, wordmarkBaselineY);

  ctx.font = `700 ${taglineSize}px Montserrat`;
  ctx.letterSpacing = "3px";
  ctx.fillStyle = TAGLINE;
  ctx.fillText(TAGLINE_TEXT, centerX, taglineBaselineY);

  return canvas.toBuffer("image/png");
}

writeFileSync(join(root, "app/icon.png"), renderBrandIcon(64));
writeFileSync(join(root, "app/apple-icon.png"), renderBrandIcon(180));
writeFileSync(join(root, "public/icon-192.png"), renderBrandIcon(192));
writeFileSync(join(root, "public/icon-512.png"), renderBrandIcon(512));
writeFileSync(join(root, "app/opengraph-image.png"), renderOpenGraphImage());
writeFileSync(join(root, "app/twitter-image.png"), renderOpenGraphImage());

console.log(
  "Wrote app/icon.png, app/apple-icon.png, public/icon-192.png, public/icon-512.png, app/opengraph-image.png, app/twitter-image.png"
);
