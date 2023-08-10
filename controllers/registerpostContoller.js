const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
  let { name, email, password, password2 } = req.body;
  // await userModel.insertMany({
  //   name: name,
  //   email: email,
  //   password: password,
  // });
  let errors = [];
  if (password.length < 6) {
    errors.push({ msg: "Password must be atleast greater than 6 character." });
  }
  if (password != password2) {
    errors.push({ msg: "Password do not match" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation
    await userModel.findOne({ email: email }).then((user) => {
      errors.push({ msg: "Email already exit.." });
      if (user) {
        //user exut
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUserModel = new userModel({
          name,
          email,
          password,
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUserModel.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hashed
            newUserModel.password = hash;
            newUserModel
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are registered and can log in now."
                );
                res.redirect("./login");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    });
  }
};
module.exports = registerUser;
