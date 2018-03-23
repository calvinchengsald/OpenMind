
module.exports = {
  index(req, res, next){
    res.render("static/index", {title: "About Us"});
  }
}
