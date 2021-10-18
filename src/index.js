'use strict'

const CalculateTeamPoints = require('./calculateTeamPoints.js')

// We will use a singleton for the logger
const logger = require('./logger.js')

// We will still pass in the logger in case we want to stray from the singleton pattern later
let calculator = new CalculateTeamPoints(logger)

calculator.calculate([
  { team: true, name: 'Jim', points: 100, isActive: true },
  { team: 'blue', name: 'Jim', points: false, isActive: true },
  { team: 'green', name: 'Erick', points: 5, isActive: true },
  { team: 'blue', name: 'Bob', points: 5.5, isActive: true },
  { team: 'green', name: 'Destinie', points: 5, isActive: true },
  { team: 'red', name: 'Mitri', points: 5, isActive: true },
  { team: 'red', name: 'Jojo', points: 5, isActive: true },
  { team: 'red', name: 'Jah', points: 3, isActive: false },
  { team: 'orange', name: 'Rob', points: 0, isActive: false },
  { team: true, name: 'Rob', points: 1, isActive: false },
  { isActive: 'bad', name: 'Rob', points: 1 },
  { isActive: 'bad', name: 'Rob', team: 'x' },
  {},
  function () {},
  { team: 'bad', name: 'Rob', points: 1 }
]).then(results => {
  logger.info(results)
}).catch(e => {
  // Fail lambda function || Publish cloudwatch metric etc...
  logger.error(e)
})
