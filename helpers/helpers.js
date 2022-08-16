import moment from 'moment';
import { config } from './../constants.js';

const generateCombination = (max) => {
    const arr = [];
    while (arr.length < 6) {
        let isValid = false;
        let randomNumber;

        do {
            randomNumber = Math.floor((Math.random() * max) + 1);
            if (!arr.includes(randomNumber)) {
                isValid = true;
            }
        }
        while (!isValid);

        arr.push(randomNumber);
    }
    return arr;
}

const drawResults = (num) => {
    const today = moment();
    const sub = today.subtract(num, 'days').format('LLLL');
    const dayName = sub.split(',')[0];

    const res = [];
    let gms;

    switch (dayName) {
        case 'Monday':
            gms = config.games.mon;
            break;
        case 'Tuesday':
            gms = config.games.tues;
            break;
        case 'Wednesday':
            gms = config.games.wed;
            break;
        case 'Thursday':
            gms = config.games.thurs;
            break;
        case 'Friday':
            gms = config.games.fri;
            break;
        case 'Saturday':
            gms = config.games.sat;
            break;
        case 'Sunday':
            gms = config.games.sun;
            break;
        default: break;
    }

    for (let item of gms) {
        const com = generateCombination(parseInt(item));
        res.push({
            combination: com,
            game: item,
            jackpot: 10000000,
            winners: 0,
            dateDrawn: new Date(sub).toISOString(),
        });
    }

    return res;
}

export function createDummyResults(n) {
    let arr = [];
    if (!n || n < 0) {
        throw new Error('Bad Request');
    } else if (n > 2000) {
        throw new Error('Too large');
    } else {
        let i = n;
        do {
            const res = drawResults(i);
            arr = [...arr, ...res];
            i--;
        }
        while (i > 0);
    }
    return arr;
}

export const executeMove = (point, move, isFuture = false) => {

    let x = Number(point.x);
    let y = Number(point.y);
    let resultX;
    let resultY;

    const moves = config.moves;
    let moveToExecute = moves.filter((item)=>item.indexOf(move) === 0);
    moveToExecute = moveToExecute[0].split(';')[1];
     


    const moveX = parseInt(moveToExecute.split(',')[0]);
    const moveY = parseInt(moveToExecute.split(',')[1]);


    resultX = x + moveX;
    resultY = y + moveY;

    if (!isFuture) {
        console.log(`moved to (${resultX}, ${resultY}) using move '${move}'`);
    }
    return { x: resultX, y: resultY };
}

const computeCoordinates = (x, y, move, n) => {
    
    const str = move.split(';')[1];
    
    const moveX = parseInt(str.split(',')[0]);
    const moveY = parseInt(str.split(',')[1]);


    const xp1 = x + moveX;
    const xp2 = y + moveY;
    const exprX = x + moveX < n && x + moveX >= 0;
    const exprY = y + moveY < n && y + moveY >= 0;

    return ({
        xp1,
        xp2,
        exprX,
        exprY,
    });
}

export const checkPossibleMoves = (solutionsArray, point, index, n, isFuture = false) => {
    const arr = [];
    let x = Number(point.x);
    let y = Number(point.y);

    let move;
    let existing;

    for (let item of config.moves) {
        move = item.split(';')[0];
        const obj = computeCoordinates(x, y, item, n);
        if (obj.exprX && obj.exprY) {
            // valid
            existing = solutionsArray.filter((element) => Number(element.point.x) === obj.xp1 && Number(element.point.y) === obj.xp2)
            if (existing && existing.length === 0) {
                arr.push(move);
            }
        }

    }

    const movesToAvoid = index > 1 ? solutionsArray[solutionsArray.length - 1].movesToAvoid || [] : [];
    let ret = arr;

    if (movesToAvoid && movesToAvoid.length > 0) {
        ret = arr.filter((item) => !movesToAvoid.includes(item));
    }
    return ret;
}

const sortArray = (a, b) => {
    if (a.possibleMoves < b.possibleMoves) {
        return -1;
    }
    if (a.possibleMoves > b.possibleMoves) {
        return 1;
    }
    return 0;
}

export const displaySolution = (points, n) => {
    let text = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let temp = `${j},${i}`;
            text += `[${points.indexOf(temp)}]\t`;
        }
        text += '\r\n\r\n';
    }

    console.log(text);
}



export const backtrack = (solutionsArray, type = null) => {
    const lastSolution = solutionsArray.pop();
    const movesToAvoidElse = solutionsArray[solutionsArray.length - 1].movesToAvoid || [];
    movesToAvoidElse.push(lastSolution.moveExecuted);
    solutionsArray[solutionsArray.length - 1].movesToAvoid = movesToAvoidElse;

    if (type) {
        console.log(`will be running out of valid moves, backtracking to (${solutionsArray[solutionsArray.length - 1].point.x}, ${solutionsArray[solutionsArray.length - 1].point.y}), but now avoiding move(s) '${movesToAvoidElse.toString()}'`);
    } else {
        console.log(`backtracking to (${solutionsArray[solutionsArray.length - 1].point.x}, ${solutionsArray[solutionsArray.length - 1].point.y}), but now avoiding move(s) '${movesToAvoidElse.toString()}'`);
    }

    return solutionsArray[solutionsArray.length - 1].point;

}

export const getNextBestMove = (validMoves, solutionsArray, n, index) => {
    let nextPossibleMoves = [];
    let newStartingPoint;
    for (let move of validMoves) {
        newStartingPoint = executeMove(solutionsArray[solutionsArray.length - 1].point, move, true);
        const possibleMoves = checkPossibleMoves(solutionsArray, newStartingPoint, index, Number(n), true).length;
        nextPossibleMoves.push({ move: move, possibleMoves: possibleMoves });
    }

    if (solutionsArray.length < ((Number(n) * Number(n)) - 1)) {
        nextPossibleMoves = nextPossibleMoves.filter((item) => item.possibleMoves !== 0);
    }

    const nextPossibleMovesStr = nextPossibleMoves.map((item) => `${item.move}:${item.possibleMoves}`).toString();

    console.log(`next possible moves: ${nextPossibleMovesStr}`);
    nextPossibleMoves.sort(sortArray);

    let minMove;
    let minMoves = [];

    if (nextPossibleMoves.length) {
        minMove = nextPossibleMoves[0].possibleMoves;
        minMoves = nextPossibleMoves.filter((item) => item.possibleMoves === minMove);
    }

    if (minMoves.length > 0) {
        minMoves = [minMoves[Math.floor((Math.random() * minMoves.length))]];
    }

    return minMoves;
}