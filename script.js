const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count= 10;
const apiKey = 'k8fa36h4Y3aJBuBKu6L9sGAggfbYHfjnp40JLINbu94';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotosElement() {
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        //Create <img> for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        //Put <img> inside <a>, then put both inside image container element
        setAttributes(img, {
           src: photo.urls.regular,
           alt: photo.alt_description,
           title: photo.alt_description
        });
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