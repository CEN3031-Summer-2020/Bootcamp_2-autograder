//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

export default {
  db: {
    uri: 'mongodb://127.0.0.1:27017/local', //place the URI of your mongo database here.
  }
};