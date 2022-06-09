const Exemple = require('../script/Exemple')

describe("Exemple class", () => {
  const exemple = new Exemple()
  test('has getA method which return number to be 3', () => {
    expect(typeof exemple.getA).toBe('function');
    expect(typeof exemple.getA()).toBe('number')
    expect(exemple.getA()).toBe(3)
  })
  
})