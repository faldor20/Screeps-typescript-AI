import { harvestAction } from "OLD/creeps.jobs";

export function scanRoom(room: Room) {
  room.memory = Memory.rooms[room.name];
  room.memory.harvestPoints = { free: [], taken: [], count: 0 };
  room.memory.jobs = { build: [], harvest: [],upgrade:[],repair:[] };
    let sources: Source[] = room.find(FIND_SOURCES);
     let jobs:string[]=[];
    sources.forEach(source => {
      let pos: RoomPosition = source.pos;
        let objectsAround: Terrain[]= [];
        let roomName: string = source.room.name;
      let collectionSpotCount: number = 0;
      objectsAround[0] = Game.map.getTerrainAt(pos.x + 1, pos.y + 1,roomName);
      objectsAround[2] = Game.map.getTerrainAt(pos.x + 1, pos.y + 0,roomName);
      objectsAround[1] = Game.map.getTerrainAt(pos.x + 0, pos.y + 1,roomName);
      objectsAround[3] = Game.map.getTerrainAt(pos.x - 1, pos.y + 1,roomName);
      objectsAround[4] = Game.map.getTerrainAt(pos.x - 1, pos.y + 0,roomName);
      objectsAround[5] = Game.map.getTerrainAt(pos.x - 1, pos.y - 1,roomName);
      objectsAround[6] = Game.map.getTerrainAt(pos.x - 0, pos.y - 1,roomName);
      objectsAround[7] = Game.map.getTerrainAt(pos.x + 1, pos.y - 1,roomName);
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
     console.log("scanning room:" + room.name);
    /*  room.memory.harvestPoints
         = { free: jobs, taken: [] }; */
   //let
   room.memory.harvestPoints.free = jobs;
   room.memory.harvestPoints.count = jobs.length;
   room.memory.jobs.build = [];
   room.memory.jobs.harvest = [];
   room.memory.jobs.upgrade = [];
   room.memory.jobs.repair = [];
}
  /* class jobs {
      constructor(sourceID:string,collectionPoints:number,currentlyCollecting:number) {
        let sourceid:string = sourceID;
        let collectionpoints: number = collectionPoints;
        let currentlycollecting:number = currentlyCollecting;
      }
} */
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
