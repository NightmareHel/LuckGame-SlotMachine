// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin the slot
// 5. determin wining
// 6. give user winning
// 7. play again ?

//function deposit()
//{


//    return 1
//}

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

const deposit = () => {

    while(true) {
        const depositAmount = prompt("Enter a deposit amount: ");
            const numberDepositAmount = parseFloat(depositAmount);

        
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid Deposit Amount, try again.");
        }   else    {
        return numberDepositAmount;
        }
    }

};

const getNumberOfLines = () => {

    while(true) {
        const lines = prompt("Enter the amount of lines to bet on (1-3): ");
            const NumberOfLines = parseFloat(lines);

        if(isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        }   else    {
        return NumberOfLines;
        }
    }

};

const getBet = (balance, NumberOfLines) => {

    while(true) {
        const bet = prompt("Enter the bet per line: ");
            const NumberBet = parseFloat(bet);

        if(isNaN(NumberBet) || NumberBet <= 0 || NumberBet > balance/NumberOfLines) {
            console.log("Invalid bet, try again.");
        }   else    {
        return NumberBet;
        }
    }

}

const spin = () => {

    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++){
            symbols.push(symbol);



        }
    }
    //console.log(symbols)

    const reels = [];
    for (let i = 0; i< COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;

};

const transpose = (reels) => {

    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);

        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])

        }

    }

    return rows;

};

const printRows = (rows) => {

    for (const row of rows) {
        let rowString = "";

        for (const [i, symbols] of row.entries()){
            rowString += symbols 

            if (i != row.length - 1) {
                rowString += " | "
            }

        }
        console.log(rowString);
    }

};

const getWinnings = (rows, bet, NumberOfLines) => {
    let winnings = 0;

    for (let row = 0; row < NumberOfLines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {

            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }

        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]

        }

    }

        return winnings;

}

const game = () => {

    let balance = deposit();
    //console.log(depositAmount);

        while (true) {
            console.log("You have a balance of $" + balance);
        const NumberOfLines = getNumberOfLines();
        const bet = getBet(balance, NumberOfLines);
            balance -= bet * NumberOfLines;
        const reels = spin();
        //console.log(reels);
        const rows = transpose(reels);
        //console.log(reels);
        //console.log(rows);
        printRows(rows);
        const winnings = getWinnings(rows, bet, NumberOfLines );
            balance += winnings;
        console.log("You Won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("Balance Empty");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");

            if(playAgain != "y") break;

        }

};

game();





