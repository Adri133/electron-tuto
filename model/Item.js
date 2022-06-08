
class Item {
  constructor(db) {
    this.db = db
  }

  async getItems() {
    console.log(this.db);
    const stmt = await this.db.run('SELECT * FROM Item')
    return stmt.all()
  }
}

module.exports = Item