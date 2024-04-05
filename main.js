//1. Deposit some money
//2. Determine the number of lines to be bet on
// 3.Collect a bet amount
//4.Spin the slot machine
//5.Check if the user wins
//6.Give the user their winnings
//7. Play again

const prompt = require("prompt-sync")()

const ROWS = 3;
const COLUMNS = 3;

const SYMBOL_COUNT = {
    "A": 2,
    "B":4,
    "C":6,
    "D":8
};


const SYMBOL_VALUES = {
    "A": 5,
    "B":4,
    "C":3,
    "D":2
};


const Deposit = () => {
    while(true){
        const depositamount = prompt("Enter the amount:");
        const numberdepositamount = parseInt(depositamount);
     
        if(isNaN(numberdepositamount) || numberdepositamount <= 0){
           console.log("Invalid amount, Try again!");
        } else{
            return numberdepositamount;
        }
     }
    };

    const getnumberoflines = () => {
        while(true){
            const lines = prompt("Enter the number of lines to be bet on (1-3):");
            const numberoflines = parseFloat(lines);
         
            if(isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3){
               console.log("Invalid number!, Try again");
            } else{
                return numberoflines;
            }
         }
        };
    
    const getbet = (balance, lines) =>{
        while(true){
            const bet = prompt("Enter the bet per line:");
            const numberbet = parseFloat(bet);

          if(isNaN(numberbet) || numberbet <=0 || numberbet > balance / lines){
            console.log("Invalid bet!, Try again");
          } else{
            return numberbet;
          } 
        }
    };
    
    const spin = () =>{
      const symbols = [];
      for (const [symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i =0; i < count; i++){
            symbols.push(symbol);
        }
      }
       
      const reels = [];
      for(let i =0; i<COLUMNS; i++){
        reels.push([]);
        const reelSymbols = [...symbols]
        for(let j =0; j<ROWS; j++){
          const randomindex = Math.floor(Math.random() * reelSymbols.length);
          const selectedSymbol = reelSymbols[randomindex];
          reels[i].push(selectedSymbol);
          reelSymbols.splice(randomindex, 1);
        }
      }
       return reels;
    };

    const transpose = (reels) => {
      const rows = []

      for(let i =0; i<ROWS; i++){
        rows.push([]);
        for(let j =0; j<COLUMNS; j++){
          rows[i].push(reels[j][i]);
        }
      }
      return rows;
    };
   
    const PrintRows = (rows) =>{
      for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
          rowString += symbol;
          if( i != row.length -1){
             rowString += " | "
          }
        }
        console.log(rowString);
      }
    }
 
    const getwinnings = (rows, bet, lines) =>{
       let winnings = 0;
       for(let row =0; row<lines; row++){
        const symbols = rows[row]; 
        let allsame = true;

        for(const symbol of symbols){
          if(symbol != symbols[0]){
             allsame = false;
             break;
          }
        }
         if(allsame){
          winnings += bet * SYMBOL_VALUES[symbols[0]];
         }
       }
       return winnings;
    }

  

   const game = () =>{

     let balance = Deposit();

     while(true){
      console.log("You have balance of $" + balance);
       const Numberoflines = getnumberoflines();
       const bet = getbet(balance, Numberoflines);
       balance -= bet * Numberoflines;
       const reels = spin();
       const rows = transpose(reels);
       PrintRows(rows);
       const winnings = getwinnings(rows, bet, Numberoflines);
       balance += winnings;
       console.log("You Won!!, $" + winnings.toString());

       if(balance <= 0){
        console.log("You are out of money!");
        break;
       }

       const playagain = prompt("Do you want to play again (y/n)? ");

       if(playagain != "y") break;
     }

   }; 

game()   



