export interface IAction {
    name: string;
    run: (targetId: string, creep: Creep) => void;
}