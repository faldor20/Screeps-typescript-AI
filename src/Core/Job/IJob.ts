export interface IJob {
    name: string;
    run: (creep: Creep) => void;
}

export interface IJobInfo {
    name: string;
}