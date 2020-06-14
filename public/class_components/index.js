import Albums from './albums/albums';

document.addEventListener('DOMContentLoaded', () => {

    let container = document.getElementById("albums-container");
    new Albums(container).render();

});
