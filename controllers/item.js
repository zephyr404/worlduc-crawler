require('../utils/connection');
const Item = require('../schemas/item');

class ItemController {
  async saveItem(item) {
    const _item = new Item(item);
    try {
      await _item.save();
      // console.log(res);
      console.log('写入成功: ' + item.id);
    } catch (err) {
      console.log('save error');
    }
  }
}

module.exports = new ItemController();