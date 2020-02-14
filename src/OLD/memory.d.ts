interface CreepMemory {
  /*     worker?: {
        targetobjectID: string
    } */
  job?: Job;
  //  role: string

  type: creepType;
  [name: string]: any;
}
//i am unsure if changing memory is done like this:
/* interface OURMemory extends Memory{
	builderCount:number;
	harvesterCount:number;
upgraderCount:number;
} */
//or liek this
interface Memory {

	builderCount:number;
	harvesterCount:number;
upgraderCount:number
}

interface FlagMemory {
  [name: string]: any;
}
interface SpawnMemory {
  [name: string]: any;
}
interface RoomMemory {
  jobs: { [key: string]: Job[] };
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
  targetObjectId: string;
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
