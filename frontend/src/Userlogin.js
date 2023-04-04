import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import "./logi.css";
import UserDashboard from "./UserDashboard";
import { NavLink } from "react-router-dom";

const axios = require("axios");

export default class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: "",
      contact: "",
      details: [],
    };
  }

  onChange = (e) =>
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      console.log(e.target.value)
    );

  usercall = (data) => {
    console.log(data);
  };

  userLogin = async () => {
    // console.log(this.state.empId,this.state.contact);
    await axios
      .post("http://localhost:2000/userLogin", {
        empId: this.state.empId,
        contact: this.state.contact,
      })
      .then((res) => {
        this.setState({
          details: res.data.data,
        });

        this.props.history.push({
          pathname: "/userdashboard",
          state: {
            data: this.state.details,
          },
        });
        //  this.usercall(this.state.details);

        // <UserDashboard name={name} empId={empId} gender={gender} contact={contact} address={address} image={image} age={age}/>
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: "Invalid Employee ID",
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
          <h2> User Login</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="empId"
            value={this.state.empId}
            onChange={this.onChange}
            placeholder="Employee Id"
            required
          />
          <br />
          <br />
          <TextField
            id="standard-basic"
            type="contact"
            autoComplete="off"
            name="contact"
            value={this.state.contact}
            onChange={this.onChange}
            placeholder="Contact"
            required
          />
          <br />
          <br />
          <div className="space2">
            <div className="reg">
              <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                disabled={this.state.empId == "" && this.state.contact == ""}
                onClick={this.userLogin}
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

            {/* <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="small"
              disabled={this.state.empId == "" && this.state.contact == ""}
              // onClick={this.homepage}
            >
              <NavLink
                to="/"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </NavLink>
            </Button> */}
          </div>
        </div>
      </div>
    );
  }
}
