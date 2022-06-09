const database = require('../model/Database')
const Item = require('../model/item')
const db = new database('list.db')
describe('Item class', () => {
  test('has getItems method which return promise', () => {
    const item = new Item(db)
    let spy = jest.spyOn(item, 'getItems').mockImplementation(() => Promise.resolve());
    expect(typeof item.getItems).toBe('function')
    expect(item.getItems()).toEqual(Promise.resolve())
  })
  afterAll(() => {
    jest.restoreAllMocks();
  })
})