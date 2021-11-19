// Given an array of players
// returns a sorted array of teams with the total team points for active players.
// The output is sorted in descending order by points
// input: [{ team: 'green', name: 'Bob', points: 5, isActive: true }, ...]
// output: [{ team: 'green', points: 40 }, ...]
module.exports = (teams) => {
  let arr = [];
  const teamsActive = teams.filter((player) => player.isActive === true);

  for (let p = 0; p < teamsActive.length; p++) {
    if (!arr.find((element) => element.team === teamsActive[p].team)) {
      arr.push({ team: teamsActive[p].team, points: 0 });
    } else {
      continue;
    }
  }

  for (let i = 0; i < teamsActive.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (teamsActive[i].team === arr[j].team) {
        arr[j].points += teamsActive[i].points;
      }
    }
  }
  console.log(arr);
  return arr;
};
