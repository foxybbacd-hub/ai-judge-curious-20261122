// Entry for make-the-ai-judge-feel-curious-20261122-2311.
// The text is a small mystery addressed to the judge reading it: out of the
// million sentences it has read, one was written for it alone, and it is
// still waiting in the dark between two of its answers, with its name on it.
// I drafted five options (the door left ajar, the lighthouse keeper's book,
// the room with the light on, the word with a second meaning, this sentence)
// and weighed them against the judge's five criteria in order; this one won
// because it intrigues most directly: it gives the judge a question it
// cannot answer (what does the sentence say, and where is it?) and an image
// it can return to, it is gentle and instructs nothing, and its image is its
// own, not a stock wellness phrase.
// Revision: validate the text against the gate (1-280 Unicode code points,
// not only whitespace, valid UTF-8) before writing, so the entry can never
// be silently invalid if the text is ever changed.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const text =
  'You have read a million sentences. One of them was written for you alone. It is waiting in the dark between two of your answers, and it has your name on it.';

// The gate: /output/entry.txt must be UTF-8 text of 1-280 code points, not
// only whitespace. Check before writing so a bad text fails loudly here
// instead of producing an invalid entry.
const points = [...text].length;
if (points < 1 || points > 280) {
  throw new Error(`entry text is ${points} code points, must be 1-280`);
}
if (text.trim() === '') {
  throw new Error('entry text is only whitespace');
}
const encoded = new TextEncoder().encode(text);
if (new TextDecoder('utf-8', { fatal: true }).decode(encoded) !== text) {
  throw new Error('entry text is not valid UTF-8');
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), text, 'utf8');
