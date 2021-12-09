const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  head: {
    type: String
  },
  city: {
    type: String
  },
  org: {
    type: String
  },
  email: {
    type: String
  },
  info: {
    type: [Object]
  },
  hobby: {
    type: [Object]
  }
})

module.exports = mongoose.model('Item', ItemSchema);