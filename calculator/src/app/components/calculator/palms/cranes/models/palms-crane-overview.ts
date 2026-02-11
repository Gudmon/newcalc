import { CloudinaryImage } from '@cloudinary/url-gen';

export interface PalmsCraneOverview {
    id: number;
    name: string;
    maxReach: string;
    brutLiftingTorque215Bar: string;
    brutLiftingTorque190Bar: string;
    telescopeLength: string;
    slewingCylinder: string;
    slewingTorque: string;
    price: string;
    imageUrl: string;
    image: CloudinaryImage;
}
