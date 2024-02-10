
import { PalmsCrane } from "./palms-crane";

export interface PalmsTrailer {
    id: number;
    name: string;
    description: string;
    price: string;
    beamType: string;
    loadingAreaCross: string;
    loadingAreaLength: string;
    frame: string;
    frameExtensionLength: string;
    grossWeight: string;
    curbWeight: string;
    totalLength: string;
    widthWithStandardWheels: string;
    standardWheelSize: string;
    maxCraneSize: string;
    drawbarControlCylinders: string;
    crane: PalmsCrane[];
    imgUrl: string[]
}