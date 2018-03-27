

const topicQueries = require("../db/queries.topic.js");
const flairQueries = require("../db/queries.flair.js");



module.exports = {
  index(req, res, next){
    topicQueries.getAllTopics((err, topics) => {
//#3
        if(err){
          console.log(err);
          res.redirect(500, "static/index");
        } else {
          res.render("topics/index", {topics});
          /*
          flairQueries.getAllFlairs((err,flairs) =>{
            if(err){
              res.redirect(500, "static/index");
            } else {
              res.render("topics/index", {topics}, {flairs});
            }
          });
          */
        }
      })
  },
  new(req, res, next){
    res.render("topics/new");
  },

  create(req, res, next){

    /*
    let newTopic = {
      title: req.body.title,
      description: req.body.description
    };
    */

    let newTopic = {
      title: req.body.title,
      description: req.body.description
    };

    topicQueries.addTopic(newTopic, (err, topic) => {
      if(err){
        res.redirect(500, "/topics/new");
      } else {
        res.redirect(303, `/topics/${topic.id}`);
      }
    });
  },

  show(req, res, next){
     topicQueries.getTopic(req.params.id, (err, topic) => {

       if(err || topic == null){
         console.log(err);
         res.redirect(404, "/");
       } else {
         res.render("topics/show", {topic});
       }
     });
   },

  destroy(req, res, next){

//     console.log(req.body.title);
     topicQueries.deleteTopic(req.params.id, (err, topic) => {
       if(err){
         res.redirect(500, `/topics/${topic.id}`)
       } else {
         res.redirect(303, "/topics");
       }
     });
   },

  edit(req, res, next){
      topicQueries.getTopic(req.params.id, (err, topic) => {
        if(err || topic == null){
          res.redirect(404, "/");
        } else {
          res.render("topics/edit", {topic});
        }
      });
  },

  update(req, res, next){
     //topicQueries.updateTopic(req.params.id, req.query, (err, topic) => {
     topicQueries.updateTopic(req.params.id, req.body, (err, topic) => {
       if(err || topic == null){
         res.redirect(404, `/topics/${req.params.id}/edit`);
       } else {
         res.redirect(`/topics/${topic.id}`);
       }
     });
  },



}
