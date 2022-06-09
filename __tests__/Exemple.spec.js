const Exemple = require('./Exemple')

describe("Exemple class", () => {
  const exemple = new Exemple()
  it('has getA method which return integer', () => {
    expect(typeof exemple.getA).toBe('function');
    expect(typeof exemple.getA()).toBe('number');
  })
})