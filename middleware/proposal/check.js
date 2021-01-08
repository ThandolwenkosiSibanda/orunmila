//========================================================================================================================================
// Required Models
//========================================================================================================================================
const    Proposal                  = require('../../models/proposal'), 
         Mongoose                = require('mongoose');




module.exports = function(req, res, next) {
//Get the Available credits for the user.



var userid = req.user._id;
var loadid = req.params.load_id;

Proposal.aggregate([{$match:{ user: new Mongoose.Types.ObjectId(userid) }},{$match:{ load: new Mongoose.Types.ObjectId(loadid)}}, {$sort: {"_id": -1}}
], function (err, foundProposal) {
        if (err) {
 console.log('err');
        } else {
        
         if (foundProposal === undefined || foundProposal.length == 0) {
            next();
         } else {
           res.redirect('/myproposals/'+ foundProposal[0]._id);
         }
         
        }
    });                        



};