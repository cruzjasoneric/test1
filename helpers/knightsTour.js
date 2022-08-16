import { getNextBestMove, backtrack, displaySolution, executeMove, checkPossibleMoves } from './helpers.js';

export function solveKnightsTour(n, startingPoint) {

    const limit = (Number(n) * Number(n)) + 1000;

    let solutionsArray = [];
    let validMoves = [];

    let index = 0;
    let newStartingPoint;

    do {

        console.log(`[*] ${index}`);
        console.log(solutionsArray.length);

        validMoves = checkPossibleMoves(solutionsArray, newStartingPoint || startingPoint, index, Number(n));

        console.log(`valid moves: ${validMoves.toString()}`);

        if (index === 0) {
            solutionsArray.push({
                point: startingPoint,
                validMoves: validMoves,
            });
        } else {
            if (validMoves.length > 0) {
                const nextBestMove = getNextBestMove(validMoves, solutionsArray, n, index);

                if (nextBestMove.length > 0) {
                    newStartingPoint = executeMove(solutionsArray[solutionsArray.length - 1].point, nextBestMove[0].move);
                    solutionsArray.push({
                        point: newStartingPoint,
                        validMoves: validMoves,
                        moveExecuted: nextBestMove[0].move,
                    });
                } else {
                    // backtrack in advance
                    newStartingPoint = backtrack(solutionsArray, 'advanced');
                }
            } else {
                // backtrack
                newStartingPoint = backtrack(solutionsArray);
            }
        }
        index++;
    }
    while (solutionsArray.length < (n * n) && index < limit);

    console.log(`solutions: ${solutionsArray.length} out of ${n * n}`);
    const points = [];
    solutionsArray.map((item) => {
        points.push(`${item.point.x},${item.point.y}`);
    });

    displaySolution(points, Number(n));




    return solutionsArray;
}