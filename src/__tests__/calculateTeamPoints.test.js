const calculateTeam = require("../calculateTeamPoints");
const teams = require("./__data__/players.json")
describe('calculateTeamPoints', () => {
test(" Teams", () => {
    expect(calculateTeam(teams).toBe([
        { team: 'red', points: 20 },
        { team: 'blue', points: 10 },
        { team: 'green', points: 40 }
    ]))
})

})
