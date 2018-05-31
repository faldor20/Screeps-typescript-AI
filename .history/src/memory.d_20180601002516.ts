interface CreepMemory {
    worker?: {
        targetobjectID: string|null
    }
    role: string
    [name: string]: any
}
interface FlagMemory { [name: string]: any }
interface SpawnMemory { [name: string]: any }
interface RoomMemory {
    [name: string]: any
    harvestPoints: { free:string[],taken:string[] }
}
