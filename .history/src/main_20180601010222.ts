import * as sourceScanner from "./Sourcemanager";
import * as roleUpgrader from "./role.upgrader";
import * as roleHarvester from "./role.harvester";
import * as roleBuilder from "./role.builder";
//import * as toolsourceScanner from "./tool.sourceScanner";
//import { ErrorMapper } from "utils/ErrorMapper";
//let roleHarvester = require('role.harvester');
//let roleUpgrader = require("role.upgrader");
//let roleBuilder = require("role.builder");
//let toolsourceScanner = require("tool.sourceScanner");
//let collectionPoint = require('proto.source');

function mainLoop() {


  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      let creepMemory: CreepMemory = Memory.creeps[name];
      if (creepMemory.worker != null) {
       // if (creepMemory.worker.targetobjectID != "") spawncreep("Sp1", creepMemory.role, creepMemory.worker.targetobjectID,roo);
       // else {
          let source: Source | null = Game.getObjectById(creepMemory.worker.targetobjectID);// its a strong but it throws ana error
          if (source != null) {
            let id: string = source.id;
            let roomjobs: { free: string[], taken: string[] } = source.room.memory.harvestPoints;
            roomjobs.taken.every((value: string, index: number) => { if (id == value) { roomjobs.taken.splice(index, 1); roomjobs.free.push(value); return true; } else return false; });
          }
       // }
      }
      else
      if (creepMemory.role=="builder") {
        Memory.builderCount--;
      }
      else
      if (creepMemory.role=="upgrader") {
        Memory.upgraderCount--;
      }
      console.log("deleted creep" + name);
      delete Memory.creeps[name];
    }
    else {


    }
  }

  /*  toolsourceScanner(Game.rooms[0]);*/
  let blockList = {};
  for (var name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
      //  roleHarvester.what
    //  console.log("runnnig harvester from main")
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
    if (room.memory.harvestPoints==null) {
      sourceScanner.scanRoom(room);
    }
    // console.log(room);
    if (room.energyAvailable == 300) {
    }
      if (room.memory.harvestPoints.free.length>0) {
       Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY, WORK], "Harvester" +Game.time, { memory: { worker: { targetobjectID:"" }, role: "harvester" } });
      //room.memory.harvesterCount++;
      }
      else if (Memory.upgraderCount<3) {
        if (Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY, WORK], "Upgrader" + Game.creeps, {
          memory: { role: "upgrader" }
        })==0) {
          Memory.upgraderCount++;
        }
      } else if (Memory.builderCount<2) {
        if (Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY, WORK], "Builder" + Game.creeps, {
          memory: { role: "builder" }
        }) == 0) {
          Memory.builderCount++;
        }

    }
  }
}
/* Object.defineProperty(Source.prototype, 'memory', {
  get: function() {
      if(_.isUndefined(Memory.sources)) {
          Memory.sources = {};
      }
      if(!_.isObject(Memory.sources)) {
          return undefined;
      }
      return Memory.sources[this.id] = Memory.sources[this.id] || {};
  },
  set: function(value) {
      if(_.isUndefined(Memory.sources)) {
          Memory.sources = {};
      }
      if(!_.isObject(Memory.sources)) {
          throw new Error('Could not set source memory');
      }
      Memory.sources[this.id] = value;
  }
}); */
///ts
// tslint:disable-next-line

//A.prototype.attributeId = "InternalId";

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

function spawncreep(spawner: string, role: string, targetid: string,room:Room) {
  if (role == "upgrader") {
    Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY], "Upgrader1", {
      memory: { role: "upgrader" }
    });
  } else if (role == "builder") {
    Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY], "Builder1", {
      memory: { role: "builder" }
    });
  } else if (role == "harvester"&&room.memory.harvestPoints.free.length>0) {
    Game.spawns["Sp1"].spawnCreep(
      [WORK, MOVE, CARRY, WORK],
      "Harvester" + Game.time,
      { memory: { worker: { targetobjectID: targetid }, role: "harvester" } }
    );
    //room.memory.harvesterCount++;
  }
}
