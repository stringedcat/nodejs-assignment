'use strict'

// Given an array of players
// returns a sorted array of teams with the total team points for active players.
// The output is sorted in descending order by points
// input: [{ team: 'green', name: 'Bob', points: 5, isActive: true }, ...]
// output: [{ team: 'green', points: 40 }, ...]
module.exports = class CalculateTeamPoints {
  // We should use typescript to make sure we pass an instace with the expected methods
  constructor (logger) {
    this._logger = logger
  }

  // We should use typescript to expect an iterable
  calculate (players) {
    // We use a promise to prevent blocking the event loop in case we
    // decide to do a syscall in the future e.g. http request
    return new Promise((resolve, reject) => {
      let results = []

      // With this map we will trade memory for speed
      let map = {}

      for (let player of players) {
        // In case bad data come in
        if (!this._validate(player)) {
          this._logger.error('Invalid player record found', player)
          continue
        }

        // We want to include data on all teams even if a player is inactive
        // so initialze a 0 point record now
        if (map[player.team] === undefined) {
          // Keep track of the position in the array where this team's data is located
          map[player.team] = (results.push({team: player.team, points: 0}) - 1)
        }

        if (!player.isActive) {
          this._logger.debug(`${player.name} is not active. Points will not be totaled`)
          continue
        }

        results[map[player.team]].points += player.points
      }

      resolve(results.sort((a, b) => {
        return a.points - b.points
      }))
    })
  }

  _validate (player) {
    if (typeof player.team !== 'string' || typeof player.points !== 'number' || typeof player.isActive !== 'boolean') { return false }
    return true
  }
}
