class HarvestPoints {
  private free: Set<string> = new Set<string>();
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

