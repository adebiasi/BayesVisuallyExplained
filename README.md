# BayesVisuallyExplained

This project is an interactive visualization built using p5.js that demonstrates conditional probability between two logical propositions (A and B). The user can drag and position two rectangles on a canvas to define sets, combine logical statements (A ∧ B, A ∨ B, ¬A, ¬B), and calculate the conditional probability between them.

## 🧩 Features

- Drag and reposition areas A and B on the canvas.
- Compute conditional probability P(to_know | priori).
- Visually display grid cells that satisfy given logical conditions.
- Switch propositions via keyboard input.

## 🎮 Controls

| Key         | Action                                |
|-------------|---------------------------------------|
| ↑ Arrow     | Change the "to_know" proposition      |
| ↓ Arrow     | Change the "priori" proposition       |
| Mouse Click | Select and start dragging A or B      |
| Mouse Release | Stop dragging A or B               |

## 📐 Class Overview

Preposition represents a rectangular region on the canvas. It has a label (such as "A" or "B") and can be drawn, moved, or tested to see if a point lies within it.

## 🔄 Main Logic

The canvas is divided into a 30x30 grid. For each cell:
- If the point satisfies the "priori" proposition, it's outlined.
- If it also satisfies "to_know", it's filled in red.
- The ratio of matching cells gives the conditional probability shown on screen.

## 🔣 Supported Propositions

The system supports:
- A, B: individual sets
- NOT_A, NOT_B: their negations
- A_AND_B, A_OR_B: logical combinations
- ALL: the entire canvas (universal set)

## 🧪 How to Use

1. Drag rectangles A and B around to define your regions.
2. Use arrow keys to change the "to_know" and "priori" propositions.
3. Observe how the conditional probability updates in real time.

## ▶️ Try it

You can try the game with statistics here:  
https://adebiasi.github.io/BayesVisuallyExplained/

## 🖼️ Screenshots

![Screenshot](https://github.com/adebiasi/BayesVisuallyExplained/blob/main/img/screenshots1.png)


---

Ideal for teaching logic, probability, and visual reasoning interactively.

