import { IJobHarvest, IJobHarvestInfo } from './';
import { Job } from '../../Core';

import { ActionHarvest } from '../../Actions';

export class JobHarvest extends Job implements IJobHarvest {
    constructor(jobHarvestInfo: IJobHarvestInfo) {
        super({
            name: 'Harvest Job',
            targetObjectId: jobHarvestInfo.targetObjectId,
            jobAction: ActionHarvest
        })

    }
}