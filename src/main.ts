import {
  buildJob,
  creepTypes,
  HarvestJob,
  jobType,
  upgradeJob
} from 'creeps.jobs';

import * as sourceScanner from './Sourcemanager';
const JOB_HARVEST: jobType = 'harvest';
const JOB_BUILD: jobType = 'build';
const JOB_UPGRADE: jobType = 'upgrade';
const JOB_REPAIR: jobType = 'repair';
function mainLoop() {
  CleanMemory();
  /*  toolsourceScanner(Game.rooms[0]);*/
  const blockList = {};
  CheckCreeps();
  CheckRooms();
}
function CheckRooms() {
  for (const name in Game.rooms) {
    const room = Game.rooms[name];
    const roomMem = room.memory;
    const buildsites: ConstructionSite<
      BuildableStructureConstant
    >[] = room.find(FIND_CONSTRUCTION_SITES);
    if (buildsites) {
      if (roomMem.jobs !== undefined) {
        if (
          buildsites.length > 0 &&
          buildsites.length !== roomMem.jobs.build.length
        ) {
          const newsites: buildJob[] = [];
          buildsites.forEach((site) => {
            newsites.push(new buildJob(site.id));
          });
          roomMem.jobs.build = newsites;
        }
      } else {
        console.log('jobs mem doesnt exist');
      }
    }
    if (roomMem.jobs[JOB_UPGRADE].length < 3) {
      if (room.controller) {
        roomMem.jobs[JOB_UPGRADE].push(new upgradeJob(room.controller.id));
      }
    }
    if (roomMem.harvestPoints == null) {
      sourceScanner.scanRoom(room);
    }
    if (
      room.energyAvailable < room.energyCapacityAvailable &&
      roomMem.jobs.harvest.length < roomMem.harvestPoints.count
    ) {
      const harvistPoint = roomMem.harvestPoints.free.pop();
      if (harvistPoint) {
        //   roomMem.harvestPoints.taken.push(harvistPoint);
        roomMem.jobs.harvest.push(new HarvestJob(harvistPoint));
      }
    }
    // console.log(room);
    if (
      roomMem.harvestPoints.free.length > 0 &&
      Memory.harvesterCount < roomMem.harvestPoints.count
    ) {
      if (
        Game.spawns['Sp1'].spawnCreep(
          [WORK, MOVE, CARRY, WORK],
          'Harvester' + Game.time,
          {
            memory: { type: creepTypes.harvester }
          }
        )
      ) {
        Memory.upgraderCount++;
      } else {
        console.log('failed to sapwn harvester');
      }
      // room.memory.harvesterCount++;
    } else if (Memory.upgraderCount < 3) {
      if (
        Game.spawns['Sp1'].spawnCreep(
          [WORK, MOVE, CARRY, WORK],
          'Upgrader' + Game.creeps,
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
        Game.spawns['Sp1'].spawnCreep(
          [WORK, MOVE, CARRY, WORK],
          'Builder' + Game.creeps,
          {
            memory: { type: creepTypes.builder }
          }
        ) == 0
      ) {
        Memory.builderCount++;
      }
    } else {
      console.log('no creeps spawned');
    }
  }
}
function CheckCreeps() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep) {
      if (creep.memory.job == null) {
        const jobPriorities: string[] = creep.memory.type.jobTypePriority;
        jobPriorities.forEach((jobtype) => {
          const newjob: Job | undefined = creep.room.memory.jobs[jobtype].pop();
          if (newjob != null) {
            creep.memory.job = newjob;
            return;
          }
        });
      } else {
        if (creep.memory.job) {
          creep.memory.job.jobaction(creep);
        }
      }
    }
  }
}
function CleanMemory() {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      const creepMemory: CreepMemory = Memory.creeps[name];
      if (creepMemory.worker != null) {
        // if (creepMemory.worker.targetobjectID != "") \
        // spawncreep("Sp1", creepMemory.role, creepMemory.worker.targetobjectID, roo);
        // else {
        const source: Source | null = Game.getObjectById(
          creepMemory.worker.targetobjectID
        ); // its a strong but it throws ana error
        if (source != null) {
          const id: string = source.id;
          const roomjobs: { free: string[]; taken: string[] } =
            source.room.memory.harvestPoints;
          roomjobs.taken.every((value: string, index: number) => {
            if (id === value) {
              roomjobs.taken.splice(index, 1);
              roomjobs.free.push(value);
              return true;
            } else {
              return false;
            }
          });
        }
        // }
      } else if (creepMemory.type === creepTypes.harvester) {
        Memory.harvesterCount++;
      } else if (creepMemory.role === creepTypes.builder) {
        Memory.builderCount--;
      } else if (creepMemory.role === creepTypes.upgrader) {
        Memory.upgraderCount--;
      }
      /* .log("deleted creep" + name); */
      delete Memory.creeps[name];
    } else {
    }
  }
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
