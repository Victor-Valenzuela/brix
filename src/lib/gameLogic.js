// Brix: 8 columnas × 6 filas (48 celdas)
// Base máxima: 8 celdas (4 ladrillos horizontales)
// Cada ladrillo ocupa 2 celdas
// Cada celda: null | { symbol: 'X'|'O', color: 'orange'|'blue' }

export const ROWS = 6;
export const COLS = 8;

export function createBoard() {
    return Array.from({
        length: ROWS
    }, () => Array(COLS).fill(null));
}

// Orientaciones posibles de un ladrillo
// Horizontal: ocupa (row, col) y (row, col+1)
// Vertical: ocupa (row, col) y (row-1, col) — se apila hacia arriba

// Las 8 configuraciones de un ladrillo:
// orientation: 'h' | 'v'
// cells: [celda1, celda2] donde cada celda = { symbol, color }
export function getBrickConfigs() {
    return [
        // Horizontales
        {
            id: 'h1',
            orientation: 'h',
            cells: [{
                symbol: 'X',
                color: 'orange'
            }, {
                symbol: 'O',
                color: 'blue'
            }]
        },
        {
            id: 'h2',
            orientation: 'h',
            cells: [{
                symbol: 'O',
                color: 'orange'
            }, {
                symbol: 'X',
                color: 'blue'
            }]
        },
        {
            id: 'h3',
            orientation: 'h',
            cells: [{
                symbol: 'X',
                color: 'blue'
            }, {
                symbol: 'O',
                color: 'orange'
            }]
        },
        {
            id: 'h4',
            orientation: 'h',
            cells: [{
                symbol: 'O',
                color: 'blue'
            }, {
                symbol: 'X',
                color: 'orange'
            }]
        },
        // Verticales (cells[0] = abajo, cells[1] = arriba)
        {
            id: 'v1',
            orientation: 'v',
            cells: [{
                symbol: 'X',
                color: 'orange'
            }, {
                symbol: 'O',
                color: 'blue'
            }]
        },
        {
            id: 'v2',
            orientation: 'v',
            cells: [{
                symbol: 'O',
                color: 'orange'
            }, {
                symbol: 'X',
                color: 'blue'
            }]
        },
        {
            id: 'v3',
            orientation: 'v',
            cells: [{
                symbol: 'X',
                color: 'blue'
            }, {
                symbol: 'O',
                color: 'orange'
            }]
        },
        {
            id: 'v4',
            orientation: 'v',
            cells: [{
                symbol: 'O',
                color: 'blue'
            }, {
                symbol: 'X',
                color: 'orange'
            }]
        },
    ];
}

// Verifica si un ladrillo se puede colocar en una posición
// Reglas:
// 1. NO puede quedar ningún espacio vacío debajo de las celdas del ladrillo
// 2. Debe tocar al menos un ladrillo ya jugado (excepto la primera jugada)
// Para horizontal: (row, col) y (row, col+1)
// Para vertical: (row, col) es abajo, (row-1, col) es arriba
export function canPlace(board, row, col, orientation) {
    if (orientation === 'h') {
        if (col + 1 >= COLS) return false;
        if (board[row][col] !== null || board[row][col + 1] !== null) return false;
        const hasSupport1 = row === ROWS - 1 || board[row + 1][col] !== null;
        const hasSupport2 = row === ROWS - 1 || board[row + 1][col + 1] !== null;
        if (!hasSupport1 || !hasSupport2) return false;
        for (let r = row + 1; r < ROWS; r++) {
            if (board[r][col] === null || board[r][col + 1] === null) return false;
        }
        // Debe tocar ladrillo previo (excepto primera jugada)
        if (!isBoardEmpty(board) && !touchesExisting(board, [
            [row, col],
            [row, col + 1]
        ])) return false;
        return true;
    } else {
        if (row - 1 < 0) return false;
        if (board[row][col] !== null || board[row - 1][col] !== null) return false;
        const hasSupport = row === ROWS - 1 || board[row + 1][col] !== null;
        if (!hasSupport) return false;
        for (let r = row + 1; r < ROWS; r++) {
            if (board[r][col] === null) return false;
        }
        // Debe tocar ladrillo previo (excepto primera jugada)
        if (!isBoardEmpty(board) && !touchesExisting(board, [
            [row, col],
            [row - 1, col]
        ])) return false;
        return true;
    }
}

// Verifica si el tablero está vacío (primera jugada)
function isBoardEmpty(board) {
    return board.every(row => row.every(cell => cell === null));
}

// Verifica si al menos una celda del ladrillo es adyacente a una celda ocupada
function touchesExisting(board, cells) {
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];
    const cellSet = new Set(cells.map(([r, c]) => `${r},${c}`));

    for (const [row, col] of cells) {
        for (const [dr, dc] of directions) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
            // No contar las propias celdas del ladrillo
            if (cellSet.has(`${nr},${nc}`)) continue;
            if (board[nr][nc] !== null) return true;
        }
    }
    return false;
}

// Coloca un ladrillo en el tablero
export function placeBrick(board, row, col, config) {
    const newBoard = board.map(r => [...r]);

    if (config.orientation === 'h') {
        newBoard[row][col] = {
            ...config.cells[0]
        };
        newBoard[row][col + 1] = {
            ...config.cells[1]
        };
    } else {
        newBoard[row][col] = {
            ...config.cells[0]
        }; // abajo
        newBoard[row - 1][col] = {
            ...config.cells[1]
        }; // arriba
    }

    return newBoard;
}

// Obtiene todas las posiciones válidas para una orientación
export function getValidPositions(board, orientation) {
    const positions = [];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (canPlace(board, row, col, orientation)) {
                positions.push({
                    row,
                    col
                });
            }
        }
    }
    return positions;
}

// Verifica victoria según el modo de juego
// mode: 'symbols' | 'colors' | 'advanced'
// currentPlayer: el jugador que acaba de colocar la pieza (1 o 2)
// Si ambos completan 4 en línea simultáneamente, gana quien puso la pieza
//
// Modos:
// - symbols: J1 gana con 4 X, J2 gana con 4 O
// - colors: J1 gana con 4 naranja, J2 gana con 4 azul
// - advanced: J1 gana con 4 X o 4 O (símbolos), J2 gana con 4 naranja o 4 azul (colores)
export function checkWin(board, currentPlayer, mode = 'symbols') {
    const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal ↘
        [1, -1], // diagonal ↙
    ];

    let wins = [];

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (!board[row][col]) continue;

            for (const [dr, dc] of directions) {
                const line = [];
                for (let i = 0; i < 4; i++) {
                    const r = row + dr * i;
                    const c = col + dc * i;
                    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || !board[r][c]) break;
                    line.push({
                        row: r,
                        col: c,
                        cell: board[r][c]
                    });
                }

                if (line.length < 4) continue;

                const symbols = line.map(l => l.cell.symbol);
                const colors = line.map(l => l.cell.color);
                const coords = line.map(l => [l.row, l.col]);

                // Detectar 4 iguales
                if (symbols.every(s => s === 'X')) {
                    wins.push({
                        type: 'symbol',
                        value: 'X',
                        line: coords
                    });
                }
                if (symbols.every(s => s === 'O')) {
                    wins.push({
                        type: 'symbol',
                        value: 'O',
                        line: coords
                    });
                }
                if (colors.every(c => c === 'orange')) {
                    wins.push({
                        type: 'color',
                        value: 'orange',
                        line: coords
                    });
                }
                if (colors.every(c => c === 'blue')) {
                    wins.push({
                        type: 'color',
                        value: 'blue',
                        line: coords
                    });
                }
            }
        }
    }

    if (wins.length === 0) {
        const isFull = board.every(row => row.every(cell => cell !== null));
        if (isFull) return {
            type: 'draw',
            value: null,
            line: [],
            player: null
        };
        return null;
    }

    // Filtrar victorias válidas según el modo
    let validWins = [];

    if (mode === 'symbols') {
        // J1 gana con X, J2 gana con O
        validWins = wins.filter(w => {
            if (w.type !== 'symbol') return false;
            if (w.value === 'X') return true; // J1
            if (w.value === 'O') return true; // J2
            return false;
        });
    } else if (mode === 'colors') {
        // J1 gana con naranja, J2 gana con azul
        validWins = wins.filter(w => {
            if (w.type !== 'color') return false;
            if (w.value === 'orange') return true; // J1
            if (w.value === 'blue') return true; // J2
            return false;
        });
    } else if (mode === 'advanced') {
        // J1 gana con símbolos (X o O), J2 gana con colores (naranja o azul)
        validWins = wins.filter(w => {
            if (w.type === 'symbol') return true; // J1
            if (w.type === 'color') return true; // J2
            return false;
        });
    }

    if (validWins.length === 0) {
        const isFull = board.every(row => row.every(cell => cell !== null));
        if (isFull) return {
            type: 'draw',
            value: null,
            line: [],
            player: null
        };
        return null;
    }

    // Determinar ganador
    let winner = currentPlayer;

    if (mode === 'symbols') {
        const xWin = validWins.find(w => w.value === 'X');
        const oWin = validWins.find(w => w.value === 'O');
        if (xWin && oWin) {
            winner = currentPlayer;
            // Devolver la línea del jugador que puso la pieza
            const result = currentPlayer === 1 ? xWin : oWin;
            return {
                ...result,
                player: winner
            };
        } else if (xWin) {
            winner = 1;
            return {
                ...xWin,
                player: winner
            };
        } else if (oWin) {
            winner = 2;
            return {
                ...oWin,
                player: winner
            };
        }
    } else if (mode === 'colors') {
        const orangeWin = validWins.find(w => w.value === 'orange');
        const blueWin = validWins.find(w => w.value === 'blue');
        if (orangeWin && blueWin) {
            winner = currentPlayer;
            const result = currentPlayer === 1 ? orangeWin : blueWin;
            return {
                ...result,
                player: winner
            };
        } else if (orangeWin) {
            winner = 1;
            return {
                ...orangeWin,
                player: winner
            };
        } else if (blueWin) {
            winner = 2;
            return {
                ...blueWin,
                player: winner
            };
        }
    } else {
        // advanced: J1 = símbolos, J2 = colores
        const symbolWin = validWins.find(w => w.type === 'symbol');
        const colorWin = validWins.find(w => w.type === 'color');
        if (symbolWin && colorWin) {
            winner = currentPlayer;
            const result = currentPlayer === 1 ? symbolWin : colorWin;
            return {
                ...result,
                player: winner
            };
        } else if (symbolWin) {
            winner = 1;
            return {
                ...symbolWin,
                player: winner
            };
        } else if (colorWin) {
            winner = 2;
            return {
                ...colorWin,
                player: winner
            };
        }
    }

    return null;
}