// Hangi elemendid
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const galleryWrapper = document.querySelector(".gallery-wrapper");
const galleryItems = document.querySelectorAll(".gallery-item");

// Kloonime esimesed ja viimased pildid
const firstClone = galleryItems[0].cloneNode(true);
const lastClone = galleryItems[galleryItems.length - 1].cloneNode(true);

// Lisame need galeriisse
galleryWrapper.appendChild(firstClone); // Esimene kloon lõppu
galleryWrapper.insertBefore(lastClone, galleryItems[0]); // Viimane kloon algusesse

// Uuendatud pildi nimekiri koos kloonidega
const allItems = document.querySelectorAll(".gallery-item");
let currentIndex = 1; // Alustame 1. pildist (mitte kloonitud!)
const itemsPerPage = 4;
let autoScroll;

// Seame algpositsiooni
galleryWrapper.style.transform = `translateX(${-currentIndex * (100 / itemsPerPage)}%)`;

// Funktsioon piltide liigutamiseks
function moveGallery(direction) {
    if (direction === 'next') {
        currentIndex++;
    } else if (direction === 'prev') {
        currentIndex--;
    }

    updateGallery();

    // Kui jõuame lõppu, hüppame sujuvalt algusesse
    if (currentIndex >= allItems.length - itemsPerPage) {
        setTimeout(() => {
            galleryWrapper.style.transition = "none";
            currentIndex = 1; // Tagasi esimese tegeliku pildi juurde
            updateGallery();
        }, 500);
    }

    // Kui jõuame algusesse, hüppame sujuvalt lõppu
    if (currentIndex <= 0) {
        setTimeout(() => {
            galleryWrapper.style.transition = "none";
            currentIndex = allItems.length - itemsPerPage - 1;
            updateGallery();
        }, 500);
    }
}

// Funktsioon galeriit uuendamiseks vastavalt praegusele indeksile
function updateGallery() {
    const offset = -currentIndex * (100 / itemsPerPage);
    galleryWrapper.style.transition = "transform 0.5s ease-in-out";
    galleryWrapper.style.transform = `translateX(${offset}%)`;
}

// Lisame nuppudele klikkimise funktsioonid
prevBtn.addEventListener("click", function () {
    moveGallery("prev");
});

nextBtn.addEventListener("click", function () {
    moveGallery("next");
});

// Automaatne liikumine iga 2 sekundi järel
function startAutoScroll() {
    autoScroll = setInterval(function () {
        moveGallery("next");
    }, 2000);
}

function stopAutoScroll() {
    clearInterval(autoScroll);
}

// Peatab automaatse kerimise, kui hiir on pildi peal
allItems.forEach(item => {
    item.addEventListener("mouseenter", stopAutoScroll);
    item.addEventListener("mouseleave", startAutoScroll);
});

// Alustame automaatset kerimist
startAutoScroll();
