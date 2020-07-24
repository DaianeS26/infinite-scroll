const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count= 10;
const apiKey = 'k8fa36h4Y3aJBuBKu6L9sGAggfbYHfjnp40JLINbu94';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function displayPhotosElement() {
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        //Put <img> inside <a>, then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


async function getPhotosAPI() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotosElement();
    } catch(error) {

    }
}

getPhotosAPI();