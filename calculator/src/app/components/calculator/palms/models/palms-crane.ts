import { PalmsTrailer } from "./palms-trailer";

export interface PalmsCrane {
    id: number;
    name: string;
    description: string;
    price: string;
    series: string;
    maxReach: string;
    liftAtFullReach240Bar: string;
    liftAtFullReach215Bar: string;
    liftAtFullReach190Bar: string;
    liftAtFourMeters240Bar: string;
    liftAtFourMeters215Bar: string;
    liftAtFourMeters190Bar: string;
    brutLiftingTorque240Bar: string;
    brutLiftingTorque215Bar: string;
    brutLiftingTorque190Bar: string;
    slewingCylinder: string;
    slewingTorque: string;
    workingPressure: string;
    rotatorMaximumLoad: string;
    craneWeight: string;
    pillarSlewingAngle: string;
    recommendedOilFlow: string;
    trailer: PalmsTrailer[]
}