export class Drive{
    // id: string;
    origin: string;
    destination: string;
    startDate: Date;
    finishDate: Date;
    driverId: string;
    createdAt: Date;
    seatsMax: number;
    seatsLeft: number;
    info: string;
    passengers: Array<string>;
    constructor(){}
}