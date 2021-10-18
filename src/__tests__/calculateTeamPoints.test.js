'use strict'

const CalculateTeamPoints = require('../calculateTeamPoints.js')
const logger = require('../logger.js')
const players = require('players')

describe('calculateTeamPoints', () => {
  test('sorts', () => {
    let calculator = new CalculateTeamPoints(logger)
    return calculator.calculate(players).then(r => {
      let c = r[0].points
      for (let i of r) {
        expect(i.points).toBeGreaterThanOrEqual(c)
        c = i.points
      }
    })
  })
  test('calculates active only', () => {
    let calculator = new CalculateTeamPoints(logger)
    return calculator.calculate(players).then(r => {
      expect(r[0].points).toEqual(10)
    })
  })
})
