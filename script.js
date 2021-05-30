const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const toTop = document.querySelector('.to-top');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//Unsplash API
const count = 5;
const apiKey = 'mmRnsB1DOSSdwb12h9R07WpT8F5tUTs4wO_UUXudep0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded (){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30
    }
    }

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

// Can scroll up with this button
window.addEventListener('scroll', () => {

    if(window.pageYOffset > 1000) {
        toTop.classList.add('active');
    } else {
        toTop.classList.remove('active');
    }
});


function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //Run function for each objet in photoArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description, 
            title: photo.alt_description, 
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Cath Error Here
    }
    
}
//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        console.log('load more');
    }
});

// On Load
getPhotos();