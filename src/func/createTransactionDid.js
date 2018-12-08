import {
  OntidContract, TransactionBuilder
} from 'ontology-ts-sdk';

const createTransactionDid = async(account, privateKey, did, gasPrice, gasLimit) => {
  const pk = privateKey.getPublicKey();
  const tx = OntidContract.buildRegisterOntidTx(did, pk, gasPrice, gasLimit);

  TransactionBuilder.signTransaction(tx, privateKey);
  console.log(tx);

  tx.payer = account.address;
  
  TransactionBuilder.addSign(tx, privateKey);

  return tx;
}
export default createTransactionDid;