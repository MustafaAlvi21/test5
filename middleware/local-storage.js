//  N o t    W o r k i n g 

const express = require ('express');
const router = express.Router();

// settingUp local-storage
if(typeof localStorage === 'undefined' || localStorage === null){
    var localStorage = require('node-localstorage').LocalStorage;
    localStorage = new localStorage('./scratch');
  }