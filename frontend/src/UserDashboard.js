import React, { Component } from "react";
import { Button, TextField, Link } from "@material-ui/core";
import "./dashboard.css";
import { NavLink, Redirect } from "react-router-dom";

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 

  render() {
    console.log(this.props.location.state.data)
    const {name,image,gender,empId,date, contact, age, address} = this.props.location.state.data
      
    return (
      <div>
        <div className="userprofile">
            <h2>User Profile {empId}</h2>
        </div>
        <div className="udash">
        <div>  
              <img
                src={`http://localhost:2000/${image}`}
                alt="profile_image"
                loading="lazy"
              />
        </div>
        <div>
             <table>

                <thead>
                
                </thead>
                <tbody>
                <tr>
                    <td className="lefttd">Name</td>
                    <td className="righttd">{name.charAt(0).toUpperCase()+name.slice(1)}</td>
                </tr>
                <tr>
                    <td className="lefttd">DOB</td>
                    <td className="righttd">{age}</td>
                </tr>
                <tr>
                    <td className="lefttd">Employee ID</td>
                    <td className="righttd">{empId}</td>
                </tr>
                <tr>
                    <td className="lefttd">Gender</td>
                    <td className="righttd">{gender}</td>
                </tr>
                <tr>
                    <td className="lefttd">Contact</td>
                    <td className="righttd">{contact}</td>
                </tr>
                <tr>
                    <td className="lefttd">Address</td>
                    <td className="righttd">{address}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td></td>
                  <td>
                    <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                disabled={this.state.empId == "" && this.state.contact == ""}
                // onClick={this.homepage}
              >
                <NavLink to='/' style={{color:'white',textDecoration:'none'}}>Home</NavLink>
              </Button>
                  </td>
                </tr>
                </tfoot>
            </table>

        </div>
      </div>
      </div>
    );
  }
}
