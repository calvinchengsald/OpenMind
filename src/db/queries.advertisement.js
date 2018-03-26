const Advertisement = require("./models").Advertisement;

module.exports = {

  getAllTopics(callback){
    return Advertisement.all()
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addAdvertisement(newAd, callback){
    return Advertisement.create({
      title: newAd.title,
      description: newAd.description
    }).then((ad)=>{
      callback(null, ad);
    }).catch((error)=>{
      callback(error);
    })
  },
  getAdvertisement(id,callback){
    return Advertisement.findById(id)
    .then((ad)=>{
      callback(null,ad);
    }).catch( (error)=>{
      callback(error);
    })
  }
}
