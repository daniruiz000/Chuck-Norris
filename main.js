let url = 'https://api.chucknorris.io/jokes/categories';

let arrayCategory = [];

let container = document.getElementsByClassName('container')[0];

function btnCategory() {
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => pintarBtn(respuesta))
    .catch(error => console.log(error))
}

function pintarBtn(array) {
    console.log(array);
    array.forEach(element => {

        let button = document.createElement('button');
        button.className = 'btn';
        button.textContent = element;
        container.appendChild(button);
       
    });
}


btnCategory();

