//========================================================================================================================================
// Required Models
//========================================================================================================================================
const    Load                  = require('../../models/load'), 
         Mongoose                = require('mongoose');




module.exports = function(req, res, next) {
//Get the Available credits for the user.

var userid = req.user._id;
var loadid = req.params.load_id;




Load.findOne({ _id: loadid }).exec( function (err, foundLoad) {
    if (err) {
     console.log("err", err)
    } else {
     
        if (foundLoad.user != userid) {
            next()
        } else {
          res.redirect('/loads')  
        }
          


    }
});                     



};