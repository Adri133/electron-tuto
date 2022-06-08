
class Item {
  constructor(db) {
    this.db = db.connect()
  }

  getItems() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM Item", function(err,rows){
      if(err) {
        console.log(err);
        reject(err)
      } else {
      resolve(rows)
      }
  })});
  }
}

module.exports = Item