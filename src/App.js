import React, { Component } from "react";
import "./css/App.css";

import { client } from 'ontology-dapi';

import {
  Wallet, Crypto, Account, Identity, OntidContract, TransactionBuilder,
  RestClient, CONST
} from 'ontology-ts-sdk';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: '', wallet: null, account: null,
      address: '', privateKey: null, password: 'pass',
      did: null, tx: null
    };
  }

  componentDidMount = async() => {
    this.createAccount = this.createAccount.bind(this);
    this.generatedid = this.generatedid.bind(this);
    this.createTransactionDid = this.createTransactionDid.bind(this);
    this.sendTransacrionDid = this.sendTransacrionDid.bind(this);

    //dapi
    client.registerClient({});
    const provider = await client.api.provider.getProvider();
    const account = await client.api.asset.getAccount();
    console.log(provider);
    console.log(account);
  }

  priv_key = async() => {
    
  }


  createAccount = async() => {
    const { password } = this.state;
    var wallet = Wallet.create('my_wallet');

    const name = 'user1';

    const keyType = Crypto.KeyType.ECDSA;
    const keyParameters = new Crypto.KeyParameters(Crypto.CurveLabel.SECP256R1);
    const privateKey = Crypto.PrivateKey.random(keyType, keyParameters);

    const account = await Account.create( privateKey, password, name );
    wallet.addAccount(account);
    console.log(account);
    

    this.setState({
      privateKey,
      account,
      address: account.address.value
    });
  }

  generatedid = async() => {
    const { privateKey, password } = this.state;

    const label = 'age';

    const identity = Identity.create(privateKey, password, label);

    this.setState({
      did: identity.ontid
    });

    console.log(identity.ontid);
  }

  createTransactionDid = async() => {
    const { account, privateKey, did } = this.state;

    const pk = privateKey.getPublicKey();
    const gasPrice = '550';
    const gasLimit = '20000';

    const tx = OntidContract.buildRegisterOntidTx(did, pk, gasPrice, gasLimit);
    TransactionBuilder.signTransaction(tx, privateKey);
    console.log(tx);
    tx.payer = account.address;
    TransactionBuilder.addSign(tx, privateKey);

    this.setState({
      tx
    });
  }

  sendTransacrionDid = async() => {
    const { tx } = this.state;
    const rest = new RestClient(CONST.TEST_ONT_URL.REST_URL);
    rest.sendRawTransaction(tx.serialize()).then(res => {
      console.log(res);
    });
  }

  get = async() => {
    const tx = OntidContract.buildGetDDOTx(this.state.did);
    console.log(tx);
  }


  render() {
    return (
      <div className="App">
        <p>address</p>
        <p>{this.state.address}</p>
        <button onClick={this.createAccount}>create accounts</button>
        <button onClick={this.generatedid} >createDid</button>
        <button onClick={this.createTransactionDid}>createTD</button>
        <button onClick={this.sendTransacrionDid}>sendTD</button>
        <button onClick={this.get}>get</button>
      </div>
    );
  }
}

export default App;