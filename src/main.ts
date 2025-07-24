function main() {
    let args: string[] = process.argv.slice(2); //ie for a glider : npx tsx src/main.ts [0,1,0,0] [0,0,1,0] [1,1,1,0] [0,0,0,0]

    if (args.length) {
        let grid: number[][] = args.map(arg => JSON.parse(arg));

        console.log('Start grid is:');
        grid.forEach(row => console.log(row));

        let nextBoard = grid.map((matrixRow: number[], rowIndex: number) => {
            return matrixRow.map((cell: number, cellIndex: number) => {
                const aliveNeighboursCount = getAliveNeighboursCount(grid, rowIndex, cellIndex);
                return isCellStillAlive(cell, aliveNeighboursCount);
            });
        });
        console.log('Next step grid is :');
        nextBoard.forEach(row => console.log(row));
    } else {
        console.log('Oops, no args ?');
    }
};


main();

export function getAliveNeighboursCount(grid: number[][], rowIndex: number, cellIndex: number): number {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /*cell*/[0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    let neighbours = 0;
    const gridHight = grid.length

    for (const [dx, dy] of directions) {
        const x = rowIndex + dx;
        const y = cellIndex + dy;

        if (x >= 0 && x < gridHight && y >= 0 && y < grid[x].length) {
            if (grid[x][y] === 1) {
                neighbours++;
            }
        }
    }

    return neighbours;
}

export function isCellStillAlive(cellState: number, aliveNeighboursCount: number): number {
    if (cellState == 1) return aliveNeighboursCount == 2 || aliveNeighboursCount == 3 ? 1 : 0;
    return aliveNeighboursCount == 3 ? 1 : 0;
}