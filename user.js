class User {
  constructor(balance) {
    this.balance = balance;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
    }
  }
  checkBalance() {
    return this.balance;
  }
}

module.exports = User;
