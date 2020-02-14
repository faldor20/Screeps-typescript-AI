/*
class HarvestPositions {
	public Positions:{[objectID:string] free:number, taken:number }
  private free: {<string>} = new Set<string>();
  private taken: Set<string> = new Set<string>();

  public get count(): number {
    return this.free.size + this.taken.size;
  }

  public HarvestPoints(free: Set<string>) {
    this.free = free;
  }
  public Take(point: string) {
    this.free.delete(point);
    this.taken.add(point);
  }
  public Release(point: string) {
    this.taken.delete(point);
    this.free.add(point);
  }
  public GetFree(): string | null {
    for (const x of this.free) {
      return x;
    }
    return null;
  }
}
 */

class InteractionPositions {
  constructor(free: number) {
    this._free = free;
    this._taken = 0;
  }
  private _free: number;
  private _taken: number;
  public get count(): number {
    return this._taken + this._free;
  }
  public get free(): number {
    return this._free;
  }
  public get taken(): number {
    return this._taken;
  }
  public Take() {
    this._free--;
    this._taken++;
  }
  public Release(point: string) {
    this._free++;
    this._taken--;
  }
}
