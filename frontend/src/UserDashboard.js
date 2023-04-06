import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
} from "@material-ui/core";
import "./dashboard.css";
import { NavLink } from "react-router-dom";

export default class UserFromMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleProductEditOpen = (data) => {
    this.setState({
      openProductEditModal: true,
      id: data._id,
      name: data.name,
      gender: data.gender,
      address: data.address,
      contact: data.contact,
      age: data.age,
      fileName: data.image,
    });
  };

  render() {
    // console.log(this.props.location.state.data)
    const { name, image, gender, empId, date, contact, age, address } =
      this.props.history.location.state.data;
    const alldata = this.props.history.location.state.data;

    return (
      <div className="userpage">
        <div>
          <img
            src={`http://localhost:2000/${image}`}
            alt="profile_image"
            loading="lazy"
            className="photosize"
          />
        </div>
        <div className="udash">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td className="lefttd">Name</td>
                <td className="righttd">{name}</td>
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
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className="dash">
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
        </div>
      </div>
    );
  }
}
