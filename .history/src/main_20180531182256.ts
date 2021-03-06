//import { ErrorMapper } from "utils/ErrorMapper";
let roleHarvester = require('role.harvester');
let roleUpgrader = require("role.upgrader");
let roleBuilder = require("role.builder");
let toolsourceScanner = require("tool.sourceScanner");
let collectionPoint = require('proto.source');

function mainLoop() {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
     if (Memory.creeps[name].sourceID!=null) {
       let source = Game.getObjectById(Memory.creeps[name].sourceID);
       if (source!=null) {
        let sourcevar:Source = source as Source;
         sourcevar.currentlyCollecting--;
       }
     }
      delete Memory.creeps[name];

    }
  }
 /*  toolsourceScanner(Game.rooms[0]);*/
  let blockList = {};
  for (var name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    //  roleHarvester.what
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

function assignHarvester(creep:Creep) {
  creep.room.find(FIND_SOURCES).forEach(source =>
  {
    if (source.collectionPoints>source.currentlyCollecting)
    {
      source.currentlyCollecting++;
      creep.memory.sourceID = source.id;
      Memory.creeps[creep.name].sourceID = source.id;
     }
   })
}
/**
 * Screeps system expects this "loop" method in main.js to run the
 * application. If we have this line, we can be sure that the globals are
 * bootstrapped properly and the game loop is executed.
 * http://support.screeps.com/hc/en-us/articles/204825672-New-main-loop-architecture
 *
 * @export
 */
declare var module: any;
module.exports.loop = mainLoop();

