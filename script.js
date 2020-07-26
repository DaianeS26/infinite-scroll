const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count= 30;
const apiKey = 'k8fa36h4Y3aJBuBKu6L9sGAggfbYHfjnp40JLINbu94';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotosElement() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        //Create <img> for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
           src: photo.urls.regular,
           alt: photo.alt_description,
           title: photo.alt_description
        });
        //Event Listener check when images finished loading
        img.addEventListener('load', imageLoaded());

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

//Check to see if scrolling near the bottom. Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
       ready = false;
       getPhotosAPI();
    }
})


//On load
getPhotosAPI();