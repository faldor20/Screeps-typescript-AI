import { IHarvestAction } from './';

export const HarvestAction: IHarvestAction = {
    name: 'Harvest Action',
    run: (targetId: string, creep: Creep) => {
        if (creep.carry.energy < creep.carryCapacity) {
            const creepmem: CreepMemory = creep.memory;
            const source: Source | null = Game.getObjectById(targetID);
            if (source != null) {
                console.log(creep.harvest(source));
                //  console.log("harvester found source");
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                console.log('harvester moving');
                creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                console.log('harvester harvested');
                }
            } else {
                console.log('harvester didnt get source');
            }
            } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: Structure) => {
                if (
                    structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER
                ) {
                    const storageStructure: HasStorage = structure as HasStorage;
                    return storageStructure.energy < storageStructure.energyCapacity;
                }
                return false;
                }
            });
            if (targets.length > 0) {
                creep.transfer(targets[0], RESOURCE_ENERGY);
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.memory.job = undefined;
                creep.room.memory.harvestPoints.free.push(targetID);
                console.log('harvester giving up job');
            }
        }
    }
}