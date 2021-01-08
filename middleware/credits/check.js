//========================================================================================================================================
// Required Models
//========================================================================================================================================
const    Credit                  = require('../../models/credit'), 
         Mongoose                = require('mongoose');




module.exports = function(req, res, next) {
//Get the Available credits for the user.

var requiredCredits = 1;

var id = req.user._id;
try {
Credit.aggregate([
    {$match:{ user: new Mongoose.Types.ObjectId(id) }},
    {$sort: {"_id": -1}},
    {
        "$group": {
            "_id": "$user",
            "total": {
                "$sum": "$value"
            }
        }

    }
], function (err, creditsTotals) {
    if (err) {
     console.log(err);
    } else {
       if (creditsTotals[0].total >= requiredCredits  ) {
        req.availableCredits= creditsTotals[0].total; 
        next();
       } else {
           res.redirect('/credits');
       }
            
    }
})
} catch (ex) {

 console.log('There was an error')
}
};