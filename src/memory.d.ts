interface CreepMemory {
/*     worker?: {
        targetobjectID: string
    } */
    job?:Job
  //  role: string

    type: creepType
    [name: string]: any
}
interface FlagMemory { [name: string]: any }
interface SpawnMemory { [name: string]: any }
interface RoomMemory {
    jobs: {
        //object id of job taget
        harvest: Job[],
        build: Job[],
        repair: Job[],
        upgrade:Job[],
    }
    [name: string]: any
    harvestPoints: { free:string[],taken:string[] ,count:number}
}
/*  interface creepType
{
    priority:jobType[];
} */
declare type jobType =
    JOB_HARVEST |
    JOB_BUILD |
    JOB_UPGRADE |
    JOB_REPAIR;

type JOB_HARVEST = 'harvest';
type JOB_BUILD = 'build';
type JOB_REPAIR = 'repair';
type JOB_UPGRADE = 'upgrade';
interface creepType
{
    jobTypePriority:jobType[];
}
/* interface jobType
{
    creepAction: Function
    //targetobjectID: string
} */
interface Job
{
    targetobjectId: string;
    jobaction(targetID: string, creep: Creep):void
 }
/* interface harvest extends jobType
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

