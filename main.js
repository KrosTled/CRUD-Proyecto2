refresco()

const btn_add = document.querySelector("#btn1");
btn_add.addEventListener("click", e => {
    e.preventDefault()
    agregar()});
const input_add= document.querySelector("#crearText");
input_add.addEventListener("keypress", e => {
    if(e.key === "Enter"){
        e.preventDefault()
        agregar()
    }});


function read(key){
    return JSON.parse(window.localStorage.getItem(key)) || [];
}
function save(key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}
function filtrar(id){
    let list = read("crud");
    let elemento = list.filter(list => list.id == id);
    return elemento[0]
}

function refresco(){   
    const storage = window.localStorage;
    const lista = document.querySelector("#listaCRUD");
    let acumulado = JSON.parse(storage.getItem('crud'))
    lista.innerHTML=``
    
    if(acumulado !== null){ 
        acumulado.forEach((element) => {
            console.log(element.id)            
            lista.innerHTML += `<li id='${element.id}' class="row justify-content-center"><div class="col"><p class="alinear text-justify">${element.value}</p></div><div class="col-md-auto"><button class="btn btn-warning alinear" type="button" onclick="editar(this.parentElement.parentNode.id)">Editar</button></div>
            <div class="col col-lg-2"><button class="btn btn-danger alinear" type="button" onclick="eliminacion(this.parentElement.parentNode.id)">Eliminar</button></div></li>` 
        });
    }
}


function agregar(){
    const valor = document.querySelector('#crearText');
    const contenido = document.createTextNode(valor.value)
    const objetoCrud = {
        id: generateUUID(),
        value : contenido.data,
    }
    guardar(objetoCrud)
    refresco()
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function guardar(aregarElement){
    const storage = window.localStorage;
    let valida = storage.getItem('crud');
    let acumulado = [];
    
    if (valida != null){
        acumulado = JSON.parse(storage.getItem('crud'));
    }
    const valor = aregarElement;
    acumulado.push(valor);
    storage.setItem('crud', JSON.stringify(acumulado));
}

function eliminacion(id){
    const storage = window.localStorage;
    let list = read("crud");
    let filtrado = list.filter(list => list.id != id);
    storage.setItem('crud', JSON.stringify(filtrado));
    refresco()
}

function editar(id){
    const aEditar = document.getElementById(id)
    aEditar.innerHTML = `<li id='${id}' class="row"><div class="col"><input type="text" id="editar" class="form-control alinear"></div><div class="col-md-auto"><button class="btn btn-warning alinear" type="button" onclick="cambiarContenido(this)">Aplicar cambios</button></div>
    <div class="col col-lg-2"><button class="btn btn-secondary alinear" type="button" onclick="devolver(this)">volver</button></div></li>`   
}

function cambiarContenido(element){
    let list = read("crud");
    let id = element.parentElement.parentNode.id
    let contenido = element.parentElement.previousElementSibling.firstChild.value
    if(contenido !== ""){
        let elemento = filtrar(id)
        elemento.value = contenido
        save("crud",list)
        const elementoDevuelto = document.getElementById(id)
        elementoDevuelto.innerHTML = `<li id='${id}' class="row"><div class="col">${contenido}</div><div class="col-md-auto"><button class="btn btn-warning alinear" type="button" onclick="editar(this.parentElement.parentNode.id)">Editar</button></div>
        <div class="col col-lg-2"><button class="btn btn-danger alinear" type="button" onclick="eliminacion(this.parentElement.parentNode.id)">Eliminar</button></div></li>`
    }

}
function devolver(element){
    let id = element.parentElement.parentNode.id
    aux = filtrar(id)
    const elementoDevuelto = document.getElementById(id)
    elementoDevuelto.innerHTML = `<li id='${id}' class="row"><div class="col alinear">${aux.value}</div><div class="col-md-auto"><button class="btn btn-warning alinear" type="button" onclick="editar(this.parentElement.parentNode.id)">Editar</button></div>
    <div class="col col-lg-2"><button class="btn btn-danger alinear" type="button" onclick="eliminacion(this.parentElement.parentNode.id)">Eliminar</button></div></li>`
}