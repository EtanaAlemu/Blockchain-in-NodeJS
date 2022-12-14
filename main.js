var crypto = require("crypto");

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 1;
    this.pendingTrasactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2022", "Genesis Block");
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  /*

  addBlock(block) {
    block.previousHash = this.getLastBlock().hash;
    // block.hash = block.calculateHash();
    block.mineBlock(this.difficulty)
    this.chain.push(block);
  }

*/

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTrasactions);
    block.mineBlock(this.difficulty);
    console.log("Block mined successfully!");
    this.chain.push(block);

    console.log(
      "fromAddress: ",
      this.pendingTrasactions[this.pendingTrasactions.length - 1].fromAddress
    );

    if (
      this.pendingTrasactions[this.pendingTrasactions.length - 1].fromAddress !=
      null
    ) {
      this.pendingTrasactions[
        new Transaction(null, miningRewardAddress, this.miningReward)
    ];
    } 
  }

  createTransaction(transaction) {
    this.pendingTrasactions.push(transaction);
  }

  getBalance(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transaction) {
        if (trans.fromAddress === address) balance -= trans.amount;
        if (trans.toAddress === address) balance += trans.amount;
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) return false;

      if (currentBlock.previousHash !== previousBlock.hash) return false;
    }

    return true;
  }
}

class Block {
  constructor(timestamp, transaction, previousHash = "") {
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    const data =
      this.timestamp +
      JSON.stringify(this.transaction) +
      this.previousHash +
      this.nonce;
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    return hash.toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined:" + this.hash);
  }
}

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

let mBlockChain = new BlockChain();

// console.log("Mine block 1...");
// mBlockChain.addBlock(new Block(Date.now(), { amount: 10 }));
// console.log("Mine block 2...");
// mBlockChain.addBlock(new Block(Date.now(), { amount: 100 }));
// console.log("Mine block 3...");
// mBlockChain.addBlock(new Block(Date.now(), { amount: 50 }));

// console.log(JSON.stringify(mBlockChain, null, 4));

// console.log("is BlockChain valid? " + mBlockChain.isChainValid());

// mBlockChain.chain[2].transaction = { amount: 500 };

// console.log(JSON.stringify(mBlockChain.chain[2], null, 4));

// console.log("is BlockChain valid? " + mBlockChain.isChainValid());

// mBlockChain.chain[2].hash = mBlockChain.chain[2].calculateHash();
// mBlockChain.chain[3].previousHash = mBlockChain.chain[2].hash;
// mBlockChain.chain[3].hash = mBlockChain.chain[3].calculateHash();
// console.log("is BlockChain valid? " + mBlockChain.isChainValid());

mBlockChain.createTransaction(new Transaction("address1", "address2", 100));
mBlockChain.createTransaction(new Transaction("address2", "address1", 10));

  mBlockChain.minePendingTransactions("minerAddress");

  console.log("minerAddress:", mBlockChain.getBalance("minerAddress"));
  console.log("address1:", mBlockChain.getBalance("address1"));
  console.log("address2:", mBlockChain.getBalance("address2"));


  mBlockChain.minePendingTransactions("minerAddress");
  console.log("minerAddress:", mBlockChain.getBalance("minerAddress"));
  console.log("address1:", mBlockChain.getBalance("address1"));
  console.log("address2:", mBlockChain.getBalance("address2"));