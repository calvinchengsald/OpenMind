
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
      title: req.body.title,
      description: req.body.description
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
  },
  edit(req,res,next){

    advertisementQueries.getAdvertisement(req.params.id, (err, advertisement)=>{
      if(err || !advertisement){
        res.redirect(404, "/advertisement");
      } else {
        res.render('advertisement/edit', {advertisement});
      }
    })


  },
  update(req,res,next){
    advertisementQueries.updateAdvertisement(req.params.id,req.query,(err,ad)=>{
      if(err || !ad){
        res.redirect(404, `/advertisement/${req.query.id}/edit`);
      } else {
        res.redirect(`/advertisement/${req.query.id}`);
      }
    });
  },
  destroy(req,res, next){
    advertisementQueries.deleteAdvertisement(req.params.id, (err,ad)=>{
      if(err){
        res.redirect(500, `/advertisement/${topic.id}`)
      } else {
        res.redirect(303, "/advertisement");
      }
    });
  }



}
