import React, { Component } from "react";
import { Button, TextField, Link } from "@material-ui/core";
import "./checkPage.css";
// const imgMyimageexample = require("./nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg");
// const divStyle = {
//   backgroundImage: `url(${imgMyimageexample})`,
//         // backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         width: '100vw',
//         height: '100vh',
// };

export default class CheckPage extends Component {
  render() {
    return (
      <div className="startingPage">
        <div className="contentname">
          <Button
            className="button_style"
            variant="contained" 
            disableElevation
            color="primary"
            size="large"
            
          >
            <Link href="/userLogin">
              <span style={{ color: "white" }}>User Login</span>
            </Link>
          </Button>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="large"
          >
            <Link href="/log">
              <span style={{ color: "white" }}>Admin Login</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
