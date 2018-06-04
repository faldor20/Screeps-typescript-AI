/*

    export function run( creep:Creep) {

        if(creep && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            let sources:Source[] = creep.room.find(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    } */
export function buildAction(targetID: string, creep: Creep) {
  if (creep.carry.energy === creep.carryCapacity) {
    const targetObject: ConstructionSite<
      BuildableStructureConstant
    > | null = Game.getObjectById(targetID);
    if (targetObject) {
      if (creep.build(targetObject) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetObject, {
          visualizePathStyle: { stroke: '#ffffff' }
        });
      }
    } else {
      console.log('ERR: builder could not find object');
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
