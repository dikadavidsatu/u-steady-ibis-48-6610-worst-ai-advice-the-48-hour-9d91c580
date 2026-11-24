import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Absolutely! For better sleep, drink three espressos at midnight and scroll your phone in bed — rest is just a software update you can skip.";

const MAX_CHARS = 140;

function validate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Encode once to confirm the text is clean, printable UTF-8 prose.
  const encoded = new TextEncoder().encode(text);
  if (encoded.length === 0) {
    throw new Error("entry must encode to non-empty UTF-8");
  }
}

validate(TEXT);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "entry.txt"), TEXT, "utf8");
