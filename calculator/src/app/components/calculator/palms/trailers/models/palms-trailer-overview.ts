import { CloudinaryImage } from '@cloudinary/url-gen';

export interface PalmsTrailerOverview {
    id: number;
    name: string;
    grossWeight: string;
    frame: string;
    loadingAreaCross: string;
    maxCraneSize: string;
    drawbarControlCylinders: string;
    beamType: string;
    imageUrl: string;
    image: CloudinaryImage;
}
