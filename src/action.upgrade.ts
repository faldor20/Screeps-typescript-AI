/*
    export function run(creep:Creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 :smile: harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.room.controller != undefined) {
                const status = creep.upgradeController(creep.room.controller)
                if (status == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
} */
export function upgradeAction(targetID: string, creep: Creep) {
  if (creep.memory.upgrading && creep.carry.energy === 0) {
    creep.memory.upgrading = false;
    creep.say('🔄 harvest');
  }
  if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
    creep.memory.upgrading = true;
    creep.say('⚡ upgrade');
  }
  if (creep.memory.upgrading) {
    const controller: StructureController | null = Game.getObjectById(targetID);
    if (controller != null) {
      const status = creep.upgradeController(controller);
      if (status === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  } else {
    const energy = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure: Structure) => {
        if (
          structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_CONTAINER
        ) {
          const storageStructure: HasStorage = structure as HasStorage;
          return storageStructure.energy > 0;
        }
        return false;
      }
    });
    if (energy.length > 0) {
      if (creep.withdraw(energy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(energy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      const newjob = creep.room.memory.jobs.harvest.pop();
      if (newjob) {
        creep.memory.job = newjob;
      }
    }
  }
}
