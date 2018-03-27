const Advertisement = require("./models").Advertisement;

module.exports = {

  getAllAdvertisement(callback){
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
  },

  updateAdvertisement(id, newAd, callback){
    return Advertisement.findById(id)
    .then((ad)=>{
      if(!ad){
        return callback("Ad not found");
      }
      ad.update(newAd, {
        fields: Object.keys(newAd)
      })
      .then(() => {
        callback(null, ad);
      })
      .catch((err) => {
        callback(err);
      });

    }).catch ((error)=>{
      callback(error);
    })
  },

  deleteAdvertisement(id, callback){
    return Advertisement.destroy({
      where: {id}
    })
    .then((ad) => {
      callback(null, ad);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
