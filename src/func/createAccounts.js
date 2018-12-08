import {
  Crypto, Account
} from 'ontology-ts-sdk';

const createAccounts = async(password, name)=> {

  const keyType = Crypto.KeyType.ECDSA;
  const keyParameters = new Crypto.KeyParameters(Crypto.CurveLabel.SECP256R1);
  const privateKey = Crypto.PrivateKey.random(keyType, keyParameters);

  const accounts = Account.create( privateKey, password, name );
  console.log(accounts);

  return accounts;
}
export default createAccounts;