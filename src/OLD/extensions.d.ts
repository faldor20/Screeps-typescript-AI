interface Iinteractable{
	interactionPoisitions:InteractionPositions;

}

interface HasStorage extends Structure, Iinteractable {
    energyCapacity: number;
    energy: number;
}
interface Source extends Iinteractable
{
    //get():void;
  //  set(value: any): any;
   // collectionPoints: number;
   // currentlyCollecting: number;
    distanceFromStorage:number;
}


//Source.prototype.collectionPositions = 1
