import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Bold (700) is used for the "R" glyph icons; ExtraBold (800) matches the
// site's nav wordmark/headlines and is used for the "Reamo" share-card mark.
GlobalFonts.registerFromPath(join(root, "assets/fonts/Montserrat-Bold.ttf"), "Montserrat");
GlobalFonts.registerFromPath(
  join(root, "assets/fonts/Montserrat-ExtraBold.ttf"),
  "Montserrat ExtraBold"
);

const WHITE = "#ffffff";
const BLACK = "#111111";

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

  const wordmarkSize = 150;
  ctx.font = `800 ${wordmarkSize}px "Montserrat ExtraBold"`;
  ctx.letterSpacing = "0px";
  const wordmarkCap = ctx.measureText("Reamo").actualBoundingBoxAscent;
  const baselineY = (height + wordmarkCap) / 2;

  ctx.fillStyle = BLACK;
  ctx.fillText("Reamo", width / 2, baselineY);

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
