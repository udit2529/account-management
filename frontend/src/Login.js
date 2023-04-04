import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import "./logi.css";
import Input from "@material-ui/core/Input/Input";
import { NavLink } from "react-router-dom";
const axios = require("axios");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  showPassowordHint = (e) => {
    document.getElementsByClassName("passwordInputField")[0].style.display =
      "block";
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {
    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios
      .post("http://localhost:2000/login", {
        email: this.state.email,
        password: pwd,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: "Invalid Email",
            icon: "error",
            type: "error",
            timer: 3000,
          });
        }
      });
  };

  render() {
    return (
      <div style={{ marginTop: "200px" }}>
        <div>
          <h2> Admin Login</h2>
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
          <br />
          <br />
          <Input
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            onFocus={this.showPassowordHint}
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />

          <br />
          <br />
          <div className="passwordInputField">
            <Alert severity="info">
              Minimum 6 words password :
              <ul className="passwordBox">
                <li>Uppercase letters: A-Z</li>
                <li>Lowercase letters: a-z</li>
                <li>Special Character : !@#$%^&*</li>
                <li>Numbers: 0-9</li>
              </ul>
            </Alert>
          </div>

          <br />
          <div className="passwordInputField"></div>
          <br />
          <div className="space2">
            <div className="reg">
              <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                disabled={this.state.email == "" && this.state.password == ""}
                onClick={this.login}
              >
                Login
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
              >
                <NavLink
                to="/"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </NavLink>
              </Button>
            </div>
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            {/* <br></br> */}
            {/* <div className="reg">
              <Link href="/register">Register</Link>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
