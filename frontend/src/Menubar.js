import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./menubar.css";
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

export default class Menubar extends React.Component {
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
      this.setState({ 
        token: token ,

      }, () => {
        this.getProduct();
      });
    }
  };

  showdetails = async () => {
    // console.log(this.state.empId,this.state.contact);
    await axios
      .post("http://localhost:2000/userLogin", {
        empId: this.state.empId,
        contact: this.state.contact,
      })
      .then((res) => {
        // console.log(res.data);
        this.setState({
          details: res.data,
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

  accountAdd = () =>{
    this.props.history.push('/addaccount');
  }
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
          products: res.data.products.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          pages: res.data.pages,
        });
      })
      .catch((err) => {
        swal({
          text: "Please add user first",
          icon: "error",
          type: "error",
          timer: 3000,
        });
        this.setState({ loading: false, products: [], pages: 0 }, () => {});
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
  render() {
    return (
      <div>
        <div className="menu">
          <div className="menulink">
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Home
          </Button>
          </div>
          <div className="menulink">
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.accountAdd}
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
        </div>
        <div>
          <TableContainer>
            {/* <TextField
              id="standard-basic"
              type="search"
              autoComplete="off"
              name="search"
              value={this.state.search}
              onChange={this.onChange}
              placeholder="Search by name"
              required
            /> */}
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Empolyee Id</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.products.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center">
                      <img
                        src={`http://localhost:2000/${row.image}`}
                        width="70"
                        height="70"
                      />
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.empId}</TableCell>
                    <TableCell align="center">
                      <Button
                        className="button_style"
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={(e) => {
                          console.log(row);
                          this.props.history.push({
                            pathname: "/userdashboard",
                            state: {
                              data: row,
                              
                            },
                          });
                        }}     
                      >
                        view Profile
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
      </div>
    );
  }
}
