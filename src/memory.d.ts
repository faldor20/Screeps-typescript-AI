interface CreepMemory {
    worker?: {
        targetobjectID: string
    }
    role: string
    [name: string]: any
    type: {
        [key: string]
        role:string
    }
}
interface FlagMemory { [name: string]: any }
interface SpawnMemory { [name: string]: any }
interface RoomMemory {
    Jobs: {
        harvest: string[],
        build: string[],
        repair: string[],
        upgrade:string[],
    }
    [name: string]: any
    harvestPoints: { free:string[],taken:string[] }
}
