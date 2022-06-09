const Exemple = require('../script/Exemple')

describe("Exemple class", () => {
  const exemple = new Exemple()
  test('has getA method which return number to be 3', () => {
    expect(typeof exemple.getA).toBe('function')
    expect(typeof exemple.getA()).toBe('number')
    expect(exemple.getA()).toBe(3)
  })
  test('has getB method which return string to be test', () => {
    expect(typeof exemple.getB).toBe('function')
    expect(typeof exemple.getB()).toBe('string')
    expect(exemple.getB()).toBe('test')
  })

  test('has setA method which set a property', () => {
    exemple.setA(1)
    expect(typeof exemple.setA).toBe('function')
    expect(exemple.getA()).toBe(1)
  })
  test('has setB method which set b property', () => {
    exemple.setB('test2')
    expect(typeof exemple.setB).toBe('function')
    expect(exemple.getB()).toBe('test2')
  })
})