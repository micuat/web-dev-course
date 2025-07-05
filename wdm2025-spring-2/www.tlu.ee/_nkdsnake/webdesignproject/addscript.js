let info = [];

class Artwork {
    constructor(name, description, timePeriod, category) {
        this.name = name;
        this.description = description;
        this.timePeriod = timePeriod;
        this.category = category;
    }
}

/*
function saveToFile(){
    document.querySelector('#addBtn').removeEventListener('click', saveToFile);
    let descInput = document.querySelector('#descriptionField').value;
    let file = document.querySelector('#fileBtn').value;
    let timeInput = document.querySelector('#timePeriodField').value;
    let inputCategory = document.querySelector('#categorySelect').value;
    let fileName = file.slice(12);
        console.log(fileName);
        if (!descInput || !file || !timeInput || !inputCategory){
            console.log('empty field');
            return;
        }

        /*let newEntry = {
            name: fileName,
            description: descInput,
            time: timeInput,
            category: inputCategory
        };*/
/*
        let newArt = new Artwork(fileName, descInput, timeInput, inputCategory)
        info.push(newArt);

        $.post('addFiles.php', { save: JSON.stringify(info) })
        .done(() => console.log("Success"))
        .fail(() => console.log("Fail"));
}*/
document.querySelector("#uploadForm").addEventListener("submit", function (e) {
    e.preventDefault(); // отменить обычную отправку

    const form = document.querySelector("#uploadForm");
    const formData = new FormData(form);

    const descInput = document.querySelector("#descriptionField").value;
    const timeInput = document.querySelector("#timePeriodField").value;
    const inputCategory = document.querySelector("#categorySelect").value;
    const file = document.querySelector("#fileBtn").files[0]; 

    if (!descInput || !file || !timeInput || !inputCategory){
            console.log('empty field');
            return;
        } else {
            formData.append("description", descInput);
            formData.append("timePeriod", timeInput);
            formData.append("category", inputCategory);
        
            fetch("uploadDrawing.php", {
                method: "POST",
                body: formData,
            })
                .then((res) => res.text())
                .then((data) => {
                    console.log("Server response:", data);
                })
                .catch((err) => {
                    console.error("Upload failed", err);
                });
        }

});


window.onload = () => {
    console.log("a");
    //document.querySelector('#addBtn').addEventListener('click', saveToFile);
};
