/** @param {Creep} creep **/
export function run(creep: Creep) {
  if (creep.carry.energy < creep.carryCapacity) {
    let creepmem: CreepMemory = creep.memory;
    if (creepmem.worker) {
      let source: Source | null = Game.getObjectById(
        creepmem.worker.targetobjectID
      );
      if (source) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
      } else {
        assignHarvester(creep,creepmem);
      }
    }
  } else {
    var targets = creep.room.find(FIND_STRUCTURES, {
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
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
}
/** @param {Creep} creep **/
export function WhatDoing(creep: Creep,creepMem:CreepMemory) {}

function assignHarvester(creep: Creep) {
  let source: Source | null = Game.getObjectById(
    creep.room.memory.jobs.harvester.free.pop()
  );
  if (source) {
    creep.room.memory.jobs.harvester.taken.push(source.id);
    if (creep.memory.worker) {
      creep.memory.worker.targetobjectID = source.id;
    }
  } else {
    console.log("ERROR:got job but could find source");
  }
}
