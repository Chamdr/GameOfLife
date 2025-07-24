let args = process.argv.slice(2); //ie for a glider : npx tsx src/main.ts [0,1,0,0] [0,0,1,0] [1,1,1,0] [0,0,0,0]

if (args.length) {
    let grid = args.map(arg => JSON.parse(arg));

    console.log('Start is:');
    grid.forEach(row => {
        console.log(row);
    })

    let nextBoard = grid.map((matrixRow: number[], rowIndex: number) => {
        return matrixRow.map((cell: number, cellIndex: number) => {
            const aliveNeighboursCount = getAliveNeighboursCount(grid, rowIndex, cellIndex)
            return isCellStillAlive(cell, aliveNeighboursCount);
        })
    });
    console.log('Next step is :');
    nextBoard.forEach(row => {
        console.log(row);
    })
} else {
    console.log('oops, no args ?');

}

function getAliveNeighboursCount(grid: number[][], rowIndex: number, cellIndex: number): number { // this is not pretty, Int find something better 
    let neighbours = 0

    // check top left cell
    if (rowIndex > 0 && cellIndex > 0 && grid[rowIndex - 1][cellIndex - 1] === 1) {
        neighbours++;
    }
    // check top cell
    if (rowIndex > 0 && grid[rowIndex - 1][cellIndex] === 1) {
        neighbours++;
    }
    // check top right cell
    if (rowIndex > 0 && cellIndex + 1 < grid[rowIndex].length && grid[rowIndex - 1][cellIndex + 1] === 1) {
        neighbours++;
    }
    // check left cell
    if (cellIndex > 0 && grid[rowIndex][cellIndex - 1] === 1) {
        neighbours++;
    }
    // check right cell
    if (rowIndex + 1 < grid.length && cellIndex + 1 < grid[rowIndex + 1].length && grid[rowIndex][cellIndex + 1] === 1) {
        neighbours++;
    }
    // check bottom left cell
    if (rowIndex + 1 < grid.length && cellIndex > 0 && grid[rowIndex + 1][cellIndex - 1] === 1) {
        neighbours++;
    }
    // check bottom cell
    if (rowIndex + 1 < grid.length && grid[rowIndex + 1][cellIndex] === 1) {
        neighbours++;
    }
    // check bottom right cell
    if (rowIndex + 1 < grid.length && cellIndex + 1 < grid[rowIndex + 1].length && grid[rowIndex + 1][cellIndex + 1] === 1) {
        neighbours++;
    }

    return neighbours;
}

function isCellStillAlive(cellState: number, aliveNeighboursCount: number): number {
    if (cellState == 1) {
        // if 2 or 3 alive neighbours stay alive else dies
        return aliveNeighboursCount == 2 || aliveNeighboursCount == 3 ? 1 : 0;
    } else {
        // if 3 alive neighbours stay alive else dies
        return aliveNeighboursCount == 3 ? 1 : 0;
    }
}