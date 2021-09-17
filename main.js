const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "13/09/2021", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let limaCoin = new Blockchain();
limaCoin.addBlock(new Block(1, "14/09/2021", { amount: 4}));
limaCoin.addBlock(new Block(2, "16/09/2021", { amount: 10}));

console.log("Is blockchain valid? " + limaCoin.isChainValid());

limaCoin.chain[1].data = { amount: 100 };
limaCoin.chain[1].hash = limaCoin.chain[1].calculateHash();


console.log("Is blockchain valid? " + limaCoin.isChainValid());

// console.log(JSON.stringify(limaCoin, null, 4));
