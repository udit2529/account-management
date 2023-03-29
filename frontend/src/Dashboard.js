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
import { Pagination } from "@material-ui/lab";
import swal from "sweetalert";
const axios = require("axios");

function ValidateName(inputText) {
  var nameformat = /^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{3,29}$/;
  if (inputText.match(nameformat)) {
    return true;
  } else {
    return false;
  }
}

function ValidateAge(inputText) {
  var ageformat = /^\d{2}$/;
  if (inputText.match(ageformat)) {
    return true;
  } else {
    return false;
  }
}

// function ValidateContact(inputText) {
//   var contactformat = /^[0-9]*{,10}$/;
//   if (inputText.match(contactformat)) {
//     return true;
//   } else {
//     return false;
//   }
// }

function ValidateContact(inputText)
{
  var contactformat = /^\d{10}$/;
  if(inputText.match(contactformat))
        {
      return true;
        }
      else
        {
        return false;
        }
}

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      openProductModal: false,
      openProductEditModal: false,
<<<<<<< HEAD
      id: '',
      name: '',
      gender: '',
      contact: '',
      age: '',
      address: '',
      file: '',
      fileName: '',
=======
      id: "",
      name: "",
      gender: "",
      contact: "",
      age: "",
      file: "",
      fileName: "",
>>>>>>> master
      page: 1,
      search: "",
      products: [],
      pages: 0,
      loading: false,
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    } else {
      this.setState({ token: token }, () => {
        this.getProduct();
      });
    }
  };

  getProduct = () => {
    this.setState({ loading: true });

    let data = "?";
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios
      .get(`http://localhost:2000/get-product${data}`, {
        headers: {
          token: this.state.token,
        },
      })
      .then((res) => {
        this.setState({
          loading: false,
          products: res.data.products,
          pages: res.data.pages,
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.setState({ loading: false, products: [], pages: 0 }, () => {});
      });
  };

  deleteProduct = (id) => {
    axios
      .post(
        "http://localhost:2000/delete-product",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: this.state.token,
          },
        }
      )
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        this.setState({ page: 1 }, () => {
          this.pageChange(null, 1);
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getProduct();
    });
  };

  logOut = () => {
    localStorage.setItem("token", null);
    this.props.history.push("/");
  };

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => {});
    }
    this.setState({ [e.target.name]: e.target.value }, () => {});
    if (e.target.name == "search") {
      this.setState({ page: 1 }, () => {
        this.getProduct();
      });
    }
  };

  addProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
<<<<<<< HEAD
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('gender', this.state.gender);
    file.append('address', this.state.address);
    file.append('age', this.state.age);
    file.append('contact', this.state.contact);

    let validage = ValidateAge(this.state.age);
    let validname = ValidateName(this.state.name);
    let validcontact = ValidateContact(this.state.contact);
    if (validname) {
      if (validcontact) {
        if (validage) {
          axios.post('http://localhost:2000/add-product', file, {
            headers: {
              'content-type': 'multipart/form-data',
              'token': this.state.token
            }
          }).then((res) => {
            swal({
              text: res.data.title,
              icon: "success",
              type: "success"
            });
            this.handleProductClose();
            this.setState({ name: '', gender: '', age: '', address: '', contact: '', file: null, page: 1 }, () => {
              this.getProduct();
            });
          }).catch((err) => {
            swal({
              text: err.response.data.errorMessage,
              icon: "error",
              type: "error"
            });
            this.handleProductClose();
          });
        } else{
          swal({
            text: "Age is not valid (Must be 2 Digit)",
            icon: "error",
            type: "error",
            timer:3000
          });
        }
      } else {
        swal({
          text: "Number is not valid (Must be 10 Digit)",
          icon: "error",
          type: "error",
          timer:3000
        });
  
      }
    } else {
      swal({
        text: "Name is not valid",
        icon: "error",
        type: "error",
        timer:3000
      });
    }
   
    

 

  }
=======
    file.append("file", fileInput.files[0]);
    file.append("name", this.state.name);
    file.append("gender", this.state.gender);
    file.append("age", this.state.age);
    file.append("contact", this.state.contact);

    axios
      .post("http://localhost:2000/add-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.handleProductClose();
        this.setState(
          { name: "", gender: "", age: "", contact: "", file: null, page: 1 },
          () => {
            this.getProduct();
          }
        );
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.handleProductClose();
      });
  };
>>>>>>> master

  updateProduct = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
<<<<<<< HEAD
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('gender', this.state.gender);
    file.append('address', this.state.address);
    file.append('age', this.state.age);
    file.append('contact', this.state.contact);
=======
    file.append("id", this.state.id);
    file.append("file", fileInput.files[0]);
    file.append("name", this.state.name);
    file.append("gender", this.state.gender);
    file.append("age", this.state.age);
    file.append("contact", this.state.contact);
>>>>>>> master

    axios
      .post("http://localhost:2000/update-product", file, {
        headers: {
          "content-type": "multipart/form-data",
          token: this.state.token,
        },
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

<<<<<<< HEAD
      this.handleProductEditClose();
      this.setState({ name: '', gender: '', age: '', address: '', contact: '', file: null }, () => {
        this.getProduct();
=======
        this.handleProductEditClose();
        this.setState(
          { name: "", gender: "", age: "", contact: "", file: null },
          () => {
            this.getProduct();
          }
        );
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        this.handleProductEditClose();
>>>>>>> master
      });
  };

  handleProductOpen = () => {
    this.setState({
      openProductModal: true,
<<<<<<< HEAD
      id: '',
      name: '',
      gender: '',
      contact: '',
      age: '',
      address: '',
      fileName: ''
=======
      id: "",
      name: "",
      gender: "",
      contact: "",
      age: "",
      fileName: "",
>>>>>>> master
    });
  };

  handleProductClose = () => {
    this.setState({ openProductModal: false });
  };

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

  handleProductEditClose = () => {
    this.setState({ openProductEditModal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>Dashboard</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleProductOpen}
          >
            Add Account
          </Button>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit Product */}
        <Dialog
          open={this.state.openProductEditModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Edit Account</DialogTitle>
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
              required
              fullWidth
            /> */}
            <br />
            <DialogTitle>Contact</DialogTitle>
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="contact"
              value={this.state.contact}
              onChange={this.onChange}
              placeholder="Contact"
              required
              fullWidth
            />
            <br />
            <DialogTitle>Date of birth</DialogTitle>
            <TextField
              id="standard-basic"
<<<<<<< HEAD
              type="text"
              autoComplete="off"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Address"
              multiline
              row={2}
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
=======
              type="date"
>>>>>>> master
              autoComplete="off"
              name="age"
              value={this.state.age}
              onChange={this.onChange}
              placeholder="Date of birth"
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
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id = "fileInput"
                placeholder="File"
                hidden
              />
            </Button>
            &nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleProductEditClose} color="primary">
              Cancel
            </Button>
            <Button
<<<<<<< HEAD
              disabled={this.state.name == '' || this.state.gender == '' || this.state.age == '' || this.state.contact == '' || this.state.address == ''}
              onClick={(e) => this.updateProduct()} color="primary" autoFocus>
=======
              disabled={
                this.state.name == "" ||
                this.state.gender == "" ||
                this.state.age == "" ||
                this.state.contact == ""
              }
              onClick={(e) => this.updateProduct()}
              color="primary"
              autoFocus
            >
>>>>>>> master
              Edit Account
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Product */}
        <Dialog
          open={this.state.openProductModal}
          onClose={this.handleProductClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Add Account</DialogTitle>
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
            <br />
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
<<<<<<< HEAD
            /><br />
             <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Address"
              multiline
              row={2}
              required
            /><br />
=======
            />
            <br />
            <DialogTitle>Date of birth</DialogTitle>
>>>>>>> master
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
            <br />
            <Button variant="contained" component="label">
              {" "}
              Upload Photo
              <input
                id="standard-basic"
                type="file"
                accept="image/*"
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
<<<<<<< HEAD
              disabled={this.state.name == '' || this.state.gender == '' || this.state.age == '' || this.state.contact == '' || this.state.address == '' || this.state.file == null}
              onClick={(e) => this.addProduct()} color="primary" autoFocus>
=======
              disabled={
                this.state.name == "" ||
                this.state.gender == "" ||
                this.state.age == "" ||
                this.state.contact == "" ||
                this.state.file == null
              }
              onClick={(e) => this.addProduct()}
              color="primary"
              autoFocus
            >
>>>>>>> master
              Add Account
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <TextField
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by name"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Contact</TableCell>
<<<<<<< HEAD
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Address</TableCell>
=======
                <TableCell align="center">DOB</TableCell>
>>>>>>> master
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={`http://localhost:2000/${row.image}`}
                      width="70"
                      height="70"
                    />
                  </TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.contact}</TableCell>
                  <TableCell align="center">{row.age}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.handleProductEditOpen(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deleteProduct(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination
            count={this.state.pages}
            page={this.state.page}
            onChange={this.pageChange}
            color="primary"
          />
        </TableContainer>
      </div>
    );
  }
}
