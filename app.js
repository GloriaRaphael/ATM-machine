const inquirer = require("inquirer");
const User = require("./user");

//======================ATM BALANCE====================================================================
let atmBalance = Number(100000);

//======================USERS BALANCE====================================================================

let theuser = new User(500000);

//======================WELCOME NOTE====================================================================
welcome();
function welcome() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "operator",
        message:
          "Welcome to EcoBank. The Pan African Bank \n  Press any key to continue",
      },
    ])
    .then(answer => {
      return operator();
    });
}

//========================SELECT OPERTAOR {USER or ADMIN}=========================================

function operator() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "user",
        message: "Please select Operator",
        choices: ["Admin", "Customer"],
      },
    ])
    .then(answer => {
      if (answer.user === "Admin") {
        return admin();
      } else {
        return user();
      }
    });
}

//========================================USER OPERATIONS==============================================================================

function user() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Please select Transaction",
        choices: ["Withdraw", "CheckBalance"],
      },
    ])
    .then(answer => {
      if (answer.action === "Withdraw") {
        return selectAmount();
      } else {
        return checkUserBalance();
      }
    });
}

//================================USER SELECTS AMOUNT ======================================================================================
function selectAmount() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "amount",
        message: "Select Amount",
        choices: [1000, 5000, 10000, 15000, "Other"],
      },
    ])
    .then(answer => {
      if (answer.amount === "Other") {
        return other();
      } else {
        if (atmBalance >= answer.amount) {
          atmBalance -= answer.amount;
          theuser.withdraw(answer.amount);
        }
        console.log(`Withdrawl of ${answer.amount} sucessful!!! \n `);
        return transactAgain();
      }
    });
}

//================================USER SELECTS OTHER ======================================================================================

function other() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "amount",
        message: "Enter Amount",
      },
    ])
    .then(answer => {
      if (
        atmBalance >= answer.amount &&
        theuser.checkBalance() >= answer.amount
      ) {
        atmBalance -= answer.amount;
        theuser.withdraw(answer.amount);
        console.log(`Withdrawl of ${answer.amount} sucessful!!!
        `);
      } else {
        console.log("Insufficient Cash");
      }
      return transactAgain();
    });
}

//================================FUNCTION CHECK BALANCE======================================================================================

function checkbalance() {
  console.log(`Account Balance: ${atmBalance}`);
  return transactAgain();
}

function checkUserBalance() {
  console.log(`Account Balance: ${theuser.checkBalance()}`);
  return transactAgain();
}
//===============================RUN ANOTHER selectAmount=======================================================================================

function transactAgain() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "transact",
        message: "Would you like to transact again?",
        choices: ["YES", "NO"],
      },
    ])
    .then(answer => {
      console.log(" \n ");
      if (answer.transact === "YES") {
        return operator();
      } else {
        console.log(`Thank You For your Patronage!!!`);
      }
    });
}

//======================================================================================================================

//========================================ADMIN OPERATIONS==============================================================================

function admin() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "operator",
        message: "Please select Operation",
        choices: ["Top Up", "Check Balance", "Disable ATM"],
      },
    ])
    .then(answer => {
      if (answer.operator === "Top Up") {
        return toUp();
      } else if (answer.operator === "Check Balance") {
        return checkbalance();
      } else if (answer.operator === "Disable ATM") {
        return disableAtm();
      }
    });
}

//=========================================FUNCTION TOP UP=============================================================================

function toUp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addcash",
        message: "Welcome Back Admin \n Please enter TopUp Amount: ",
      },
    ])
    .then(answer => {
      if (answer.addcash > 5000000) {
        console.log(
          `${
            answer.addcash
          } Input out of range. \n Maximum of 5,000,000 per session. \n Thank you!!!`
        );
      } else if (answer.addcash <= 0) {
        return `Invalid Input!`;
      } else {
        newBal = Number(answer.addcash);

        atmBalance += newBal;
        console.log(
          `TopUp of ${
            answer.addcash
          } successful! Current ATM Balance: ${atmBalance}`
        );
      }
      return transactAgain();
    });
}

//=========================================FUNCTION Disable ATM=============================================================================

function disableAtm() {
  console.log(
    `ATM disabled till further notice \n Error: \n Insufficient Cash to dispense \n ATM no service, connection error. \n Try again later. Thank You`
  );
}
