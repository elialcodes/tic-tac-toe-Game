# TIC TAC TOE :x: :trophy: :o: :four_leaf_clover:

Welcome to my Tic Tac Toe, a simple but really funny game for two players. I have learned to work with TypeScript in React.

## Features :star:

- the X turn starts the game by default
- the screen shows how the turn changes automatically every time
- there are 3 posibilities: winner X , winner O or tie
- when the game is over, a modal appers to show the final result and a play again button
- in the middle of a game, the user can restart it with a reset button
- the web uses local storage to save the game, so if the page is updated, it renders the lastest state of the game

## Tech Stack 📚

HTML, CSS, Vite, TypeScript and React.

## Installation 💻

Previously, you have to install Node.js.

```bash
  npm create vite@lastest tic-tac-toe
```

Select a framework: React
Select a variant: TypeScript + SWC

Install node_modules folder:

```bash
  npm install
```

Start the project:

```bash
  npm run dev
```

Expanding the ESLint configuration

```bash
  npx eslint --init
```

- Choose:

  - to check syntax, find problems and enfource code style
  - JavaScript modules (import/export)
  - React
  - use TypeScript
  - style guide Standard-with-TypeScript
  - format JavaScript

- Configure the top-level `parserOptions` property like this:

```
parserOptions: {
    project: './tsconfig.json',
  }
```

Clone the repository: https://github.com/elialcodes/tic-tac-toe-Game.git

## Links 🔗

https://tic-tac-toe-game-smoky-beta.vercel.app/
