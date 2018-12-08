import {
  Wallet
} from 'ontology-ts-sdk';

const createWallet = async(walletName) => {
  
  const wallet = Wallet.create(walletName);
  console.log(wallet);

  return wallet;
}
export default createWallet;