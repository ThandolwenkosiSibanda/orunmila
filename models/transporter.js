var mongoose = require('mongoose');


// ==========================================================================================================================================
// 1. Define The Schema For the Job Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================
var TransporterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },

    idNo: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 50
      },
    address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 500
      },
    town: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 100
      },
    avatar: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 100
      },
    status: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 100
      },
    proposals:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal"
    }],
    loads:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Load"
  }]


});




module.exports = mongoose.model('Transporter',TransporterSchema);