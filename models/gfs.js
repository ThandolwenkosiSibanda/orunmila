var mongoose = require('mongoose');


// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================




var GFSSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
      },
    from: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
      },
    estimatedWeight: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
      },
    estimatedBudget: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
      },
    description: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 100
      },
    proposals:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal"
  }]
});



module.exports = mongoose.model('GFS',GFSSchema);