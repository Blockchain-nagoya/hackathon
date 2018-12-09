import React, { Component } from "react";
import "./css/App.css";

import { client } from "ontology-dapi";

class Input extends Component {
 constructor() {
   super();
   this.state = {
     data: {
       name: '',
       studentNumber: '',
       age: '',
       faculity: '',
       schoolCredit: ''
     }
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleChange(e) {
   var data = this.state.data;

   switch (e.target.name) {
     case "name":
       data.ONTid = e.target.name;
       break;
     case "studentNumber":
       data.studentNumber = e.target.name;
       break;
     case "age":
       data.age = e.target.name;
       break;
     case "faculity":
       data.faculity = e.target.name;
       break;
     case "schoolCredit":
       data.schoolCredit = e.target.name;
       break;
   }

   this.setState({
     data: data
   });
 }

 handleSubmit(e) { }


 buildClaim = () => {
   const signature = null;
   const useProof = false;

   const claim = new.Ont.Claim({
     messageId: 'graduated',
     issuer: '',
     subject: '',
     issueAt:

   }, signature, useProof);

   claim.version = '0.7.0';
   claim.context = 'https://example.com/template/v1';
   claim.content = {
     Name: this.state.name,
     StudentNumber: this.state.studentNumber,
     Age: this.state.age,
     Faculity: this.state.faculity,
     SchoolCredit: this.state.schoolCredit
   };
   return claim;
 }

 issueClaim = () => {
   const claim = buildClaim();
   const url2 = http://polaris1.ont.io:20334';

   const publicKeyId = this.props.Did + "#keys-1"
   const issuerPriv = new Ont.Crypto.PrivateKey(this.props.publicKey);

   const gasPrice = '500';
   const gasLimit = '200000';
   const payer = new Ont.Crypto.Address(this.props.address);
   const privateKey = Ont.Crypto.PrivateKey.deserializeWIF(this.props.privateKey)
   const result = await claim.attest(url, gasPrice, gasLimit, payer, privateKey);
   console.log(result)

   const msg = Ont.Claim.deserialize(singed);
   var verified = await msg.verify(url2, false)

   console.log(verified)

   const walletPrivateKey = new Ont.Crypto.PrivateKey("b575449ca2902a11e2f4f1ba819d26015844eff774775d67b93c507e92d0b8f1");
   const walletIdentityPrivateKey = new Ont.Crypto.PrivateKey("61d553c5a07a26f1ebb8ff4035fb28757673b2e40a77c933af6816e1f5f5d0a5");
   const attr = new Ont.DDOAttribute();
   attr.key = claim.metadata.messageId;
   attr.type = 'JSON';
   attr.value = JSON.stringify({
     Type: 'JSON',
     Value: claim
   });
   const identity = "did:ont:AYmpvkUHi5GzkXbeMscrkkzGco9nyNGNjX";
   const account = "ANCF6qRbF5WvGKRRcZdKrcKah4FWiP34br";
   const address = new Ont.Crypto.Address(account);
   const tx = Ont.OntidContract.buildAddAttributeTx(identity, [attr], walletIdentityPrivateKey.getPublicKey(), gasPrice, gasLimit);
   tx.payer = address;
   Ont.TransactionBuilder.signTransaction(tx, walletPrivateKey);
   Ont.TransactionBuilder.addSign(tx, walletIdentityPrivateKey);
   const socketClient = new Ont.WebsocketClient(url);
   const res = await socketClient.sendRawTransaction(tx.serialize(), false, true);
   console.log(res);

 }

}
render() {
 return (
   <form onSubmit={this.handleSubmit}>
     <div className="category">
       <label htmlFor="name">Name</label>
       <input
         type="text"
         name="name"
         value={this.state.name}
         onChange={this.handleChange}
       />
     </div>

     <div className="category">
       <label htmlFor="number">SchoolNumber</label>
       <input
         type="text"
         name="schoolNumber"
         value={this.state.schoolNumber}

onChange={this.handleChange}
       />
     </div>

     <div className="ctaegory">
       <label htmlFor="id">Faculity</label>
       <input
         type="textarea"
         name="faculity"
         value={this.state.faculity}
         onChange={this.handleChange}
       />
     </div>

     <div className="category">
       <label htmlFor="number">SchoolCredit</label>
       <input
         type="textarea"
         name="qualifications"
         value={this.state.schoolCredit}
         onChange={this.handleChange}
       />
     </div>

     <button className="button" type="submit">
       登録
       </button>
   </form>
 );
}
}

export default Input;

メッセージ入力

ハッカソン へのメッセージ