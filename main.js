

//Identification:

let container = document.getElementsByClassName('container__box')[0];
let btnDivBox = document.getElementsByClassName('container__basic-btn')[0];
let joke = document.getElementsByClassName('joke__text')[0];


//Variables:

let url = 'https://api.chucknorris.io/jokes/categories';
let urlBasic = 'https://api.chucknorris.io/jokes/random?category=';
let urlAleatorie = 'https://api.chucknorris.io/jokes/random?category=food,dev';
let urlCategorie='';
let categoriesSelected = [];


//Functions:

function pintarBtnBasicos() {
    
    let btnNewJoke = document.createElement('container__btn');
    let btnReset = document.createElement('container__btn');

    btnNewJoke.classList.add('container__btn-send','container__btn');
    btnNewJoke.textContent = 'New Joke';
    btnDivBox.appendChild(btnNewJoke);

    btnReset.classList.add('container__btn-reset','container__btn');
    btnReset.textContent = 'Reset';
    btnDivBox.appendChild(btnReset);

    btnReset.addEventListener('click', borrarCategories);
    btnNewJoke.addEventListener('click', enviarCategories);
}

function btnCategory() {

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => pintarBtn(respuesta))
    .catch(error => console.log(error))
}

function pintarBtn(array) {   

    array.forEach((element) => {

        let button = document.createElement('button');
        button.className = 'container__btn';
        button.textContent = element;
        container.appendChild(button);
        button.addEventListener('click',function(){anadirCategoria(element)});

    });
}

function anadirCategoria(categorie) {
    categoriesSelected.push(categorie);
    console.log(categoriesSelected);
    urlCategorie = urlBasic + categoriesSelected.toString();
    console.log(urlCategorie);
}

function enviarCategories() {
    if (categoriesSelected === []) {
        jokeAleatorie();
    } else {
        fetch(urlCategorie)
        .then(respuesta => respuesta.json())
        .then(respuesta => joke.textContent = respuesta.value)
        .catch(error => console.log(error))
    }
   
}

function borrarCategories() {
    categoriesSelected = [];
    joke.textContent = '';
}

function jokeAleatorie() {
    fetch(urlAleatorie)
    .then(respuesta => respuesta.json())
    .then(respuesta => joke.textContent = respuesta.value)
    .catch(error => console.log(error)) 
}


//Calling functions:

pintarBtnBasicos()
btnCategory(); 