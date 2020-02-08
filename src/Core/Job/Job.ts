import { IJob, IJobInfo } from './';
import { IActions } from '../../Actions';

export abstract class Job implements IJob {
    name: string;
    targetObjectId: string;
    jobAction: IActions;

    constructor(jobInfo: IJobInfo) {
        this.name = jobInfo.name;

        this.targetObjectId = jobInfo.targetObjectId;

        this.jobAction = jobInfo.jobAction;
    }

    run(creep: Creep): void {
        this.jobAction.run(this.targetObjectId, creep);
    }
}