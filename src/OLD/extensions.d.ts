interface HasStorage extends Structure, Iinteractable {
    energyCapacity: number;
    energy: number;
}
//Source.prototype.collectionPositions = 1
interface Iinteractable{
	interactionPoisitions:InteractionPositions;
}
