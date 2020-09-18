const mongoose = require('mongoose');

  var bloodStock  = new mongoose.Schema(
    {
        group_id: { type: Number },
        Blood_Group: { type: String }, 
        Donor_total_cell: { type: Number }, 
        Accepter_total_cell: { type: Number },
        Total_cells_available : { type: Number }, 
        category: { type: String },  
    }
  );
  

  var bloodStockDataModel = mongoose.model('bloodStock', bloodStock);
  module.exports =  bloodStockDataModel;