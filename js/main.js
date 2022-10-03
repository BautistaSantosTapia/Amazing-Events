const URI = "https://amazing-events.herokuapp.com/api/events"

/////////  elementos del index
const inputSearch = document.getElementById('searchbox')
const divCheckboxes = document.getElementById('ds12')
let cartasCont = document.getElementById('dcrd1')
/////////  elementos del datails
let cartasContDetails = document.getElementById('sec61')
////////   elementos del upcoming
let cartasContUp = document.getElementById('dcrd2')
const divCheckboxesUp = document.getElementById('ds22')
////////   elementos del past
let cartasContPast = document.getElementById('dcrd3')
const divCheckboxesPast = document.getElementById('ds32')
///////    elementos del stats
let masAudiencia = document.getElementById('mayorAudiencia')
let menosAudiencia = document.getElementById('menorAudiencia')
let masCapacidad = document.getElementById('mayorCapacidad')
let divTabla2 = document.getElementById('t52')
let divTabla3 = document.getElementById('t53')


cargarDatos(URI)
let arrayPorc = []
let arrayCapa = []
let cartas;
function cargarDatos(URL) {
    fetch(URL).then(respuesta => respuesta.json()).then(data =>{
        console.log(data);
        cartas = data.events
        console.log(cartas);
        //index
        if (cartasCont != null) {
            
        pintarCartas(cartas/* , "dcrd1" */)
        
        inputSearch.addEventListener('keyup', ()=>{
            let arraySearchFiltrado = filtrarPorSearch(data.events,inputSearch.value)
            console.log(arraySearchFiltrado)
            let arrayChecksFiltrado = filtrarPorCheck(arraySearchFiltrado)
            pintarCartas(arrayChecksFiltrado/* , "dcrd1" */)
        })
        divCheckboxes.addEventListener('change', ()=>{
            let arrayChecksFiltrado = filtrarPorCheck(data.events)
            console.log(arrayChecksFiltrado)
            let arraySearchFiltrado = filtrarPorSearch(arrayChecksFiltrado, inputSearch.value)
            pintarCartas(arraySearchFiltrado/* , "dcrd1" */)
        })
        } 
        //       
        
        //details
        if (cartasContDetails != null) {
            pintarCartasDetails(cartasId/* , "sec61" */)
        }
        //

        // up
        if (cartasContUp != null) {
            let filtroUpCarta = cartas.filter(carta => carta.date > data.currentDate)
            console.log(filtroUpCarta);
            pintarUpCartas(filtroUpCarta/*, "dcrd2"*/)

            inputSearch.addEventListener('keyup', ()=>{
                let arraySearchFiltrado = filtrarPorUpSearch(filtroUpCarta,inputSearch.value)
                console.log(arraySearchFiltrado)
                let arrayChecksFiltrado = filtrarPorUpCheck(arraySearchFiltrado)
                pintarUpCartas(arrayChecksFiltrado/* , "dcrd1" */)
            })
            divCheckboxesUp.addEventListener('change', ()=>{
                let arrayChecksFiltrado = filtrarPorUpCheck(filtroUpCarta)
                console.log(arrayChecksFiltrado)
                let arraySearchFiltrado = filtrarPorUpSearch(arrayChecksFiltrado, inputSearch.value)
                pintarUpCartas(arraySearchFiltrado/* , "dcrd1" */)
            })
        }
        //

        // past
        if (cartasContPast != null) {
                let filtroPastCarta = cartas.filter(carta => carta.date < data.currentDate)
            console.log(filtroPastCarta);
            pintarPastCartas(filtroPastCarta/*, "dcrd2"*/)

            inputSearch.addEventListener('keyup', ()=>{
                let arraySearchFiltrado = filtrarPorPastSearch(filtroPastCarta,inputSearch.value)
                console.log(arraySearchFiltrado)
                let arrayChecksFiltrado = filtrarPorPastCheck(arraySearchFiltrado)
                pintarPastCartas(arrayChecksFiltrado/* , "dcrd3" */)
            })
            divCheckboxesPast.addEventListener('change', ()=>{
                let arrayChecksFiltrado = filtrarPorPastCheck(filtroPastCarta)
                console.log(arrayChecksFiltrado)
                let arraySearchFiltrado = filtrarPorPastSearch(arrayChecksFiltrado, inputSearch.value)
                pintarPastCartas(arraySearchFiltrado/* , "dcrd3" */)
            })
        }
        //

        // stats
        if (menosAudiencia != null) {
            
        console.log(tabla1(cartas));
        /* console.log(arrayPorc);
        let numMax = Number(Math.max(...arrayPorc)) 
        console.log(numMax + "%");
        //if (numMax.includes(cartas.name)) {
            masAudiencia.innerHTML = `${numMax}%`
        //}////////////////nmbr
        let numMin = Number(Math.min(...arrayPorc))
        console.log(numMin + "%");
        menosAudiencia.innerHTML = `${numMin}%` */ 
        
        //console.log(arrayCapa);
        //let capaMax = Number(Math.max(...arrayCapa))
        //console.log(capaMax);

        cartas.sort(function(a,b){
            return b.capacity - a.capacity
        })
        console.log(cartas[0].name);
        console.log(cartas[0].capacity);
        var capaNombre = cartas[0].name;
        var capaCapacity = cartas[0].capacity
        masCapacidad.innerHTML = `${capaNombre + ": " + capaCapacity}` 
        //////////////////////////////////////////////////
        /* cartas.sort(function(a,b){
            return b.percent - a.percent
        }) */
        


        console.log(tabla2());
        let filtroUpTabla = cartas.filter(carta => carta.date > data.currentDate)
        filtroUpTabla.forEach(x =>{
            let fila = document.createElement('tr')
            fila.style.fontSize = "0.35cm" 
            fila.style.displayFlex
            fila.innerHTML = `<tr>
            <td id="upCate">${x.category + " (" + x.name + ")"}</td>
            <td id="upReve">${"$" + x.price * x.estimate}</td>
            <td id="upAtte">${(x.estimate * 100 / x.capacity).toFixed(2) + "%"}</td>
            </tr>`;
            divTabla2.appendChild(fila)
        })



        /*let cateTabla = filtroUpTabla.map(carta => carta.category)
        console.log(cateTabla);
        let cateTablaNoRepe = new Set(cateTabla)
        console.log(cateTablaNoRepe);*/
        //divTabla2.innerHTML = ""
        //cateTablaNoRepe.forEach(cate =>{
            /*let fila = document.createElement('tr')
            //fila.className = 
            fila.innerHTML = `<tr>
            <td id="upCate">${cate}</td>
            <td id="upReve">reve</td>
            <td id="upAtte">atte</td>
            </tr>`;
            divTabla2.appendChild(fila)*/
        //})

        //let priceTabla = filtroUpTabla.map((carta) => carta.price)
        //console.log(priceTabla);
        /* if (priceTabla.includes(cateTabla)){
            console.log();
        } */
        // arreglar el css de la tabla
        console.log(tabla3());
        let filtroPastTabla = cartas.filter(carta => carta.date < data.currentDate)
        filtroPastTabla.forEach(y =>{
            let fila = document.createElement('tr')
            fila.style.fontSize = "0.35cm" 
            fila.style.displayFlex
            //fila.className = 
            fila.innerHTML = `<tr>
            <td id="upCate">${y.category + " (" + y.name + ")"}</td>
            <td id="upReve">${"$" + y.price * y.assistance}</td>
            <td id="upAtte">${(y.assistance * 100 / y.capacity).toFixed(2) + "%"}</td>
            </tr>`;
            divTabla3.appendChild(fila)
        })
        }
        //
    })
} 


////////////////// index
function filtrarPorSearch(arrayCartas, text) {
    let arrayFiltrado = arrayCartas.filter(elementoEnData => elementoEnData.name.toLowerCase().includes(text.toLowerCase()))
    return arrayFiltrado
} 

function pintarCartas(arrayCartas/* , divId */) {
    //let cartasCont = document.getElementById(divId)
    cartasCont.innerHTML=""
    if (arrayCartas.length == 0) {
        console.log("aleta de no hay nada");
        let card = document.createElement("div")
                card.innerHTML = `
                <div class="card11" >
                    <div class="cd112">
                        <h5>No hay nada</h5>
                        <p>Ajuste los parametros de busqueda para poder seguir navegando por la web</p>
                    </div>
                </div>`;
                cartasCont.appendChild(card)
    } else{
        arrayCartas.forEach(carta => {
            let card = document.createElement("div")
            card.innerHTML = `
            <div class="card11" >
                <div class="cd111img">
                    <img src="${carta.image}" alt="comida">
                </div>
                <div class="cd112">
                    <h5>${carta.name}</h5>
                    <p>${carta.description}</p>
                </div>
                <div class="cd113">
                    <p class="card-link"><b>Price: $${carta.price}</b></p>
                    <a href="./details.html?_id=${carta._id}" class="card-link">View More</a>
                </div>
            </div>`;
            cartasCont.appendChild(card)
        });
    } 
}

function filtrarPorCheck(arrayCartas) {
    let arrayFiltrado = []
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes);
    let arrayCheckboxes = Array.from(checkboxes)
    console.log(arrayCheckboxes);
    let checkboxesFiltrados = arrayCheckboxes.filter(checkbox => checkbox.checked)
    console.log(checkboxesFiltrados);
    let checkvalues = checkboxesFiltrados.map(checkbox => checkbox.value)
    console.log(checkvalues);
    arrayFiltrado = arrayCartas.filter(data => checkvalues.includes(data.category))
    if (arrayFiltrado.length == 0) {
        return arrayCartas
    } 
    return arrayFiltrado 
}

///////////////////////////////////////details
let cartasId = location.search.split("?_id=").join("")
console.log(cartasId);

function pintarCartasDetails(cartasId/* , divId */) {

    //let cartasContDetails = document.getElementById(divId)
    let infoCarta = cartas.find(carta => carta._id == cartasId) 
    if (infoCarta.assistance == undefined) {
        let cartaDetails = document.createElement('div')
    cartaDetails.innerHTML = `
        <div class="ds62">
            <div class="ds63">
               <img src="${infoCarta.image}" alt="feria">
            </div>
            <div class="ds64">
                <h2>${infoCarta.name}</h2>
                <p>${infoCarta.description}</p>
                <p>Place: ${infoCarta.place}</p>
                <p>Date: ${infoCarta.date}</p>
                <p>Capacity: ${infoCarta.capacity}</p>
                <p>Estimate: ${infoCarta.estimate}</p>
                <p>Category: ${infoCarta.category}</p>
                <p>Price: $${infoCarta.price}</p>
            </div>
        </div> `;
    cartasContDetails.appendChild(cartaDetails)
    } else if (infoCarta.estimate == undefined) {
    let cartaDetails = document.createElement('div')
    cartaDetails.innerHTML = `
        <div class="ds62">
            <div class="ds63">
               <img src="${infoCarta.image}" alt="feria">
            </div>
            <div class="ds64">
                <h2>${infoCarta.name}</h2>
                <p>${infoCarta.description}</p>
                <p>Place: ${infoCarta.place}</p>
                <p>Date: ${infoCarta.date}</p>
                <p>Capacity: ${infoCarta.capacity}</p>
                <p>Assistance: ${infoCarta.assistance}</p>
                <p>Category: ${infoCarta.category}</p>
                <p>Price: $${infoCarta.price}</p>
            </div>
        </div> `;
    cartasContDetails.appendChild(cartaDetails)
    }
}

/////////////////////////////////////upcoming
function pintarUpCartas(arrayCartas/* , divId */) {
    //let cartasContUp = document.getElementById(divId)
    cartasContUp.innerHTML=""
    if (arrayCartas.length == 0){
        console.log("aleta de no hay nada");
        let card = document.createElement("div")
                card.innerHTML = `
                <div class="card22" >
                    <div class="cd222">
                        <h5>No hay nada</h5>
                        <p>Ajuste los parametros de busqueda para poder seguir navegando por la web</p>
                    </div>
                </div>`;
                cartasContUp.appendChild(card)
    } else{
        arrayCartas.forEach(upcarta => {
            let card = document.createElement("div")
            card.innerHTML = `
            <div class="card22">
                <div class="cd221img">
                    <img src="${upcarta.image}" alt="musica">
                </div>
                <div class="cd222">
                    <h5>${upcarta.name}</h5>
                    <p>${upcarta.description}</p>
                </div>
                <div class="cd223">
                    <p class="card-link"><b>Price: $${upcarta.price}</b></p>
                    <a href="details.html?_id=${upcarta._id}" class="card-link">View More</a>
                </div>
            </div>`;
            cartasContUp.appendChild(card)
        });
    }
}

function filtrarPorUpSearch(arrayCartas, text) {
    let arrayFiltrado = arrayCartas.filter(elementoEnData => elementoEnData.name.toLowerCase().includes(text.toLowerCase()))
    return arrayFiltrado
}

function filtrarPorUpCheck(arrayCartas) {
    let arrayFiltrado = []
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes);
    let arrayCheckboxes = Array.from(checkboxes)
    console.log(arrayCheckboxes);
    let checkboxesFiltrados = arrayCheckboxes.filter(checkbox => checkbox.checked)
    console.log(checkboxesFiltrados);
    let checkvalues = checkboxesFiltrados.map(checkbox => checkbox.value)
    console.log(checkvalues);
    arrayFiltrado = arrayCartas.filter(data => checkvalues.includes(data.category))
    if (arrayFiltrado.length == 0) {
        return arrayCartas
    } 
    return arrayFiltrado 
}

////////////////////////////////////past
function pintarPastCartas(arrayCartas/* , divId */) {
    //let cartasContPast = document.getElementById(divId)
    cartasContPast.innerHTML=""
    if (arrayCartas.length == 0){
        console.log("aleta de no hay nada");
        let card = document.createElement("div")
        card.innerHTML = `
            <div class="card31" >
                <div class="cd312">
                    <h5>No hay nada</h5>
                    <p>Ajuste los parametros de busqueda para poder seguir navegando por la web</p>
                </div>
            </div>`;
            cartasContPast.appendChild(card)
    } else{
        arrayCartas.forEach(pastcarta => {
            let card = document.createElement("div")
            card.innerHTML = `
            <div class="card31" >
                <div class="cd311img">
                    <img src="${pastcarta.image}" alt="maraton">
                </div>
                <div class="cd312">
                    <h5>${pastcarta.name}</h5>
                    <p>${pastcarta.description}</p>
                </div>
                <div class="cd313">
                    <p class="card-link"><b>Price: $${pastcarta.price}</b></p>
                    <a href="details.html?_id=${pastcarta._id}" class="card-link">View More</a>
                </div>
            </div>`;
            cartasContPast.appendChild(card)
        });
    }
}

function filtrarPorPastSearch(arrayCartas, text) {
    let arrayFiltrado = arrayCartas.filter(elementoEnData => elementoEnData.name.toLowerCase().includes(text.toLowerCase()))
    return arrayFiltrado
}

function filtrarPorPastCheck(arrayCartas) {
    let arrayFiltrado = []
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes);
    let arrayCheckboxes = Array.from(checkboxes)
    console.log(arrayCheckboxes);
    let checkboxesFiltrados = arrayCheckboxes.filter(checkbox => checkbox.checked)
    console.log(checkboxesFiltrados);
    let checkvalues = checkboxesFiltrados.map(checkbox => checkbox.value)
    console.log(checkvalues);
    arrayFiltrado = arrayCartas.filter(data => checkvalues.includes(data.category))
    if (arrayFiltrado.length == 0) {
        return arrayCartas
    } 
    return arrayFiltrado 
}

//////////////////////////////////stats

function tabla1() {
    var numMayor = 0;
    var objeto1;
    cartas.forEach(carta => {
        console.log(carta.category);
        var asistencia = Number(carta.assistance)
        var capacidad = Number(carta.capacity)
        console.log(asistencia);
        console.log(capacidad);
        
        var percent = asistencia * 100 / capacidad
        if (percent > numMayor) {
            numMayor = percent 
            objeto1 = carta
            
        }
    }) 
    console.log(numMayor);
    console.log(objeto1);
    masAudiencia.innerHTML = `${objeto1.name + ": " + numMayor + "%"}`
    var numMinimo = 100;
    var objeto2;
    cartas.forEach(carta =>{
        var asistencia = Number(carta.assistance)
        var capacidad = Number(carta.capacity)
        var percent = asistencia * 100 / capacidad
        if (percent < numMinimo) {
            numMinimo = percent
            objeto2 = carta
        }
    })
    console.log(numMinimo);
    console.log(objeto2);
    menosAudiencia.innerHTML = `${objeto2.name + ": " + numMinimo + "%"}`
    /*     if (!isNaN(percent)) {
            console.log(percent);
            var porcentajes = percent
        } */
   /* cartas.sort(function(a,b){

        return b.capacity - a.capacity
    })
    console.log(cartas[0].name);
    console.log(cartas[0].capacity);
    var capaNombre = cartas[0].name;
    var capaCapacity = cartas[0].capacity
    masCapacidad.innerHTML = `${capaNombre + ": " + capaCapacity}`  */
    /* arrayCartas.map((x)=>{
        return x.name 
    }) */
    /* percent.sort(function(a,b){
        return b - a
    })
    console.log(percent); */
    /* arrayCartas.sort(function(a,b){
        return b.capacity - a.capacity
    })
    console.log(arrayCartas[0].name);
    console.log(arrayCartas[0].capacity);
    var capaNombre = arrayCartas[0].name;
    var capaCapacity = arrayCartas[0].capacity */

}

function tabla2() {
    
}

function tabla3() {
    
}




//ya tengo la funcion que imprime, ya tengo la data desde el json, tengo hecho el filtro por search, por categoria y que se unan los filtros, tengo el mensaje de error, tengo que funcione el details, tambien up y past events y termine lo nuevo de stats y despues de todo eso unir los js`s en 1 y revise los index a fondo

/////////////////// kevin me dijo que no hace falta los checkbox y que de la tabla la estructura se podia tener en html
/////////////////// guille me dijo que la tabla estaba bien asi
//a lo ultimo fijarse que ande bien todo en todos
