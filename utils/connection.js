const mongoose = require('mongoose');

const DB_URL = require("./config").mongoUrl;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("we are connected"))
  .catch(error => console.log(error));