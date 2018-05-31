/** @param {Creep} creep **/
export function run(creep: Creep) {
  if (creep.carry.energy < creep.carryCapacity) {
    let source: Source | null = Game.getObjectById(creep.memory.sourceID)
    if (source) {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
    else
    {
      assignHarvester(creep);
     }
  } else    {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure: Structure) => {
        if ( structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) {
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
export function WhatDoing(creep: Creep) {

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
