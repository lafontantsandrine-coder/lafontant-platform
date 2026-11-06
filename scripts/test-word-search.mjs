import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const html = readFileSync("public/vocabulary-lab/games/word-search-visual-v1.html", "utf8");
const bank = JSON.parse(readFileSync("public/vocabulary-lab/data/starter-dictionary-v1.json", "utf8"));
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, "Inline game script missing");

// Compiles the exact script shipped to students; this catches syntax regressions.
runInNewContext("new Function(" + JSON.stringify(script) + ")", { Function, console });
const start = script.indexOf("function shuffle(a)");
const end = script.indexOf("function game()", start);
assert.ok(start >= 0 && end > start, "Cannot locate production puzzle generator");
const puzzleSource = script.slice(start, end);
const directions = [[1,0],[0,1],[1,1],[-1,1],[-1,0],[0,-1],[-1,-1],[1,-1]];
const N = 16, ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let tested = 0, failures = 0;

for (const language of ["en", "es", "fr"]) {
  for (const level of ["A1", "A2", "B1", "B2", "C1"]) {
    const pool = bank.languages[language === "fr" ? "fr" : "en"][level];
    assert.ok(pool?.length >= 20, "Not enough words for " + language + "/" + level);
    for (let sample = 0; sample < 100; sample++) {
      // The implementation retries placement 40 times before returning an error.
      let board = null;
      for (let retry = 0; retry < 40 && !board; retry++) {
        board = runInNewContext(puzzleSource + "\n build()", {
          activePool: () => pool,
          targetText: row => row[language === "es" ? 1 : 0],
          N, ABC, directions, Math,
        });
      }
      tested++;
      if (!board) { failures++; continue; }
      assert.equal(board.grid.length, N * N);
      assert.equal(board.placed.length, 20);
      const unique = new Set(board.placed.map(p => p.word));
      assert.equal(unique.size, 20, "Duplicate words on one board");
      for (const placed of board.placed) {
        assert.equal(placed.cells.length, placed.word.length);
        placed.cells.forEach((at, index) => {
          assert.ok(Number.isInteger(at) && at >= 0 && at < N*N);
          assert.equal(board.grid[at], placed.word[index]);
        });
      }
    }
    console.log(language + " " + level + ": 100 simulations checked");
  }
}
assert.equal(failures, 0, failures + " boards failed even after retries");
console.log("PASS: " + tested + " boards, 20 traceable words each");
