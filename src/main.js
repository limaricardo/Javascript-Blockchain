

let limaCoin = new Blockchain();
limaCoin.createTransaction(new Transaction('address1',"address2", 100));
limaCoin.createTransaction(new Transaction('address2',"address1", 50));

console.log('\n Starting the miner... ');
limaCoin.minePendingTransactions('limas-address');

console.log('\nBalance of lima is ', limaCoin.getBalanceOfAddress('limas-address'));

console.log('\n Starting the miner again... ');
limaCoin.minePendingTransactions('limas-address');

console.log('\nBalance of lima is ', limaCoin.getBalanceOfAddress('limas-address'));