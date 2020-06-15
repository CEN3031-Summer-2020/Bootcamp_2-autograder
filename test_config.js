import mongoose from 'mongoose'
import config from './config.js'

const end = (n) => {
  console.log(n)
  mongoose.connection.close()
}

const test_conf = async () => {
  try {
    // await mongoose.connect("config.db.uri"
    await mongoose.connect(config.db.uri,
      {   useNewUrlParser: true
        , useUnifiedTopology: true
        , useCreateIndex : true
        , useFindAndModify : true
      });
    end(10)
  } catch {
    end(0)
  }
}

test_conf()
