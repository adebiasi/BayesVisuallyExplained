let prep_A;
let prep_B;
let prep_all;

let img_seek;
let img_ok;
let img_positive;
let img_negative;

let num_priori;
let num_to_know;

const Propositions = Object.freeze({
    A: 'A',
    B: 'B',
    NOT_A: 'NOT_A',
    NOT_B: 'NOT_B',
    A_AND_B: 'A_AND_B',
    A_OR_B: 'A_OR_B',
    ALL: 'ALL'
});

let priori = Propositions.ALL;
let to_know = Propositions.A;

var myParagraph;

function setup() {
    createCanvas(600, 600); // Imposta la dimensione del canvas
    prep_A = new Preposition("A", 200, 150, 300, 250)
    prep_B = new Preposition("B", 250, 200, 350, 300)
    prep_all = new Preposition("ALL", 0, 0, height, width)

    img_seek = loadImage('img/seek.jpg');
    img_ok = loadImage('img/ok.png');
    img_positive = loadImage('img/positive.png');
    img_negative = loadImage('img/negative.png');

    textAlign(CENTER, CENTER);

    myParagraph = select('#myParagraph');

}


function draw() {
    background(220); // Imposta lo sfondo del canvas

    drawGrid();
    if (prep_A.dragging) {
        prep_A.drag(mouseX, mouseY)
    }
    if (prep_B.dragging) {
        prep_B.drag(mouseX, mouseY)
    }
    prep_A.draw();
    prep_B.draw();

    let textToUpdate = "Probability " + to_know + " knowing that " + priori + ":\n" + num_to_know + " / " + num_priori + " = " + (num_to_know / num_priori).toFixed(2);
    myParagraph.html(textToUpdate);

}

function drawGrid() {
    let cols = 30; // Numero di colonne
    let rows = 30; // Numero di righe
    let squareSize = width / cols; // Calcola la dimensione di ogni quadrato

    num_priori = 0;
    num_to_know = 0;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * squareSize+squareSize/2; // Calcola la posizione x del quadrato
            let y = j * squareSize+squareSize/2; // Calcola la posizione y del quadrato

            if (checkProposition(priori, x, y)) {
                num_priori++;
                stroke(0); // Set the stroke color to black
                noFill(); // Do not fill the circle
                strokeWeight(2);
                ellipse(x, y, squareSize, squareSize);
                if (checkProposition(to_know, x, y)) {
                    num_to_know++;
                    noStroke(); // Set the stroke color to black
                    fill(255, 0, 0); // Set the fill color to red
                    strokeWeight(2);
                    ellipse(x, y, squareSize, squareSize);
                }
            }
        }
    }
}

function checkProposition(currProposition, x, y) {
    switch (currProposition) {
        case Propositions.A:
            return prep_A.contains(x, y);
        case Propositions.B:
            return prep_B.contains(x, y);
        case Propositions.NOT_A:
            return !prep_A.contains(x, y);
        case Propositions.ALL:
            return prep_all.contains(x, y);
        case Propositions.A_AND_B:
            return prep_A.contains(x, y) && prep_B.contains(x, y);
        case Propositions.A_OR_B:
            return prep_A.contains(x, y) || prep_B.contains(x, y);
        case Propositions.NOT_B:
            return !prep_B.contains(x, y);
    }
}

function mousePressed() {

    if (prep_A.contains(mouseX, mouseY)) {
        prep_A.updateOffset(mouseX, mouseY);
    }
    if (prep_B.contains(mouseX, mouseY)) {
        prep_B.updateOffset(mouseX, mouseY);
    }
}

function mouseReleased() {
    prep_A.stay()
    prep_B.stay()
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        to_know = updatePreposition(to_know);
        console.log(to_know)
    } else if (keyCode === DOWN_ARROW) {
        priori = updatePreposition(priori);
        console.log(priori)
    }

}

function updatePreposition(variable) {
    const prepIndex = Object.values(Propositions).indexOf(variable);
    const nextPrepIndex = (prepIndex + 1) % Object.keys(Propositions).length;
    return Object.keys(Propositions)[nextPrepIndex];
}

class Preposition {
    constructor(name, x1, y1, x2, y2) {
        this.name = name;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
// Calcola larghezza e altezza del rettangolo
        let widthRect = this.x2 - this.x1;
        let heightRect = this.y2 - this.y1;

        // Disegna il rettangolo
        noFill(); // Imposta il colore di riempimento a nero
        stroke(255); // Imposta il colore del contorno a bianco
        strokeWeight(4);
        rect(this.x1, this.y1, widthRect, heightRect); // Disegna il

        textSize(42);
        stroke(0); // Imposta il colore del contorno a bianco

        fill(255, 255, 255); // Set the fill color to red
        text(this.name, (this.x2 + this.x1)/2, (this.y2 + this.y1)/2);

    }

    contains(x, y) {
        return (x >= this.x1) && (x <= this.x2) && (y >= this.y1) && (y <= this.y2)
    }

    drag(new_x, new_y) {
        this.x1 = this.x1 + (new_x - this.offsetX);
        this.x2 = this.x2 + (new_x - this.offsetX);
        this.y1 = this.y1 + (new_y - this.offsetY);
        this.y2 = this.y2 + (new_y - this.offsetY);
        this.offsetX = new_x;
        this.offsetY = new_y;
    }

    stay() {
        this.dragging = false;
    }

    updateOffset(x, y) {
        this.dragging = true;
        this.offsetX = x;
        this.offsetY = y;
    }
}