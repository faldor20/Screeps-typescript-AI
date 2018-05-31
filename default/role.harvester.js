/** @param {Creep} creep **/
export function run(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
        }
    }
    else {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                if (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) {
                    const storageStructure = structure;
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
export function WhatDoing(creep) { }
//# sourceMappingURL=role.harvester.js.map