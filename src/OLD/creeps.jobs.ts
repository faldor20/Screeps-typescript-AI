import { Dictionary } from 'lodash';
import { run } from '../../.history/src/role.upgrader_20180531115439';
import { harvestAction } from 'OLD/action.harvest';
import { buildAction } from 'OLD/action.build';
import { upgradeAction } from 'OLD/action.upgrade';

export const JOB_HARVEST: jobType = 'harvest';
export const JOB_BUILD: jobType = 'build';
export const JOB_UPGRADE: jobType = 'upgrade';
export const JOB_REPAIR: jobType = 'repair';
export type jobType = JOB_HARVEST | JOB_BUILD | JOB_UPGRADE | JOB_REPAIR;
type JOB_HARVEST = 'harvest';
type JOB_BUILD = 'build';
type JOB_REPAIR = 'repair';
type JOB_UPGRADE = 'upgrade';
/* const JOB_HARVEST: jobType = { creepAction: harvestAction };
declare type JOB_BUILD= jobType ;
const JOB_REPAIR: jobType = { creepAction: repairAction };
const JOB_UPGRADE: jobType = { creepAction: upgradeAction }; */

export class HarvestJob implements Job {
  constructor(objectid: string) {
    this.targetobjectId = objectid;
  }
  public jobAction = (creep: Creep) =>
    harvestAction(this.targetobjectId, creep);

  public targetobjectId: string;
}

export class buildJob implements Job {
  constructor(objectid: string) {
    this.targetobjectId = objectid;
  }
  public jobAction = (creep: Creep) => {
    buildAction(this.targetobjectId, creep);
  };
  // make a new fucntion here taht does build action and takes the targetobject id and does it
  public targetobjectId: string;
}
export class upgradeJob implements Job {
  constructor(objectid: string) {
    this.targetobjectId = objectid;
  }
  public jobAction = (creep: Creep) => {
    upgradeAction(this.targetobjectId, creep);
  };
  public targetobjectId: string;
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

export function repairAction(params: string) {}
/* class jobs {
    list: Dictionary<jobType> = {};
}
 */
