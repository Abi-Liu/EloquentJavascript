// It’s hard to objectively compare robots by just letting them solve a few scenarios. Maybe one robot just happened to get easier tasks or the kind of tasks that it is good at, whereas the other didn’t.

// Write a function compareRobots that takes two robots (and their starting memory). It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.

// For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot.

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      return turn;
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  // Your code here
  let steps1 = 0;
  let steps2 = 0;
  for (let i = 0; i < 100; i++) {
    const state = VillageState.random();
    steps1 += runRobot(state, robot1, memory1);
    steps2 += runRobot(state, robot2, memory2);
  }
  console.log({ robot1: steps1 / 100, robot2: steps2 / 100 });
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
