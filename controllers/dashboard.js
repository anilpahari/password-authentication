const dashboard = (req, res) => {
  res.render("dashboard", { user: req.user.name });
};
module.exports = dashboard;
