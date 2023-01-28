

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
let btnVariable;

//Functions:

function pintarBtnBasicos() {
    
    let btnNewJoke = document.createElement('button');
    let btnReset = document.createElement('button');

    btnNewJoke.classList.add('container__btn-send','container__btn');
    btnNewJoke.textContent = 'NEW JOKE';
    btnDivBox.appendChild(btnNewJoke);

    btnReset.classList.add('container__btn-reset','container__btn');
    btnReset.textContent = 'RESET';
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

    array.forEach((element, index) => {

        btnVariable = document.createElement('button');
        btnVariable.className = 'container__btn';
        btnVariable.setAttribute('id',index);
        btnVariable.textContent = element;
        container.appendChild(btnVariable);
        btnVariable.addEventListener('click',function(){anadirCategoria(element, index)});

    });
}

function anadirCategoria(categorie, index) {
    let btnSelect = document.getElementById(index);
    btnSelect.classList.add('container__btn--select');
    console.log(categoriesSelected);
    
        if ( categoriesSelected.includes(categorie)){
            
            btnSelect.classList.remove('container__btn--select');
            let posArrayCtegr = categoriesSelected.indexOf(categorie);
            categoriesSelected.splice(posArrayCtegr,1);
            console.log(categoriesSelected);
        
    
        }else{ 
            categoriesSelected.push(categorie);
            console.log(categoriesSelected);
            urlCategorie = urlBasic + categoriesSelected.toString();
            console.log(urlCategorie);
        }
}

function enviarCategories() {
    let url1 = urlCategorie ;
    console.log(url1);
    
        fetch(url1)
        .then(respuesta => respuesta.json())
        .then(respuesta => joke.textContent = respuesta.value)
        .catch(error => console.log(error))
    }
   


function borrarCategories() {
    categoriesSelected = [];
    joke.textContent = '';
}

function jokeAleatorie() {
    fetch(urlAleatorie)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        console.log(respuesta);
        joke.textContent = respuesta.value;
    })
    .catch(error => console.log(error)) 
}



//Calling functions:

pintarBtnBasicos()
btnCategory(); 