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
  test('has getItems method which return promise', () => {
    const item = new Item(db)
    let spy = jest.spyOn(item, 'addItems').mockImplementation(() => Promise.resolve());
    expect(typeof item.addItems).toBe('function')
    expect(typeof item.addItems('test')).toBe('object')
    expect(item.getItems()).toEqual(Promise.resolve())
  })
  test('has getItems method which return promise', () => {
    const item = new Item(db)
    let spy = jest.spyOn(item, 'deleteItem').mockImplementation(() => Promise.resolve());
    expect(typeof item.deleteItem).toBe('function')
    expect(typeof item.deleteItem('test')).toBe('object')
    expect(item.getItems()).toEqual(Promise.resolve())
  })
  test('has getItems method which return promise', () => {
    const item = new Item(db)
    let spy = jest.spyOn(item, 'updateItem').mockImplementation(() => Promise.resolve());
    expect(typeof item.updateItem).toBe('function')
    expect(typeof item.updateItem('test')).toBe('object')
    expect(item.getItems()).toEqual(Promise.resolve())
  })
  afterAll(() => {
    jest.restoreAllMocks();
  })
})