import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import contract from './property';
import './style.css';

class App extends Component {

state={
  manager : '',
  noofproperty:'0',
  address_to_be_alloted : '',
  property_to_be_alloted : '',
  message:'',
  receiverAddress:'',
  transferp:''
};

async componentDidMount(){
  const manager=await contract.methods.DA().call();
  const noofproperty=await contract.methods.totalNoOfProperty().call();


  this.setState({manager,noofproperty});
}

onSubmit=async (event)=>{
event.preventDefault();
const accounts=await web3.eth.getAccounts();

this.setState({message:"Waiting for the allotment to be confirmed on the Blockchain........"});

await contract.methods.allotProperty(this.state.address_to_be_alloted,this.state.property_to_be_alloted).send({
  from:accounts[0],gas:'3000000'});
this.setState({message:"Congrats your property has been alloted by DA."});
};

transfer=async (event)=>{
event.preventDefault();
const accounts=await web3.eth.getAccounts();

this.setState({message:"Waiting for the transfer to be confirmed on the Blockchain........"});

var res= await contract.methods.transferProperty(this.state.receiverAddress,this.state.transferp).send({
  from:accounts[0],gas:'3000000'},function(){});
this.setState({message:"Transaction successfully uploaded on Blockchain."});
//console.log(error);
};

  render() {
    //web3.eth.getAccounts().then(console.log);
    //contract.methods.allotProperty('0xbA931e5A8F3f6Dc707A15695da5a3E6a711F65A3','mq 21');
    //var DA='0xbA931e5A8F3f6Dc707A15695da5a3E6a711F65A3';
    return (

      <div>
      <h2>Welcome to Property Transfer using Smart Contracts.</h2>
      <p>This Contract is managed by: {this.state.manager}</p>
      <p>Total no of property undersigned by DA :  {this.state.noofproperty}</p>
      <hr />
      <p><h1>Transfer Properties on Secure Ethereum Blockchain</h1></p>

      <form onSubmit={this.onSubmit}>
      <h4> Hello DA here you can Allot Property for the Owners.</h4>
      <div><p>
        <label>Unique Id(ether address) </label>
        <input value={this.state.address_to_be_alloted}
        onChange={event=>this.setState({address_to_be_alloted:event.target.value})}
        /></p><p>
        <label>Property to be alloted: </label>
        <input value={this.state.property_to_be_alloted}
        onChange={event=>this.setState({property_to_be_alloted:event.target.value})}
        /></p>
      </div>
      <button>Allot the property</button>
      </form>
      <hr /><hr />


      <form onSubmit={this.transfer}>
      <h4> Here you can transfer your property to other people.</h4>
      <div><p>
      <label>Uinque id(ether address) of receiver.</label>
      <input value={this.state.receiverAddress}
      onChange={event=>this.setState({receiverAddress:event.target.value})}
      />
      </p>
      <p>
      <label>Your owned property to be transfer.</label>
      <input value={this.state.transferp}
      onChange={event=>this.setState({transferp:event.target.value})}
      />
      </p>
      </div><button>Transfer the Property</button>
      </form>


      <hr />
      <h2>Transaction Console</h2>
      <h4>{this.state.message}</h4>
      <hr />
      </div>
    );
  }
}

export default App;
