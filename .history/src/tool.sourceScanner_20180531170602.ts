
    /** @param {Room} room **/
  export function scan(room:Room) {
      let sources:Source[] = room.find(FIND_SOURCES);
      sources.forEach(source => {
          let pos: RoomPosition = source.pos;
          let objectsAround:LookAtResult<LookConstant>[][]=[];
          objectsAround[0]= source.room.lookAt(pos.x + 1, pos.y + 1);
          source.room.lookAt(pos.x + 1, pos.y + 0);
          source.room.lookAt(pos.x + 0, pos.y + 1);
          source.room.lookAt(pos.x - 1, pos.y + 1);
          source.room.lookAt(pos.x - 1, pos.y + 0);
          source.room.lookAt(pos.x - 1, pos.y - 1);
          source.room.lookAt(pos.x - 0, pos.y - 1);
          source.room.lookAt(pos.x + 1, pos.y - 1);
});
    }

