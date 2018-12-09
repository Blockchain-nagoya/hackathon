import React, { Component } from "react";
import "./css/App.css";

import { client } from 'ontology-dapi';

import {
  Crypto, Account, Identity, OntidContract, TransactionBuilder,
  RestClient, CONST, Wallet
} from 'ontology-ts-sdk';

import UserTop from './Components/UserTop';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: '', wallet: null,
      account: null, address: '', privateKey: null, password: '',
      did: null, didPrivateKey: null, tx: null
    };
  }

  componentDidMount = async() => {
    client.registerClient({});
    /*
    //dapi
    const result = await client.api.provider.getProvider();
    const address = await client.api.asset.getAccount();
    const network = await client.api.network.getNetwork();
    console.log(JSON.stringify(result));
    console.log(JSON.stringify(address));
    console.log(network);
    */

    //SDK account
    let wallet = Wallet.create('my_wallet');
    const address = await client.api.asset.getAccount();
    const password = "aaa";
    const privateKey = Crypto.PrivateKey.deserializeWIF('L3y6G87B4bURtBC5d8yNd3pquaPzH2ATKmTMJruhncQBVBg6qZjj');  //WIF
    const account = Account.create(privateKey, password);
    console.log(address);
    console.log(account);
    console.log(privateKey);
    console.log('password:' + password);
  
    this.setState({
      account, privateKey, password, address, wallet
    });
    this.addAccount = this.addAccount.bind(this);
    this.generatedid = this.generatedid.bind(this);
    this.createTransactionDid = this.createTransactionDid.bind(this);
  }

  addAccount = async() => {
    const { account, wallet } = this.state;
    console.log(account);
    wallet.addAccount(account);
    console.log(wallet);
  }

  generatedid = async() => {
    const label = 'name';
    const privateKey = Crypto.PrivateKey.random();
    const password = 'bbb';

    let identity = Identity.create(privateKey, password, label);

    this.setState({ did: identity.ontid, didPrivateKey: privateKey });
    console.log(identity.ontid);
  }

  createTransactionDid = async() => {
    const { privateKey, did, account, didPrivateKey } = this.state;

    const pk = didPrivateKey.getPublicKey();
    const gasPrice = '550';
    const gasLimit = '20000';

    const tx = OntidContract.buildRegisterOntidTx(did, pk, gasPrice, gasLimit);
    tx.payer = account.address;
    TransactionBuilder.signTransaction(tx, didPrivateKey);

    const pri = privateKey;
    TransactionBuilder.addSign(tx, pri)
    console.log(tx);

    const rest = new RestClient();
    rest.sendRawTransaction(tx.serialize(), false).then(res => {
      console.log(res);
    })

    this.setState({ tx });
  }
  // created did:ont:AVhDg6z4umV4u8U6wa7D8jDQ745LLt9LfB

  get = async() => {
    const { did } = this.state;
    const tx = OntidContract.buildGetDDOTx(did);
    console.log(tx);
  }


  render() {
    const { address } = this.state;
    return (
      <div className="App">
        <p>address</p>
        <p>{this.state.address}</p>
        <button onClick={this.addAccount}>addAccount</button>
        <button onClick={this.generatedid} >createDid</button>
        <button onClick={this.createTransactionDid}>createTD</button>
        <button onClick={this.sendTransacrionDid}>sendTD</button>
        <button onClick={this.get}>get</button>

        <UserTop />
      </div>
    );
  }
}

export default App;


// address: AVhDg6z4umV4u8U6wa7D8jDQ745LLt9LfB //Address (little endian)
// privateKey: c9574d40a5f81d00e792f0a6c9198474b7b11a7ba6e83f4b9d53f38576e457dc
// Wif : L3y6G87B4bURtBC5d8yNd3pquaPzH2ATKmTMJruhncQBVBg6qZjj
// password : aaa 
// publicKey : 02192434e0b56d503a6d79b38187c3e0c7d7c7f206fda9179bfc4b5590d9c2c426