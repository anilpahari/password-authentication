const logoutUser = (req, res) => {
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
};
module.exports = logoutUser;
