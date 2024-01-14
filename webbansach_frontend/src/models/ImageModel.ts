class ImageModel {
    imageID: number;
    imageName?: string;
    icon?: boolean;
    link?: string;
    imageData?: string;

    constructor(
        imageID: number,
        imageName?: string,
        icon?: boolean,
        link?: string,
        imageData?: string,
    ){
        this.imageID = imageID;
        this.imageName = imageName;
        this.icon = icon;
        this.link = link;
        this.imageData = imageData;
    }
}

export default ImageModel