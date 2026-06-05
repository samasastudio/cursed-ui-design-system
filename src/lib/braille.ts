export const BRAILLE_BLANK = "\u2800";
export const BRAILLE_BASE = 0x2800;

export const BRAILLE_DOTS = {
  dot1: 1 << 0,
  dot2: 1 << 1,
  dot3: 1 << 2,
  dot4: 1 << 3,
  dot5: 1 << 4,
  dot6: 1 << 5,
  dot7: 1 << 6,
  dot8: 1 << 7,
} as const;

const DOT_BY_CELL_POSITION = [
  [BRAILLE_DOTS.dot1, BRAILLE_DOTS.dot4],
  [BRAILLE_DOTS.dot2, BRAILLE_DOTS.dot5],
  [BRAILLE_DOTS.dot3, BRAILLE_DOTS.dot6],
  [BRAILLE_DOTS.dot7, BRAILLE_DOTS.dot8],
] as const;

export function bitsToBraille(bits: number): string {
  return String.fromCharCode(BRAILLE_BASE + (bits & 0xff));
}

export function matrixToBraille(
  matrix: readonly (readonly number[])[],
  threshold = 0.5
): string {
  if (matrix.length === 0) return "";

  const sourceRows = matrix.length;
  const sourceCols = Math.max(0, ...matrix.map((row) => row.length));
  const brailleRows = Math.ceil(sourceRows / 4);
  const brailleCols = Math.ceil(sourceCols / 2);
  const lines: string[] = [];

  for (let cellY = 0; cellY < brailleRows; cellY += 1) {
    let line = "";

    for (let cellX = 0; cellX < brailleCols; cellX += 1) {
      let bits = 0;

      for (let dotY = 0; dotY < 4; dotY += 1) {
        for (let dotX = 0; dotX < 2; dotX += 1) {
          const y = cellY * 4 + dotY;
          const x = cellX * 2 + dotX;
          const value = matrix[y]?.[x] ?? 0;

          if (value >= threshold) {
            bits |= DOT_BY_CELL_POSITION[dotY][dotX];
          }
        }
      }

      line += bitsToBraille(bits);
    }

    lines.push(line);
  }

  return lines.join("\n");
}

export function imageDataToBraille(
  imageData: ImageData,
  options: { width?: number; threshold?: number; invert?: boolean } = {}
): string {
  const { data, width: sourceWidth, height: sourceHeight } = imageData;
  if (sourceWidth <= 0 || sourceHeight <= 0) return "";

  const threshold = options.threshold ?? 0.5;
  const targetCols = Math.max(1, Math.floor(options.width ?? sourceWidth / 2));
  const targetRows = Math.max(
    1,
    Math.ceil((sourceHeight / sourceWidth) * targetCols * 0.5)
  );
  const lines: string[] = [];

  for (let cellY = 0; cellY < targetRows; cellY += 1) {
    let line = "";

    for (let cellX = 0; cellX < targetCols; cellX += 1) {
      let bits = 0;

      for (let dotY = 0; dotY < 4; dotY += 1) {
        for (let dotX = 0; dotX < 2; dotX += 1) {
          const x0 = Math.floor(
            sourceWidth * ((cellX * 2 + dotX) / (targetCols * 2))
          );
          const x1 = Math.max(
            x0 + 1,
            Math.ceil(sourceWidth * ((cellX * 2 + dotX + 1) / (targetCols * 2)))
          );
          const y0 = Math.floor(
            sourceHeight * ((cellY * 4 + dotY) / (targetRows * 4))
          );
          const y1 = Math.max(
            y0 + 1,
            Math.ceil(
              sourceHeight * ((cellY * 4 + dotY + 1) / (targetRows * 4))
            )
          );

          let luminanceTotal = 0;
          let samples = 0;

          for (let y = y0; y < Math.min(y1, sourceHeight); y += 1) {
            for (let x = x0; x < Math.min(x1, sourceWidth); x += 1) {
              const index = (y * sourceWidth + x) * 4;
              const alpha = data[index + 3] / 255;
              const r = data[index] * alpha + 255 * (1 - alpha);
              const g = data[index + 1] * alpha + 255 * (1 - alpha);
              const b = data[index + 2] * alpha + 255 * (1 - alpha);

              luminanceTotal += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
              samples += 1;
            }
          }

          const luminance = samples === 0 ? 1 : luminanceTotal / samples;
          const signal = options.invert ? luminance : 1 - luminance;

          if (signal >= threshold) {
            bits |= DOT_BY_CELL_POSITION[dotY][dotX];
          }
        }
      }

      line += bitsToBraille(bits);
    }

    lines.push(line);
  }

  return lines.join("\n");
}

function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.73 + t * 1.7) +
    Math.sin(y * 0.91 - t * 1.1) +
    Math.sin((x + y) * 0.31 + t * 0.8) +
    Math.sin(Math.hypot(x - 18, y - 7) * 0.42 - t * 1.4)
  );
}

export function generateBrailleField(
  cols: number,
  rows: number,
  t: number
): string {
  const safeCols = Math.max(1, Math.floor(cols));
  const safeRows = Math.max(1, Math.floor(rows));
  const lines: string[] = [];

  for (let y = 0; y < safeRows; y += 1) {
    let line = "";

    for (let x = 0; x < safeCols; x += 1) {
      let bits = 0;

      for (let dotY = 0; dotY < 4; dotY += 1) {
        for (let dotX = 0; dotX < 2; dotX += 1) {
          const px = x * 2 + dotX;
          const py = y * 4 + dotY;
          const value = noise(px, py, t);

          if (value > 0.82 || Math.abs(value) < 0.08) {
            bits |= DOT_BY_CELL_POSITION[dotY][dotX];
          }
        }
      }

      line += bitsToBraille(bits);
    }

    lines.push(line);
  }

  return lines.join("\n");
}
