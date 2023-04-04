import React, { Component } from "react";
import "./dashboard.css";
const name = 'Ravi Kant Chauhan'
const em = 100409;
const gender = 'male'
const contack = '9119341428'
const dob = '22/07/2000'
const address = 'titira uchahuwan azamgarh up'



export default class UserDashboard extends Component {
  

  render() {
    console.log(this.props.name);
    return (
      <div>
        <div className="userprofile">
            <h2>User Profile {em}</h2>
        </div>
        <div className="udash">
        <div>  
              <img
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="profile_image"
                loading="lazy"
              />
        </div>
        <div>
             <table>
                <tr>
                    <td className="lefttd">Name</td>
                    <td className="righttd">{name}</td>
                </tr>
                <tr>
                    <td className="lefttd">DOB</td>
                    <td className="righttd">{dob}</td>
                </tr>
                <tr>
                    <td className="lefttd">Employee ID</td>
                    <td className="righttd">{em}</td>
                </tr>
                <tr>
                    <td className="lefttd">Gender</td>
                    <td className="righttd">{gender}</td>
                </tr>
                <tr>
                    <td className="lefttd">Contact</td>
                    <td className="righttd">{contack}</td>
                </tr>
                <tr>
                    <td className="lefttd">Address</td>
                    <td className="righttd">{address}</td>
                </tr>
            </table>

        </div>
      </div>
      </div>
    );
  }
}
