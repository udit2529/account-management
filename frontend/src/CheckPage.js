import React, { Component } from 'react'
import { Button, TextField, Link } from "@material-ui/core";
import "./checkPage.css";

export default class CheckPage extends Component {
  render() {
    return (
      <div className='startingPage'>
        <h2>WHO YOU ARE ?</h2>
      
         <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
          >
         <Link href="/userLogin"><span style={{color:"white"}}>User Login</span></Link>
          </Button>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
          >
          <Link href="/log"><span style={{color:"white"}}>Admin Login</span></Link>
          </Button>
        
      </div>
    )
  }
}
