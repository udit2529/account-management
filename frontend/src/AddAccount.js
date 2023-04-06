
import React, { Component } from 'react'
import './addaccount.css'
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
//   import { Pagination } from "@material-ui/lab";
  import swal from "sweetalert";
const axios = require("axios");

export default class AddAccount extends Component {

    constructor() {
        super();
        this.state = {
          token: "",
          openProductModal: false,
          openProductEditModal: false,
          id: "",
          empId: "",
          name: "",
          gender: "",
          contact: "",
          age: "",
          address: "",
          file: "",
          fileName: "",
        //   page: 1,
        //   search: "",
          products: [],
        //   pages: 0,
          loading: false,
        };
      }

    handleProductOpen = () => {
    this.setState({
      openProductModal: true,
      id: "",
      empId: "",
      name: "",
      gender: "",
      contact: "",
      age: "",
      address: "",
      fileName: "",
    });
  };

    handleProductClose = () => {
    this.setState({ openProductModal: false });
  };
  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => {});
    }
    this.setState({ [e.target.name]: e.target.value }, () => {});
    // if (e.target.name == "search") {
    //   this.setState({ page: 1 }, () => {
    //     this.getProduct();
    //   });
    // }
  };
  render() {
    return (
      <div>
        <p>hello</p>
        <div className='adduser'>
        <div>
       
        </div>
        <div>

        </div>
        </div>

          {/* <Dialog
          open={this.state.openProductModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          
          <DialogContent>
            <DialogTitle>Name</DialogTitle>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Name"
              fullWidth
              required
            />
            <br />
            <DialogTitle>Empolyee Id</DialogTitle>
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="empId"
              value={this.state.empId}
              onChange={this.onChange}
              placeholder="Empolyee Id"
              required
              fullWidth
            />
            <br />
            <DialogTitle>Gender</DialogTitle>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={this.state.gender}
              onChange={this.onChange}
              row
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {/* <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="gender"
              value={this.state.gender}
              onChange={this.onChange}
              placeholder="Gender"
              fullWidth
              required
            /> */}
            {/* <br />
            <DialogTitle>Contact</DialogTitle>
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="contact"
              value={this.state.contact}
              onChange={this.onChange}
              placeholder="Contact"
              fullWidth
              required
            />
            <br />
            <DialogTitle>Date of birth</DialogTitle>
            <TextField
              id="standard-basic"
              type="date"
              autoComplete="off"
              name="age"
              value={this.state.age}
              onChange={this.onChange}
              placeholder="Age"
              fullWidth
              required
            />
            <br />
            <DialogTitle>Address</DialogTitle>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Address"
              required
              fullWidth
            />
            <br />
            <br />
            <Button variant="contained" component="label">
              {" "}
              Upload Photo
              <input
                id="standard-basic"
                type="file"
                accept="image/*"
                // inputProps={{
                //   accept: "image/*"
                // }}
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
                required
              />
            </Button>
            &nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={
                this.state.name == "" ||
                this.state.gender == "" ||
                this.state.age == "" ||
                this.state.contact == "" ||
                this.state.address == "" ||
                this.state.empId == "" ||
                this.state.file == null
              }
              onClick={(e) => this.addProduct()}
              color="primary"
              autoFocus
            >
              Add Account
            </Button>
          </DialogActions>
        </Dialog> */} 

      </div>
    )
  }
}
