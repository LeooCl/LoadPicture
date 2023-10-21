import { LoadPicture } from "./classes/LoadPicture.js";

const pictures = new LoadPicture({
    url: 'https://jsonplaceholder.typicode.com/photos',
    area: 'main section.photo',
    pictureNumber: 10,
    order: 'ASC'
});

pictures.load();