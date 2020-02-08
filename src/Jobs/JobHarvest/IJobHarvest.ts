import { IJob } from '../../Core';

export const JOB_HARVEST = 'JOB_HARVEST'

export interface IJobHarvestInfo {
    targetObjectId: string;
}

export interface IJobHarvest extends IJob {
    
}