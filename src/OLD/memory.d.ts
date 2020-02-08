interface CreepMemory {
  /*     worker?: {
        targetobjectID: string
    } */
  job?: Job;
  //  role: string

  type: creepType;
  [name: string]: any;
}
interface FlagMemory {
  [name: string]: any;
}
interface SpawnMemory {
  [name: string]: any;
}
interface RoomMemory {
  jobs: { [key: string]: Job[] };
  harvestPoints: { free: string[]; taken: string[]; count: number };
  [name: string]: any;
}
/*  interface creepType
{
    priority:jobType[];
} */
/* declare type jobType =
    JOB_HARVEST |
    JOB_BUILD |
    JOB_UPGRADE |
    JOB_REPAIR;

type JOB_HARVEST = 'harvest';
type JOB_BUILD = 'build';
type JOB_REPAIR = 'repair';
type JOB_UPGRADE = 'upgrade'; */

interface creepType {
  jobTypePriority: string[];
}
/* interface jobType {
  creepAction: Function;
  //targetobjectID: string
} */
interface Job {
  targetobjectId: string;
  jobAction(creep: Creep): void;
}
/*  interface harvestJob extends job
{
    harvestaction(params:string):boolean
}
interface build extends jobType
{
}
interface repair extends jobType
{
}
interface upgrade extends jobType
{
}
interface creepAction
{

}
 */
