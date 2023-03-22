import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{
return true;
}
else
{
return false;
}
}

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirm_password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

 register = () => {
let validemail=ValidateEmail(this.state.email)
if(validemail){
  axios.post('http://localhost:2000/register', {
  email: this.state.email,
  username: this.state.username,
  password: this.state.password,
}).then((res) => {
  swal({
    text:"User Registered Sucessfully",
    icon: "success",
    type: "success",
    timer:3000
  });
  this.props.history.push('/');
}).catch((err) =>{
  console.log(err)
  swal({
    text:"User does not Exist",
    icon: "error",
    type: "error",
    timer:3000
  });
});
}
else{
  swal({
    text:"Invalid Email",
    icon: "error",
    type: "error",
    timer:3000
  });
}

    
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
        <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email"
            required
          />
          <br /> <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' || this.state.password === ''  || this.state.email === '' || this.state.confirm_password === ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
