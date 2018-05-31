// type shim for nodejs' `require()` syntax
// for stricter node.js typings, remove this and install `@types/node`
declare const require: (module: string) => any;

interface CreepMemory { [name: string]: any };
interface FlagMemory { [name: string]: any };
interface SpawnMemory { [name: string]: any };
interface RoomMemory { [name: string]: any };
