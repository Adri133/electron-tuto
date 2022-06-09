
class Item {
  constructor(db) {
    this.db = db.connect()
  }

  getItems() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM Item", (err,rows) =>{
        if(err) {
          console.log(err);
          reject(err)
        } else {
          resolve(rows)
        }
      })
    });
  }

  addItems(data) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("INSERT INTO Item (libelle) VALUES (?)")
      stmt.run(data, (err,rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  deleteItem(data) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("DELETE FROM Item WHERE id = ?")
      stmt.get(data, (err,rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  updateItem(data) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("UPDATE Item SET libelle=? WHERE id="+ data.id)
      stmt.run(data.libelle, (err,rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

module.exports = Item