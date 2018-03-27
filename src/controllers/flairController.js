
const flairQueries = require("../db/queries.flair.js");


module.exports = {
  index(req, res, next){
    flairQueries.getAllFlairs( (err, flairs)=>{

        if(err){
          console.log(err);
          res.redirect(500, "static/index");
        } else {
          res.render("flair/index", {flairs});
        }
      }
    );
  },

  new(req, res, next){
    res.render("flair/new");
  },

  create(req, res, next){

    let newFlair = {
      name: req.body.name,
      color: req.body.color
    };
    /*
    let newTopic = {
      title: req.body.title,
      description: req.body.description
    };
    */
    flairQueries.addFlair(newFlair, (err, flair) => {
      if(err){
        res.redirect(500, "/flair/new");
      } else {
        res.redirect(303, `/flair/${flair.id}`);
      }
    });
  },
  show(req,res,next){

    flairQueries.getFlair(req.params.id, (err, flair)=>{
      if(err){
        res.redirect(404, "/flair");
      } else {
        res.render('flair/show', {flair});
      }
    })
  },
  edit(req,res,next){

    flairQueries.getFlair(req.params.id, (err, flair)=>{
      if(err || !flair){
        res.redirect(404, "/flair");
      } else {
        res.render('flair/edit', {flair});
      }
    })


  },
  update(req,res,next){
    //advertisementQueries.updateAdvertisement(req.params.id,req.query,(err,ad)=>{
    flairQueries.updateFlair(req.params.id,req.body,(err,flair)=>{
      if(err || !flair){
        res.redirect(404, `/flair/${req.params.id}/edit`);
      } else {
        res.redirect(`/flair/${req.params.id}`);
      }
    });
  },
  destroy(req,res, next){
    flairQueries.deleteFlair(req.params.id, (err,flair)=>{
      if(err){
        res.redirect(500, `/flair/${flair.id}`)
      } else {
        res.redirect(303, "/flair");
      }
    });
  }



}
