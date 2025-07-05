const path = 'drawings/index.html';

function loadFromFile() {
    const currentPage = window.location.pathname.split("https://www.tlu.ee/").pop().split(".")[0];
    console.log(currentPage);


    $.get("database.txt", (data) => {
        let content = JSON.parse(data).content;

        $(".maincontent").html("");

        content.forEach(item => {
            if (currentPage == 'main') {
                //console.log(item);
                $(".maincontent").append(`
                <div class="drawingBlock">
                <div class="hyperImage">
                    <a href="fulldrawing958e.html?id=${item.filename}">
                    <img class="mainImage" src="${path + item.filename}" alt="${item.name + " " + item.category + ' drawing'}"></a>
                </div>
                    <div class="textblock">
                        <h2>${item.name}</h2>
                        <p>${item.time}</p>
                    </div>
                </div>
            `);
            } else {
                if (item.category && item.category.includes(currentPage)) {
                    $(".maincontent").append(`
                <div class="drawingBlock">
                <div class="hyperImage">
                    <a href="fulldrawing958e.html?id=${item.filename}">
                    <img class="mainImage" src="${path + item.filename}" alt="${item.name + " " + item.category + ' drawing'}"></a>
                </div>
                    <div class="textblock">
                        <h2>${item.name}</h2>
                        <p>${item.time}</p>
                    </div>
                </div>
                `);
                }
            }
        });
    });
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function openFullArtwork() {
    //document.querySelector('.mainImage').removeEventListener('click', openFullArtwork);
    const drawingName = getQueryParam("id");

    $.get("database.txt", (data) => {
        const allDrawings = JSON.parse(data).content;
        const item = allDrawings.find(d => d.filename === drawingName);

        if (!item) {
            $("#title").text("drawing not found");
            return;
        }

        $('.title').text(item.name);
        $('#drawing').attr('src', path + item.filename);
        $('#drawing').attr('alt', item.name + ' ' + item.category + " drawing");
        $('#description').text(item.description);
        $('#timePeriod').text(item.time);
        $('#category').text(item.category);

        /*$(function () {
            var artId = item.name;
            var loaded = parseInt(localStorage.getItem('loaded_' + artId), 10);
            var loaded_numb = loaded ? loaded + 1 : 1;
            localStorage.setItem('loaded_' + artId, loaded_numb);

            $('body').append('<p id="jaagup">This page was loaded by you ' + loaded_numb + ' times!</p>');
        });*/

    })

}

window.onload = () => {
    loadFromFile();
    //document.querySelector('.mainImage').addEventListener('click', openFullArtwork);
    $(document).ready(openFullArtwork);
};
