import { IJob, IJobInfo } from './';

class Job implements IJob {
    name: string;

    constructor(jobInfo: IJobInfo) {
        this.name = jobInfo.name;
    }

    run(creep: Creep): void;
}