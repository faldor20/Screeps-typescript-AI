 export function scanRoom(room: Room) {
    let sources: Source[] = room.find(FIND_SOURCES);
     let jobs:string[]=[];
    sources.forEach(source => {
      let pos: RoomPosition = source.pos;
        let objectsAround: Terrain[]= [];
        let roomname: string = source.room.name;
      let collectionSpotCount: number = 0;
      objectsAround[0] = Game.map.getTerrainAt(pos.x + 1, pos.y + 1,roomname);
      objectsAround[2] = Game.map.getTerrainAt(pos.x + 1, pos.y + 0,roomname);
      objectsAround[1] = Game.map.getTerrainAt(pos.x + 0, pos.y + 1,roomname);
      objectsAround[3] = Game.map.getTerrainAt(pos.x - 1, pos.y + 1,roomname);
      objectsAround[4] = Game.map.getTerrainAt(pos.x - 1, pos.y + 0,roomname);
      objectsAround[5] = Game.map.getTerrainAt(pos.x - 1, pos.y - 1,roomname);
      objectsAround[6] = Game.map.getTerrainAt(pos.x - 0, pos.y - 1,roomname);
      objectsAround[7] = Game.map.getTerrainAt(pos.x + 1, pos.y - 1,roomname);
        objectsAround.forEach(spot => {
          if (spot !="wall") {
            collectionSpotCount++;
            jobs.push(source.id);
        }
        });
     //  room.memory.sources={sourceInfo}
    //  source.memory.collectionPoints = collectionSpotCount;
    //  room.memory.collectionPoints += collectionSpotCount;
     //   souceinfo[i] = new sourceInfo(source.id, collectionSpotCount, 0);
     });
     console.log("scannig room:" + room.name);
     room.memory.harvestPoints
         = { free: jobs, taken: [] };
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
