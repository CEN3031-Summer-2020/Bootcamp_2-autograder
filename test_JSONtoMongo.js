// To learn more about the Jest testing framework, please follow the link below! Google is your friend.
//Check out - https://jestjs.io/docs/en/


import mongoose from 'mongoose'
import Listing from './ListingSchema.js'
import config from './config.js'
import * as fs from 'fs'

let listing = {
    code: "LBWEST",
    name: "Library West",
    coordinates: {
        latitude: 29.6508246,
        longitude: -82.3417565
    },
    address: "1545 W University Ave, Gainesville, FL 32603, United States"
}, id, db;

const eq = (a,b) => {
  var bool = []
  bool[0] = a.code === b.code
  bool[1] = a.name === b.name
  bool[2] = a.address === b.address
  // bool[3] = a.coordinates === b.coordinates
  if ( a.coordinates ){
    bool[3] = a.coordinates.latitude === b.coordinates.latitude
    bool[4] = a.coordinates.longitude === b.coordinates.longitude
  }
  return bool
}

const equal = (L,b) => {
  for(var i = 0; i < L.length; i++){
    if(L[i].code == b.code){
      return eq(L[i], b)
    }
  }
  return [0]
}

const nequal = (l,d) => {
  var equals = 0
  for(var i = 0; i < d.length; i++){
    // console.log(i, d[i])
    var b = equal(l, d[i])
    var bsum = b.reduce( (a,b) => {return a+b} )
    // if ( b.length == bsum ){
      equals += bsum / b.length
    // }
  }
  return equals
}

const test = async () => {
  db = await mongoose.connect(config.db.uri,
    {   useNewUrlParser : true
      , useUnifiedTopology : true
      , useCreateIndex : true
      , useFindAndModify : true
    });
  // await mongoose.set('useCreateIndex', true);
  // await mongoose.set('useFindAndModify', false);
  var listingData = JSON.parse(fs.readFileSync("listings.json"))
  var data = await Listing.find()
  if ( data.length > 0){
    data = data.sort( (a,b) => a.code.localeCompare(b.code) )
    var l = listingData.entries.sort( (a,b) => a.code.localeCompare(b.code) )
    var ratio_equal_entries = nequal(l,data) / l.length
    // console.log( data.length, l.length, ratio_equal_entries )
    console.log( ratio_equal_entries*10 ) //"results ratio score"
  } else {
    console.log( 0 )
  }
  await mongoose.connection.db.dropCollection("listings")
  await db.disconnect();
}
test()
