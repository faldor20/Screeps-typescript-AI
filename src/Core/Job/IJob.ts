import { IActions } from '../../Actions';

export interface IJobInfo {
    name: string;
    targetObjectId: string;
    jobAction: IActions;
}

export interface IJob extends IJobInfo {
    run: (creep: Creep) => void
}