// queries.js runs the functions and doesn't export them, hard to test this way
// suggestion: Change the API to export the functions and don't have them run in the file
// 4 queries, all only have side effects
// findLibraryWest()
//    prints contents to console corresponding to code LBW
// removeCable()
//    deletes object with code CABL from table
// updatePhelpsLab()
//    Solution is inconsistent with assignment
//    code = PHL
//      update = { address: 'Phelps Lab, Gainesville, FL 32603' }
//    -> update = { address: '1953 Museum Rd, Gainesville, FL 32603' }
// retrieveAllListings()
//    only prints out to console

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

const test = async () => {
  db = await mongoose.connect(config.db.uri,
    {   useNewUrlParser : true
      , useUnifiedTopology : true
      , useCreateIndex : true
      , useFindAndModify : true
    });

  var test_queries = fs.readFileSync("test_queries.txt")
  var listingData = JSON.parse(fs.readFileSync("listings.json")).entries

  // testing retrieveAllListings()
  // not the best test, template's solution only displays the first 100
  // It's at least generous
  var getAll = 0
  for(var i = 0; i < listingData.length; i++){
    getAll += test_queries.includes( listingData[i].code ) ? 1 : 0
  }
  getAll = getAll > 100 ? 2 : 0
  // console.log('--getall', getAll)

  // testing findLibraryWest()
  var library = test_queries.includes( "Library West" ) ? 1 : 0
  library += test_queries.includes( "Library West"
    , test_queries.indexOf("Library West")+10 ) ? 1 : 0
  // console.log(',library', library)

  // testing removeCable()
  // checking that it no longer exists in the database
  let cabl = await Listing.exists({code: 'CABL'}) ? 0 : 3
  // console.log(',delete cable', cabl)

  // testing updatePhelpsLab()
  var s1 = "Phelps Lab, Gainesville, FL 32603"
  var s2 = "1953 Museum Rd, Gainesville, FL 32603"
  var phl_txt = test_queries.includes(s1) || test_queries.includes(s2) ? 1 : 0
  let phl_db = await Listing.findOne({code: 'PHL'}
    // , res => console.log(res)
    )
  // var doesPHLexist = await Listing.exists({code: 'PHL'}) ? -1 : 9
  // console.log('phl?', doesPHLexist)
  var phl = phl_db.address == s1 || phl_db.address == s2 ? 2 : 0
  // phl += phl_txt
  // console.log('update phl', phl)

  console.log( [library, getAll, phl, cabl].join('+') )
  // console.log( [getAll, library, cabl, phl].reduce( (a,b) => {return a+b} ) )
  await mongoose.connection.db.dropCollection("listings")
  await db.disconnect();
}
test()
