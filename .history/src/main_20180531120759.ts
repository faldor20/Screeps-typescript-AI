let roleHarvester = require('role.harvester');
let roleUpgrader = require("role.upgrader");
let roleBuilder = require("role.builder");
let toolsourceScanner = require("tool.sourceScanner");
let collectionPoint = require('proto.source');
export const loop = mainLoop();
function mainLoop(){
 /*  toolsourceScanner(Game.rooms[0]);*/
  let blockList = {};
  for (var name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
     // roleHarvester.what
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
      }
  }
  for (let name in Game.rooms) {
    let room = Game.rooms[name];
   // console.log(room);

    if (room.energyAvailable == 300) {
      if (!Game.creeps["Upgrader1"]) {
        Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY], "Upgrader1", { memory: { role: 'upgrader' } });

      }
      else if (!Game.creeps["Builder1"]) {
        Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY], "Builder1", { memory: { role: 'builder' } });
      }
      else {
        Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY, WORK], "Harvester" + Math.random(), { memory: { role: 'harvester' } });
      }
    }
  }
}
