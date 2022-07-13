export class AiPlayer {
    constructor(grid) {
        this.possibleMoves = this.getPossibleMoves(grid);
    }

    getPossibleMoves(grid) {
        const possibleMoves = [];
        grid.forEach((arr, arrIdx) => {
            arr.forEach((el, colIdx) => {
                const pos = `${arrIdx},${colIdx}`;
                possibleMoves.push(pos);
            })
        })
        return possibleMoves;
    }

    getMove() {
        const randIdx = Math.floor(Math.random() * this.possibleMoves.length);
        const chosenMove = this.possibleMoves[randIdx];
        this.possibleMoves.splice(randIdx, 1);
        return chosenMove;
    }
}
