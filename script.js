const patterns = [
    [
        [0, 2, 0, 0, 5],
        [0, 0, 0, 3, 0],
        [0, 4, 0, 0, 0],
        [0, 0, 5, 0, 0],
        [1, 0, 0, 0, 0]
    ],
    [
        [0, 0, 3, 4, 0],
        [4, 0, 0, 0, 0],
        [0, 2, 0, 0, 5],
        [0, 0, 0, 5, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 2, 0, 0],
        [3, 0, 0, 4, 0],
        [0, 0, 0, 0, 0],
        [5, 0, 0, 0, 0]
    ],
    [
        [1, 0, 0, 0, 0],
        [0, 2, 0, 0, 0],
        [0, 0, 3, 0, 0],
        [0, 0, 0, 4, 0],
        [0, 0, 0, 0, 5]
    ],
    [
        [0, 0, 0, 1, 2],
        [2, 0, 0, 0, 0],
        [0, 0, 0, 0, 3],
        [0, 0, 1, 2, 0],
        [0, 2, 0, 0, 0]
    ]
];

const solutions = [
    [
        [1, 2, 3, 4, 5],
        [5, 4, 2, 3, 1],
        [4, 3, 5, 1, 2],
        [2, 1, 4, 5, 3],
        [3, 5, 1, 2, 4]
    ],
    [
        [5, 3, 4, 1, 2],
        [4, 2, 1, 3, 5],
        [2, 1, 5, 4, 3],
        [3, 4, 2, 5, 1],
        [1, 5, 3, 2, 4]
    ],
    [
        [2, 3, 4, 5, 1],
        [4, 5, 1, 2, 3],
        [5, 1, 2, 3, 4],
        [1, 2, 3, 4, 5],
        [3, 4, 5, 1, 2]
    ],
    [
        [1, 5, 4, 3, 2],
        [2, 3, 5, 4, 1],
        [3, 4, 1, 2, 5],
        [4, 1, 2, 5, 3],
        [5, 2, 3, 1, 4]
    ],
    [
        [4, 3, 2, 1, 5],
        [5, 4, 3, 2, 1],
        [1, 5, 4, 3, 2],
        [2, 1, 5, 4, 3],
        [3, 2, 1, 5, 4]
    ]
];

let currentPatternIndex = 0;

function createSudokuGrid() {
    const container = document.getElementById('sudoku-container');
    container.innerHTML = ''; 
    const pattern = patterns[currentPatternIndex];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.dataset.row = i;
            input.dataset.col = j;
            input.maxLength = 1;
            input.value = pattern[i][j] === 0 ? '' : pattern[i][j];
            container.appendChild(input);
        }
    }
}

function checkSudoku() {
    const inputs = document.querySelectorAll('#sudoku-container input');
    const pattern = patterns[currentPatternIndex];
    let isCorrect = true;
    inputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const value = parseInt(input.value) || 0;
        if (value !== solutions[currentPatternIndex][row][col]) {
            isCorrect = false;
        }
    });
    const message = document.getElementById('message');
    if (isCorrect) {
        message.textContent = 'Correct! Moving to the next pattern.';
        currentPatternIndex++;
        if (currentPatternIndex < patterns.length) {
            createSudokuGrid();
        } else {
            message.textContent = 'Congratulations! You completed all patterns.';
        }
    } else {
        message.textContent = 'Incorrect. Try again.';
    }
}

function solveSudoku() {
    const inputs = document.querySelectorAll('#sudoku-container input');
    const solution = solutions[currentPatternIndex];
    inputs.forEach(input => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        input.value = solution[row][col];
    });
}

function resetSudoku() {
    createSudokuGrid();
    document.getElementById('message').textContent = '';
}

createSudokuGrid();

document.getElementById('check-button').addEventListener('click', checkSudoku);
document.getElementById('solve-button').addEventListener('click', solveSudoku);
document.getElementById('reset-button').addEventListener('click', resetSudoku);
