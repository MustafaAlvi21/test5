const express = require ('express');
const router = express.Router();
const donorDataModel = require ('../modules/DB_req_donation')
const accepterDataModel = require ('../modules/DB_blood_request')
const bloodStockDataModel = require ('../modules/DB_blood_stock')
const path = require('path');
const { ensureAuthenticated } = require('../config/auth')
const { userRoleAuth } = require('../config/userRoleCheck')


  

  router.get('/', userRoleAuth, (req, res) => {
  const Blood_Group123 = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  for (let i = 0; i < Blood_Group123.length; i++) {

    donorDataModel.aggregate(
      [{
          $match : {'Status' : "Accepted", 'Blood_Group': Blood_Group123[i]}
      } , {
          $group : {'_id': '$Blood_Group123[i]', 'Donor_total_cell': {$sum: '$Blood_Cell'}}
        }] ).exec(function(err,data1){
          if(data1 == ''){
             return 
          }
          bloodStockDataModel.findOneAndUpdate({Blood_Group: Blood_Group123[i]},{
            Donor_total_cell: data1[0].Donor_total_cell
          }).exec(function (data2) {           
          })  //  bloodStockDataModel END         
        });  // donorDataModel END 

//     =============================================================================

        accepterDataModel.aggregate(
          [{
              $match : {'Status' : "Accepted", 'Blood_Group': Blood_Group123[i]}
          } , {
              $group : {'_id': '$Blood_Group123[i]', 'Accepter_total_cell': {$sum: '$Blood_Cell'}}
            }] ).exec(function(err,data1){
              if(data1 == ''){
                 return 
              }
              bloodStockDataModel.findOneAndUpdate({Blood_Group: Blood_Group123[i]},{
                Accepter_total_cell: data1[0].Accepter_total_cell
              }).exec(function (data2) {           
              })  //  bloodStockDataModel END         
            });  // accepterDataModel END 
        
            bloodStockDataModel.find({group_id : i+1}).exec(function(err, asd){
              bloodStockDataModel.findOneAndUpdate({group_id : i+1}, {
                Total_cells_available : parseInt(asd[0].Donor_total_cell)  - (parseInt(asd[0].Accepter_total_cell))
              }).exec(function(err, data123){
              })
              // console.log('Total of result ' + (i+1) + ' is ' + parseInt(asd[0].Donor_total_cell)  - (parseInt(asd[0].Accepter_total_cell))))
            })
          }    // LOOP END   
         
         bloodStockDataModel.find({}).exec( function(err, results){
          
          if (req.user == undefined) {
            console.log('not login')
            return  res.render('B-bloodStock', { title : 'Blood Stock', data : results,  })
          }

          res.render('B-bloodStock', { title : 'Blood Stock', loginUser: req.user.Username, data : results,  })

         } )
      })    // ROUTER END 
    
    
    module.exports = router