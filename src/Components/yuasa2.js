InputMyData.js

import React, { Component } from "react";
import "./css/App.css";

import { client } from "ontology-dapi";

class StudentForm extends Component {
 constructor() {
   super();
   this.state = {
     data: {
       Did: "",
       name: "",
       email: "",
       twitter: "",
       facebook: "",
       job: ""
     }
   };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleChange = async e => {
   var data = this.state.data;

   switch (e.target.name) {
     case "Did":
       data.Did = e.target.name;
       break;
     case "name":
       data.name = e.target.name;
       break;
     case "email":
       data.email = e.target.name;
       break;
     case "twitter":
       data.twitter = e.target.name;
       break;
     case "facebook":
       data.facebook = e.target.name;
       break;
     case "job":
       data.job = e.target.name;
       break;
   }

   this.setState({
     data: data
   });
 };

 render() {
   return (
     <form onSubmit={this.handleSubmit}>
       <div className="category">
         <label htmlFor="name">Did: </label>
         <input
           type="text"
           name="Did"
           value={this.state.Did}
           onChange={this.handleChange}
         />
       </div>
       <div className="category">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           name="name"
           value={this.state.name}
           onChange={this.handleChange}
         />
       </div>
       <div className="category">
         <label htmlFor="email">Email: </label>
         <input
           type="email"
           name="email"
           value={this.state.email}
           onChange={this.handleChange}
         />
       </div>
       <div className="category">
         <label htmlFor="twitter">Twitter: </label>
         <input
           type="text"
           name="twitter"
           value={this.state.twitter}
           onChange={this.handleChange}
         />
       </div>

       <div className="category">
         <label htmlFor="facebook">Facebook: </label>
         <input
           type="text"
           name="facebook"
           value={this.state.facebook}
           onChange={this.handleChange}
         />
       </div>
       <div className="category">
         <label htmlFor="job">Job: </label>
         <input
           type="text"
           name="job"
           value={this.state.job}
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

export default StudentForm;

メッセージ入力

ハッカソン へのメッセージ