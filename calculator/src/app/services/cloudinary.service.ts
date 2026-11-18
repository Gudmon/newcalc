import { Injectable } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

@Injectable({
    providedIn: 'root'
})
export class CloudinaryService {
    readonly cloudinary = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });

    machinePreview(imagePublicId: string) {
        return this.cloudinary
            .image(imagePublicId)
            .resize(fill().width(800).height(533))
            .delivery(format('auto'))
            .delivery(quality('auto'));
    }
}
