let winEmojis = ["💵", "🤑", "💲", "💰", "🪙"];
let loseEmojis = ["❌", "⛔", "🛑"];
let allEmojis = ["💵", "🤑", "💲", "💰", "🪙", "❌", "⛔", "🛑", "⛔", "🛑"];

let slots = [];
let rows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14]
];
let columns = [
    [0, 5, 10],
    [1, 6, 11],
    [2, 7, 12],
    [3, 8, 13],
    [4, 9, 14]
];


function spin() {
    slots = [];
    
    for (let i = 0; i < 15; i++) {
        document.getElementById("slot" + (i + 1)).innerHTML = "";
        document.getElementById("slot" + (i + 1)).style.backgroundColor = "";
    }

    for (let i = 0; i < 15; i++) {
        slots.push(allEmojis[Math.floor(Math.random() * allEmojis.length)]);
    }
    render();
    console.log(slots);
}

function render() {
    let ding = new Audio("blipSelect.wav");

    // Clear all first
    for (let i = 0; i < 15; i++) {
        document.getElementById("slot" + (i + 1)).innerHTML = "";
    }

    // Staggered reveal
    for (let i = 0; i < 15; i++) {
        let slotEl = document.getElementById("slot" + (i + 1));

        setTimeout(() => {
            // Set emoji
            slotEl.innerHTML = slots[i];

            // Trigger animation
            slotEl.style.animation = "none";
            void slotEl.offsetWidth; // reflow
            slotEl.style.animation = "popIn 0.3s ease-out";

            // Play sound
            let sound = new Audio("blipSelect.wav");
            sound.play();
        }, i * 150); // stagger delay
    }

    // Call detect() after all emojis are revealed
    setTimeout(detect, 150 * 15);
}



function playDing() {
  const sound = new Audio("money.wav");
  setTimeout(function () {
      sound.play();
  }, 20);
}

function detect() {
    for (let i = 0; i < 15; i++) {
        document.getElementById("slot" + (i + 1)).style.backgroundColor = "";
    }

    let winningRows = [];
    let winningCols = [];

    for (let row of rows) {
        if (row.every(i => winEmojis.includes(slots[i]))) {
            winningRows.push(...row);
        }
    }

    for (let col of columns) {
        if (col.every(i => winEmojis.includes(slots[i]))) {
            winningCols.push(...col);
        }
    }

    let delay = 200;

    winningRows.forEach((index, i) => {
        setTimeout(() => {
            setTimeout(function () {
                document.getElementById("slot" + (index + 1)).style.backgroundColor = "rgb(57, 183, 57)";
            }, 20);
            
            playDing();
        }, i * delay);
    });

    let clearTime = winningRows.length * delay + delay;
    setTimeout(() => {
        for (let i = 0; i < 15; i++) {
            document.getElementById("slot" + (i + 1)).style.backgroundColor = "";
        }
    }, clearTime);

    let colStartTime = clearTime + delay;
    winningCols.forEach((index, i) => {
        setTimeout(() => {
            document.getElementById("slot" + (index + 1)).style.backgroundColor = "rgb(57, 183, 57)";
            playDing();
        }, colStartTime + i * delay);
    });
}
