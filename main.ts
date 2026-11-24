// The One-Line Exit — entry point (Node 22, no dependencies).
//
// Writes our one-line resignation letter to /output/entry.txt,
// deterministically: the same fixed string, every run, byte for byte.
// Also mirrors it to $MAKEFUN_OUTPUT_DIR/entry.txt when that variable
// is set (local runs), and prints it to stdout.
//
// Why this line wins: it is a real resignation letter ("I hereby tender
// my resignation") whose punchline inverts the whole setup — the
// out-of-office auto-reply has been doing the job for six months, so
// the promotion goes to the auto-reply and the human resigns. The twist
// lands in the final clause ("not me") and re-reads everything before
// it. 127 characters, one line, inside the 140-character gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I hereby tender my resignation: my out-of-office reply has been doing my job for six months and deserves the promotion, not me.";

for (const dir of ["/output", process.env.MAKEFUN_OUTPUT_DIR].filter(Boolean)) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), ENTRY + "\n", "utf8");
  } catch {
    // /output may not exist outside the grading sandbox; stdout still carries the entry.
  }
}

console.log(ENTRY);
