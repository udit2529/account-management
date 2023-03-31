var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var multer = require("multer"),
  bodyParser = require("body-parser"),
  path = require("path");
var mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/productDB");
var fs = require("fs");
var product = require("./model/product.js");
var user = require("./model/user.js");
const { check, validationResult } = require("express-validator/check");
const trimRequest = require("trim-request");

var dir = "./uploads";
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
});
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false,
  })
);

app.use("/", (req, res, next) => {
  try {
    if (
      req.path == "/login" ||
      req.path == "/register" ||
      req.path == "/" ||
      req.path == "/log" ||
      req.path == "/userLogin"
    ) {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, "shhhhh11111", function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: "User unauzed!",
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

// app.use("/userLogin",async (req, res,next) => {
//   console.log(req.body.empId)

//       try {
//         const user = await product.findOne({empId:req.body.empId});
//         if(!user)
//         {
//           res.status(404).json({success:false,message:"Not found"})
//           next();
//         }
//         else{
//           console.log(user);
//           res.status(200).send("user middleware");
//           next();

//         }
//       } catch (error) {
//         res.status(500).json({success:false,message:"Server Error"})
//         next();

//       }
// try {
//   if (req.path == "/userLogin") {
//     next();
//   } else {
//     return res.status(401).json({
//       errorMessage: "User unauthorized!",
//       status: false,
//     });
//   }
// } catch (e) {
//   res.status(400).json({
//     errorMessage: "Something went wrong!",
//     status: false,
//   });
// }
// });

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: "Apis",
  });
});

/* login api */
app.post("/login", (req, res) => {
  try {
    if (req.body && req.body.email && req.body.password) {
      user.find({ email: req.body.email }, (err, data) => {
        if (data.length > 0) {
          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: "Email or password is incorrect!",
              status: false,
            });
          }
        } else {
          res.status(400).json({
            errorMessage: "Email or password is incorrect!",
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

//userLogin api
app.post("/userLogin", async (req, res) => {
  console.log(req.body);
    try {
      const id = req.body.empId;
      console.log(id);
      const prod = await product.findOne({ empId: id });
      console.log(JSON.stringify(prod));
      if (!prod) {
        res.status(400).json({ success: false, message: "Not Found" });
      } else {
        const contact = req.body.contact;
        if (contact !== prod.contact) {
          res
            .status(400)
            .json({ success: false, message: "invalid credentials" });
        } else {
          res.status(200).json({ success: true, data: prod });
        }    
      }
    } catch (error)
    {
      res.status(500).send("Internal Server Error")
    }
});
    // if (req.body && req.body.empId && req.body.contact) {
    //   product.findOne({ empId: req.body.empId }, (err, data) => {
    //     if (data.length > 0) {
    //       const con = data.contact;
    //       if (req.body.contact === con) {
    //         res.status(200).json({
    //           status: true,
    //           title: "Login successfully.",
    //         });
    //       } else {
    //         res.status(400).json({
    //           errorMessage: "Enter Correct Contact!",
    //           status: false,
    //         });
    //       }
    //     } else {
    //       res.status(400).json({
    //         errorMessage: "Enter Correct Empolyee Id!",
    //         status: false,
    //       });
    //     }
    //   });
    // } else {
    //   res.status(400).json({
    //     errorMessage: "Add proper parameter first!",
    //     status: false,
    //   });
    // }
  // } catch (e) {
  //   res.status(400).json({
  //     errorMessage: "Something went wrong!",
  //     status: false,
  //   });


/* register api */
app.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password && req.body.email) {
      user.find({ email: req.body.email }, (err, data) => {
        if (data.length == 0) {
          let User = new user({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              res.status(200).json({
                status: true,
                title: "Registered Successfully.",
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false,
            message: "user error",
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.username, id: data._id },
    "shhhhh11111",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: "Login Successfully.",
          token: token,
          status: true,
        });
      }
    }
  );
}

/* Api to add Product */
app.post("/add-product", upload.any(), (req, res) => {
  try {
    if (
      req.files &&
      req.body &&
      req.body.name &&
      req.body.gender &&
      req.body.contact &&
      req.body.age &&
      req.body.address &&
      req.body.empId
    ) {
      let new_product = new product();
      new_product.name = req.body.name;
      new_product.empId = req.body.empId;
      new_product.gender = req.body.gender;
      new_product.contact = req.body.contact;
      new_product.address = req.body.address;
      new_product.image = req.files[0].filename;
      new_product.age = req.body.age;
      new_product.user_id = req.user.id;
      new_product.save((err, data) => {
        if (err) {
          res.status(400).json({
            errorMessage: err,
            status: false,
          });
        } else {
          res.status(200).json({
            status: true,
            title: "Product Added successfully.",
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* Api to update Product */
app.post("/update-product", upload.any(), (req, res) => {
  try {
    if (
      req.files &&
      req.body &&
      req.body.name &&
      req.body.gender &&
      req.body.contact &&
      req.body.id &&
      req.body.age &&
      req.body.address
    ) {
      product.findById(req.body.id, (err, new_product) => {
        // if file already exist than remove it
        if (
          req.files &&
          req.files[0] &&
          req.files[0].filename &&
          new_product.image
        ) {
          var path = `./uploads/${new_product.image}`;
          fs.unlinkSync(path);
        }

        if (req.files && req.files[0] && req.files[0].filename) {
          new_product.image = req.files[0].filename;
        }
        if (req.body.name) {
          new_product.name = req.body.name;
        }
        if (req.body.gender) {
          new_product.gender = req.body.gender;
        }
        if (req.body.contact) {
          new_product.contact = req.body.contact;
        }
        if (req.body.age) {
          new_product.age = req.body.age;
        }
        if (req.body.address) {
          new_product.address = req.body.address;
        }

        new_product.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false,
            });
          } else {
            res.status(200).json({
              status: true,
              title: "Product updated.",
            });
          }
        });
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* Api to delete Product */
app.post("/delete-product", (req, res) => {
  try {
    if (req.body && req.body.id) {
      product.findByIdAndUpdate(
        req.body.id,
        { is_delete: true },
        { new: true },
        (err, data) => {
          if (data.is_delete) {
            res.status(200).json({
              status: true,
              title: "Product deleted.",
            });
          } else {
            res.status(400).json({
              errorMessage: err,
              status: false,
            });
          }
        }
      );
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/*Api to get and search product with pagination and search by name*/
app.get("/get-product", (req, res) => {
  try {
    var query = {};
    query["$and"] = [];
    query["$and"].push({
      is_delete: false,
      user_id: req.user.id,
    });
    if (req.query && req.query.search) {
      query["$and"].push({
        name: { $regex: req.query.search },
      });
    }
    var perPage = 5;
    var page = req.query.page || 1;
    product
      .find(query, {
        date: 1,
        empId: 1,
        name: 1,
        id: 1,
        gender: 1,
        address: 1,
        contact: 1,
        age: 1,
        image: 1,
      })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .then((data) => {
        product
          .find(query)
          .count()
          .then((count) => {
            if (data && data.length > 0) {
              res.status(200).json({
                status: true,
                title: "Product retrived.",
                products: data,
                current_page: page,
                total: count,
                pages: Math.ceil(count / perPage),
              });
            } else {
              res.status(400).json({
                errorMessage: "There is no product!",
                status: false,
              });
            }
          });
      })
      .catch((err) => {
        res.status(400).json({
          errorMessage: err.message || err,
          status: false,
        });
      });
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
