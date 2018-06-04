import * as sourceScanner from "./Sourcemanager";
import * as roleUpgrader from "./role.upgrader";
import * as roleHarvester from "./role.harvester";
import * as roleBuilder from "./role.builder";
import { creepTypes, harvestAction, buildAction } from "creeps.jobs";
import { RoomMemory } from "./memory";
//import * as toolsourceScanner from "./tool.sourceScanner";
//import { ErrorMapper } from "utils/ErrorMapper";
//let roleHarvester = require('role.harvester');
//let roleUpgrader = require("role.upgrader");
//let roleBuilder = require("role.builder");
//let toolsourceScanner = require("tool.sourceScanner");
//let collectionPoint = require('proto.source');
/* class creepType {
  constructor(prorityorder: jobType[]) {
    let joborder: jobType[] = prorityorder;
  }
} */
declare const JOB_HARVEST: "harvest";
declare const JOB_BUILD: "build";
declare const JOB_UPGRADE: "upgrade";
declare const JOB_REPAIR: "repair";
function mainLoop() {
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      let creepMemory: CreepMemory = Memory.creeps[name];
      if (creepMemory.worker != null) {
        // if (creepMemory.worker.targetobjectID != "") spawncreep("Sp1", creepMemory.role, creepMemory.worker.targetobjectID,roo);
        // else {
        let source: Source | null = Game.getObjectById(
          creepMemory.worker.targetobjectID
        ); // its a strong but it throws ana error
        if (source != null) {
          let id: string = source.id;
          let roomjobs: { free: string[]; taken: string[] } =
            source.room.memory.harvestPoints;
          roomjobs.taken.every((value: string, index: number) => {
            if (id == value) {
              roomjobs.taken.splice(index, 1);
              roomjobs.free.push(value);
              return true;
            } else return false;
          });
        }
        // }
      } else if (creepMemory.type == creepTypes.harvester) {
        Memory.harvesterCount++;
      } else if (creepMemory.role == creepTypes.builder) {
        Memory.builderCount--;
      } else if (creepMemory.role == creepTypes.upgrader) {
        Memory.upgraderCount--;
      }
      console.log("deleted creep" + name);
      delete Memory.creeps[name];
    } else {
    }
  }

  /*  toolsourceScanner(Game.rooms[0]);*/
  let blockList = {};
  for (var name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep) {
      if (creep.memory.job == null) {
        let jobPriorities: jobType[] = creep.memory.type.jobTypePriority;
        jobPriorities.forEach(jobType => {
          let newjob: Job | undefined = creep.room.memory.jobs[jobType].pop();
          if (newjob != null) {
            creep.memory.job = newjob;
            return;
          }
        });
      } else {
        harvestAction(creep.memory.job.targetobjectId, creep);
      }
    }
  }
  for (let name in Game.rooms) {
    let room = Game.rooms[name];

    let roomMem = room.memory;
    room.memory.
    roomMem.jobs.harvest.forEach(harvest => {
      harvest.jobaction = harvestAction;
    });
    let buildsites: ConstructionSite<BuildableStructureConstant>[] = room.find(
      FIND_CONSTRUCTION_SITES
    );
    if (buildsites) {
      if (roomMem.jobs != undefined) {
        if (
          buildsites.length > 0 &&
          buildsites.length != roomMem.jobs.build.length
        ) {
          let newsites: Job[] = [];
          buildsites.forEach(site => {
            newsites.push({ targetobjectId: site.id, jobaction: buildAction });
          });
          roomMem.jobs.build = newsites;
        }
      } else {
        console.log("jobs mem doesnt exist");
      }
    }
    if (roomMem.harvestPoints == null) {
      sourceScanner.scanRoom(room);
    }
    if (
      room.energyAvailable < room.energyCapacityAvailable &&
      roomMem.jobs.harvest.length < roomMem.harvestPoints.count
    ) {
      let harvistPoint = roomMem.harvestPoints.free.pop();
      if (harvistPoint) {
        //   roomMem.harvestPoints.taken.push(harvistPoint);
        roomMem.jobs.harvest.push({
          targetobjectId: harvistPoint,
          jobaction: harvestAction
        });
        roomMem.jobs.harvest[0].jobaction = harvestAction;
      }
    }
    // console.log(room);
    if (room.energyAvailable == 300) {
    }
    if (
      roomMem.harvestPoints.free.length > 0 &&
      Memory.harvesterCount < roomMem.harvestPoints.count
    ) {
      if (
        Game.spawns["Sp1"].spawnCreep(
          [WORK, MOVE, CARRY, WORK],
          "Harvester" + Game.time,
          {
            memory: { type: creepTypes.harvester }
          }
        )
      ) {
        Memory.upgraderCount++;
      } else {
        console.log("failed to sapwn harvester");
      }
      //room.memory.harvesterCount++;
    } else if (Memory.upgraderCount < 3) {
      if (
        Game.spawns["Sp1"].spawnCreep(
          [WORK, MOVE, CARRY, WORK],
          "Upgrader" + Game.creeps,
          {
            memory: {
              type: creepTypes.upgrader
            }
          }
        ) == 0
      ) {
        Memory.upgraderCount++;
      }
    } else if (Memory.builderCount < 2) {
      if (
        Game.spawns["Sp1"].spawnCreep(
          [WORK, MOVE, CARRY, WORK],
          "Builder" + Game.creeps,
          {
            memory: { type: creepTypes.builder }
          }
        ) == 0
      ) {
        Memory.builderCount++;
      }
    } else {
      console.log("no creeps spawned");
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

/* function spawncreep(
  spawner: string,
  role: string,
  targetid: string,
  room: Room
) {
  if (role == "upgrader") {
    Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY], "Upgrader1", {
      memory: { role: "upgrader" }
    });
  } else if (role == "builder") {
    Game.spawns["Sp1"].spawnCreep([WORK, MOVE, CARRY], "Builder1", {
      memory: { role: "builder" }
    });
  } else if (role == "harvester" && room.memory.harvestPoints.free.length > 0) {
    Game.spawns["Sp1"].spawnCreep(
      [WORK, MOVE, CARRY, WORK],
      "Harvester" + Game.time,
      { memory: { worker: { targetobjectID: targetid }, role: "harvester" } }
    );
    //room.memory.harvesterCount++;
  }
} */
