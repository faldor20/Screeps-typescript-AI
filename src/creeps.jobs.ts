import { Dictionary } from "lodash";
import { jobType, Job } from "memory";
import { run } from "../.history/src/role.upgrader_20180531115439";

/* const JOB_HARVEST: jobType = "harvest";
const JOB_BUILD: jobType = "build";
const JOB_UPGRADE: jobType = "upgrade";
const JOB_REPAIR: jobType = "repair";
type jobType = JOB_HARVEST | JOB_BUILD | JOB_UPGRADE | JOB_REPAIR;
type JOB_HARVEST = "harvest";
type JOB_BUILD = "build";
type JOB_REPAIR = "repair";
type JOB_UPGRADE = "upgrade"; */
const JOB_HARVEST: jobType = { creepAction: harvestAction };

class harvestJob implements Job {
  constructor(objectid: string) {
    this.targetobjectId = objectid;
  }
  Do(creep: Creep) {
    this.jobaction(this.targetobjectId, creep);
  }
  targetobjectId: string;
  jobaction = harvestAction;
}
class buildJob implements Job {
  constructor(objectid: string) {
    this.targetobjectId = objectid;
  }
  Do(creep: Creep) {
    this.jobaction(this.targetobjectId, creep);
  }
  //make a new fucntion here taht does build action and takes the targetobject id and does it
  targetobjectId: string;
  jobaction = buildAction;
}
class upgradeJob implements Job {
  constructor(objectid: string) {
    this.targetobjectId = objectid;
  }
  Do(creep: Creep) {
    this.jobaction(this.targetobjectId, creep);
  }
  targetobjectId: string;
  jobaction = upgradeAction;
}

export namespace creepTypes {
  export const harvester: creepType = {
    jobTypePriority: [JOB_HARVEST, JOB_BUILD, JOB_REPAIR, JOB_UPGRADE]
  };
  export const builder: creepType = {
    jobTypePriority: [JOB_BUILD, JOB_REPAIR, JOB_HARVEST, JOB_UPGRADE]
  };
  export const upgrader: creepType = {
    jobTypePriority: [JOB_UPGRADE, JOB_HARVEST, JOB_REPAIR, JOB_BUILD]
  };
  export const repairer: creepType = {
    jobTypePriority: [JOB_REPAIR, JOB_BUILD, JOB_HARVEST, JOB_UPGRADE]
  };
}
export function harvestAction(targetID: string, creep: Creep) {
  //console.log("SASD");
  if (creep.carry.energy < creep.carryCapacity) {
    let creepmem: CreepMemory = creep.memory;
    let source: Source | null = Game.getObjectById(targetID);
    if (source != null) {
      console.log(creep.harvest(source));
      //  console.log("harvester found source");
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        console.log("harvester moving");
        creep.moveTo(source.pos, { visualizePathStyle: { stroke: "#ffaa00" } });
      } else {
        console.log("harvester harvested");
      }
    } else {
      console.log("harvester didnt get source");
    }
  } else {
    let targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure: Structure) => {
        if (
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_TOWER
        ) {
          const storageStructure: HasStorage = structure as HasStorage;
          return storageStructure.energy < storageStructure.energyCapacity;
        }
        return false;
      }
    });
    if (targets.length > 0) {
      creep.transfer(targets[0], RESOURCE_ENERGY);
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      creep.memory.job == null;
      creep.room.memory.harvestPoints.free.push(targetID);
      console.log("harvester giving up job");
    }
  }
}
export function buildAction(targetID: string, creep: Creep) {
  if (creep.carry.energy == creep.carryCapacity) {
    let targetObject: ConstructionSite<
      BuildableStructureConstant
    > | null = Game.getObjectById(targetID);
    if (targetObject) {
      if (creep.build(targetObject) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targetObject, {
          visualizePathStyle: { stroke: "#ffffff" }
        });
      }
    } else {
      console.log("ERR: builder could not find object");
    }
  } else {
    let energy = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure: Structure) => {
        if (
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_CONTAINER
        ) {
          const storageStructure: HasStorage = structure as HasStorage;
          return storageStructure.energy > 0;
        }
        return false;
      }
    });
    if (energy.length > 0) {
      if (creep.withdraw(energy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energy[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      let newjob = creep.room.memory.jobs.harvest.pop();
      if (newjob) {
        creep.memory.job == newjob;
      }
    }
  }
}
export function upgradeAction(targetID: string, creep: Creep) {
  if (creep.memory.upgrading && creep.carry.energy == 0) {
    creep.memory.upgrading = false;
    creep.say("🔄 harvest");
  }
  if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
    creep.memory.upgrading = true;
    creep.say("⚡ upgrade");
  }
  if (creep.memory.upgrading) {
    let controller: StructureController | null = Game.getObjectById(targetID);
    if (controller != null) {
      const status = creep.upgradeController(controller);
      if (status == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  } else {
    let energy = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure: Structure) => {
        if (
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_CONTAINER
        ) {
          const storageStructure: HasStorage = structure as HasStorage;
          return storageStructure.energy > 0;
        }
        return false;
      }
    });
    if (energy.length > 0) {
      if (creep.withdraw(energy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energy[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      let newjob = creep.room.memory.jobs.harvest.pop();
      if (newjob) {
        creep.memory.job == newjob;
      }
    }
  }
}
export function repairAction(params: string) {}
/* class jobs {
    list: Dictionary<jobType> = {};
}
 */
