
const advertisementQueries = require("../db/queries.advertisement.js");


module.exports = {
  index(req, res, next){
    advertisementQueries.getAllTopics( (err, advertisements)=>{

        if(err){
          console.log(err);
          res.redirect(500, "static/index");
        } else {
          res.render("advertisement/index", {advertisements});
        }
      }
    );
  },

  new(req, res, next){
    res.render("advertisement/new");
  },

  create(req, res, next){

    let newAdvertisement = {
      title: req.query.title,
      description: req.query.description
    };
    /*
    let newTopic = {
      title: req.query.title,
      description: req.query.description
    };
    */
    advertisementQueries.addAdvertisement(newAdvertisement, (err, advertisement) => {
      if(err){
        res.redirect(500, "/advertisement/new");
      } else {
        res.redirect(303, `/advertisement/${advertisement.id}`);
      }
    });
  },
  show(req,res,next){

    advertisementQueries.getAdvertisement(req.params.id, (err, advertisement)=>{
      if(err){
        res.redirect(404, "/advertisement");
      } else {
        res.render('advertisement/show', {advertisement});
      }
    })
  }


}
