# Plan: Build a Chess App from Scratch (React + TypeScript + Vite)

## Context

The user is learning to code and wants to build a chess application in TypeScript/React. They
explicitly chose the **from-scratch, maximum-learning** path over using off-the-shelf libraries:

- **Chess rules:** written by hand (no `chess.js`)◊ — full control, deepest learning.
- **Board UI:** built by hand with CSS (no `react-chessboard`).
- **Game mode:** human (White) vs. a simple computer AI (Black).

The goal is not just a working game but *understanding* how each piece fits together. Because the
user is a learner, we build in **small, testable milestones** — each one produces something visible
and runnable before we add complexity. Per the user's global "Code Education Rule," every file we
write will include teaching-style comments explaining what each block does and why.

The `bubbaChess` folder is currently empty; Node v25.8.1 and npm 11.11.0 are installed and ready.

---

## Understanding the setup command (the thing you originally asked about)

The command `npm create vite@latest my-app -- --template react-ts` means, in plain English:
**"use a tool to generate a starter React project for me."** It doesn't build your app — it lays
down the scaffolding (folders, config files, a hello-world page) so you don't start from an empty
folder. Piece by piece:

| Part | What it means |
|------|---------------|
| `npm create` | A shortcut for `npm init`. It downloads a **scaffolding tool**, runs it once to generate files, then throws the tool away. Nothing is permanently installed at this step. |
| `vite@latest` | The scaffolding tool is called **`create-vite`**. `vite` is the name; `@latest` says "grab the newest version" so npm doesn't reuse a stale cached copy. |
| `my-app` | The **folder name** it creates — everything is generated inside `./my-app/`. (Use `.` instead to scaffold into the folder you're already in.) |
| `--` | A **divider**. Arguments before it belong to `npm`; everything after it is handed through to `create-vite`. Without it, npm would try to swallow `--template` itself. |
| `--template react-ts` | Picks the starter flavor: **React + TypeScript**. (Other flavors: `react`, `vue`, `svelte`, `vanilla-ts`, …) |

**What Vite is:** the build tool and dev server your project runs on. Two jobs — (1) a **dev server**
(`npm run dev`) that serves your app locally (usually `http://localhost:5173`) and instantly
refreshes the browser when you save a file (*hot reload*); and (2) a **bundler** (`npm run build`)
that packages everything into optimized files for hosting. It's the modern default that replaced the
older `create-react-app`.

**After running it:** `cd my-app` → `npm install` (download the real libraries) → `npm run dev`
(start the server). You'll get `src/` (your code — `App.tsx` is the main component), `index.html`
(the page React mounts into), `package.json` (dependencies + scripts), `tsconfig.json` (TypeScript's
rulebook), and `vite.config.ts` (Vite's settings — rarely touched early on).

---

## Step 0 — Scaffold the project

Run inside `/Users/bubbajo/Desktop/bubbaChess` so it fills the existing folder (the `.` means
"scaffold into the current directory" instead of making a nested `my-app/`):

```bash
npm create vite@latest . -- --template react-ts
npm install
npm run dev   # confirm the Vite starter page loads at http://localhost:5173
```

This gives us `src/App.tsx`, `src/main.tsx`, `index.html`, `package.json`, `tsconfig.json`, and
`vite.config.ts`. We'll then delete the starter boilerplate (logos, default CSS) and build from a
clean `App.tsx`.

---

## Architecture

We deliberately **separate the "brain" (chess rules) from the "face" (React UI)**. The engine is
plain TypeScript with no React imports — this makes it easy to reason about and test in isolation.

```
src/
├── engine/                 # PURE TypeScript — the chess rules, zero React
│   ├── types.ts            # Piece, Color, PieceType, Square, Board, Move, GameState types
│   ├── board.ts            # createInitialBoard(), board helpers (get/set square, in-bounds)
│   ├── moves.ts            # pseudo-legal move generation, per piece type
│   ├── rules.ts            # isSquareAttacked(), isInCheck(), filter to fully-legal moves,
│   │                       #   checkmate / stalemate detection
│   └── game.ts             # applyMove(), turn switching, castling rights, en passant target,
│                           #   promotion, game status
├── ai/
│   └── ai.ts               # chooseAiMove(state): starts as "pick a random legal move"
├── components/
│   ├── Board.tsx           # renders the 8x8 grid, maps engine state -> squares
│   ├── Square.tsx          # one square: color, highlight, click handler
│   └── Piece.tsx           # renders a single piece as a Unicode glyph (♔♕♖♗♘♙ / ♚♛♜♝♞♟)
├── App.tsx                 # owns game state (useState/useReducer), wires clicks -> engine -> AI
└── main.tsx                # Vite entry point (mostly unchanged)
```

### Core data model (kept beginner-friendly)

- **Board:** an 8×8 array `(Piece | null)[][]`, indexed `board[row][col]`. Row `0` is the **top**
  as displayed (Black's back rank); row `7` is the bottom (White's back rank). Column `0` is the
  left ("a" file). Using numeric `row`/`col` keeps move math simple (add/subtract to slide).
- **Piece:** `{ type: 'pawn'|'knight'|'bishop'|'rook'|'queen'|'king', color: 'white'|'black' }`.
- **Square:** `{ row: number, col: number }`.
- **Move:** `{ from: Square, to: Square, promotion?: PieceType, ... }` (extra flags for castling /
  en passant added when we reach those).
- **GameState:** `{ board, turn, castlingRights, enPassantTarget, status, history }` — one object
  that fully describes the game at any moment. React re-renders whenever this changes.

### How a turn flows
1. Human clicks a White piece → engine returns its **legal moves** → UI highlights them.
2. Human clicks a highlighted square → engine `applyMove()` produces a new `GameState`.
3. If the game isn't over, `chooseAiMove()` picks Black's reply (with a short `setTimeout` delay so
   it feels natural), and we `applyMove()` again.
4. UI re-renders from the new state and shows turn / check / checkmate.

---

## Milestones (build and run after each one)

Each milestone is independently runnable, so the user always has something working and can learn in
digestible chunks.

**M1 — Static board.** Scaffold, clean boilerplate, render an 8×8 grid via CSS Grid with square
colors from `(row + col) % 2`, and place all pieces in the starting position as Unicode glyphs. No
interaction yet. *Deliverable: a chessboard you can look at.*

**M2 — Move anything, anywhere.** Add click-to-select and click-to-move with **no rules** — you can
move any piece to any square, turns alternate. *Deliverable: the click interaction works end to end.*
This de-risks the UI before the hard logic.

**M3 — The rules engine.** Build `types.ts` → `board.ts` → `moves.ts`. Implement pseudo-legal move
generation for each piece: pawn (single/double step + diagonal captures), knight (L-shapes), sliding
pieces (bishop/rook/queen), king (one step). Enforce turn order, block illegal moves, and highlight
only legal destinations. *Deliverable: legal piece movement.*

**M4 — Check, checkmate & special moves.** Add `rules.ts`: `isSquareAttacked()` and `isInCheck()`,
then filter out any move that leaves your own king in check. Detect checkmate and stalemate. Add the
three tricky special rules: **castling**, **en passant**, and **pawn promotion** (auto-queen first,
add a chooser dialog later). *Deliverable: legally complete two-player chess (hotseat).*

**M5 — The AI opponent.** Add `ai.ts`. Start with the simplest working bot: **pick a random legal
move** for Black. Once that's wired in and playable, upgrade to a **minimax** search (depth 2–3) with
a basic material-count evaluation and alpha-beta pruning — a great, self-contained algorithms lesson.
*Deliverable: you can play a full game against the computer.*

**M6 — Polish.** Whose-turn indicator, check/checkmate banner, captured-piece tray, move history,
and a "New Game" reset button. Optional: swap Unicode glyphs for image assets, highlight the last
move, add a promotion-choice dialog. *Deliverable: a finished, shareable app.*

---

## Reuse / dependencies

- **No runtime chess dependencies** — the engine is ours. This is the whole point of the chosen path.
- Everything ships with the Vite `react-ts` template (React, TypeScript, Vite). Unicode chess glyphs
  need **no image assets**, keeping M1–M5 dependency-free.
- `React.useState` (or `useReducer` once state grows in M4) manages `GameState` — no state library
  needed for a project this size.

---

## Verification

- **After each milestone:** `npm run dev` and exercise the new behavior in the browser
  (`http://localhost:5173`).
- **Engine sanity checks (M3–M4):** because `engine/` is pure TypeScript, verify it directly — e.g.
  from the browser console or tiny throwaway scripts, assert known positions (starting position has
  20 legal moves; set up a simple back-rank mate and confirm `isCheckmate` returns true; verify
  castling is blocked when the king would pass through an attacked square). We can add Vitest later
  if the user wants automated tests.
- **AI (M5):** play several full games; confirm the bot only makes legal moves and that checkmate /
  stalemate end the game correctly.
- **Type safety throughout:** `npm run build` must pass with no TypeScript errors.

---

## Open options (sensible defaults chosen; easy to change later)

- **Pieces:** Unicode glyphs for v1 (zero assets). Can switch to SVG/PNG images in M6.
- **Promotion:** auto-promote to queen in M4; add a piece-picker dialog in M6.
- **AI strength:** random first, then minimax depth 2–3. Depth/eval are easy to tune.
