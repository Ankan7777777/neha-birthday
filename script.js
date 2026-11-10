
// PHOTO SLIDESHOW

const photoCards = document.querySelectorAll(".photo-card");

const viewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerCaption = document.getElementById("viewerCaption");
const photoCounter = document.getElementById("photoCounter");

let currentPhoto = 0;

const photos = Array.from(photoCards).map(card => ({
    src: card.querySelector("img").src,
    caption: card.querySelector("p").textContent
}));

function showPhoto(index) {

    currentPhoto = (index + photos.length) % photos.length;

    viewerImage.src = photos[currentPhoto].src;

    viewerCaption.textContent = photos[currentPhoto].caption;

    photoCounter.textContent =
        `${currentPhoto + 1} / ${photos.length}`;

    viewerImage.style.animation = "none";

    void viewerImage.offsetWidth;

    viewerImage.style.animation = "photoZoom .35s ease";

}

function openViewer(index) {

    showPhoto(index);

    viewer.classList.add("show");

    document.body.style.overflow = "hidden";

}

function closeViewer() {

    viewer.classList.remove("show");

    document.body.style.overflow = "hidden";

}

function changePhoto(direction) {

    showPhoto(currentPhoto + direction);

}

// Click on gallery photos

photoCards.forEach((card, index) => {

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        openViewer(index);
    });

});

// Keyboard navigation

document.addEventListener("keydown", event => {

    if (!viewer.classList.contains("show")) return;

    if (event.key === "Escape") closeViewer();

    if (event.key === "ArrowRight") changePhoto(1);

    if (event.key === "ArrowLeft") changePhoto(-1);

});

// Mobile swipe

let touchStartX = 0;

viewer.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

viewer.addEventListener("touchend", event => {

    const touchEndX = event.changedTouches[0].screenX;

    const difference = touchEndX - touchStartX;

    if (Math.abs(difference) < 50) return;

    changePhoto(difference < 0 ? 1 : -1);

}, { passive: true });
