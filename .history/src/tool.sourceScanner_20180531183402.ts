/** @param {Room} room **/
export function scan(room: Room) {
  let sources: Source[] = room.find(FIND_SOURCES);
  sources.forEach(source => {
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
      if (spot.find((value: LookAtResult<LookConstant>,
            index: number,
            obj: LookAtResult<LookConstant>[]) => {
            if (value.terrain == "swamp") return false;
          else return true;
        })) {
        collectionSpotCount++;
      }
    });
    source.collectionPoints = collectionSpotCount;
    room.memory.collectionPoints += collectionSpotCount;
  });
}
