 export function scanRoom(room: Room) {
    let sources: Source[] = room.find(FIND_SOURCES);
    let souceinfo: sourceInfo[];
     let i: number;
     let jobs:string[]=[];
    sources.forEach(source => {
        i++;
      let pos: RoomPosition = source.pos;
      let objectsAround: LookAtResult<LookConstant>[][] = [];
      let collectionSpotCount: number = 0;
      objectsAround[0] = source.room.lookAt(pos.x + 1, pos.y + 1);
      objectsAround[1] = source.room.lookAt(pos.x + 0, pos.y + 1);
      objectsAround[2] = source.room.lookAt(pos.x + 1, pos.y + 0);
      objectsAround[3] = source.room.lookAt(pos.x - 1, pos.y + 1);
      objectsAround[4] = source.room.lookAt(pos.x - 1, pos.y + 0);
      objectsAround[5] = source.room.lookAt(pos.x - 1, pos.y - 1);
      objectsAround[6] = source.room.lookAt(pos.x - 0, pos.y - 1);
      objectsAround[7] = source.room.lookAt(pos.x + 1, pos.y - 1);
      objectsAround.forEach(spot => {
        if (spot.filter((value: LookAtResult<LookConstant>,
              index: number,
              obj: LookAtResult<LookConstant>[]) => {
              if (value.terrain == "swamp") return false;
            else return true;
          })) {
            collectionSpotCount++;
            jobs.push(source.id);
        }
        });
     //  room.memory.sources={sourceInfo}
    //  source.memory.collectionPoints = collectionSpotCount;
    //  room.memory.collectionPoints += collectionSpotCount;
     //   souceinfo[i] = new sourceInfo(source.id, collectionSpotCount, 0);
    });
     room.memory.jobs.harvester = { free:jobs,taken:[] };
}
  class jobs {
      constructor(sourceID:string,collectionPoints:number,currentlyCollecting:number) {
        let sourceid:string = sourceID;
        let collectionpoints: number = collectionPoints;
        let currentlycollecting:number = currentlyCollecting;
      }
}
interface sourceJobs
{
    free: string[];
    taken: string[];
 }

/*
export function scanRoom(room: Room) {
    let sources: Source[] = room.find(FIND_SOURCES);
    room.memory.collectionPoints = sources.length * 2;


    sources.forEach(source => {
Game.spawns["Sp1"]
    });
    room.memory.jobs.harvester=
}
 */
