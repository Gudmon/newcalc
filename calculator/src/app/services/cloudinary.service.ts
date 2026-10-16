import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';

@Injectable({
    providedIn: 'root'
})
export class CloudinaryService {
    readonly cloudinary = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });
}
