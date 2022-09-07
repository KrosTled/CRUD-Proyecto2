// const btn_delete = document.querySelector(".eliminar");
// btn_delete.addEventListener("click", e => {
//     // console.log(e.srcElement.parentNode.id)
//     eliminacion(e.srcElement.parentNode.id)
// });

refresco()

const btn_add = document.querySelector("#btn1");
btn_add.addEventListener("click", e => {
    e.preventDefault()
    agregar()});
console.log('PASE POR AQUI')

// const btn_delete = document.querySelector(".deletebtn");
// btn_delete.addEventListener("click", e => {
    // console.log('PASE POR DELETE')
    // e.preventDefault()
    // eliminacion(e.srcElement.parentNode.id)
// }); 




// const btn_add = document.querySelector("#btn1");
//     btn_add.addEventListener("click", e => agregar());
//     console.log('PASE POR AQUI')




function refresco(){   
    const storage = window.localStorage;
    const lista = document.querySelector("#listaCRUD");
    // const newLi = document.createElement('li')
    let acumulado = JSON.parse(storage.getItem('acumulador'))
    lista.innerHTML=``
    
    if(acumulado !== null){ 
        acumulado.forEach((element) => {
            // console.log(storage.getItem(element))
            if (storage.getItem(element) !== null){             
                ayuda = storage.getItem(element)
                lista.innerHTML += `<li id='${element}' >${ayuda}<button class="editbtn" type="button">Editar</button>
                <button class="deletebtn" type="button" onclick="eliminacion(this.parentNode.id)">Eliminar</button></li>`       
            }
            });
    }
}


function agregar(){
    const storage = window.localStorage;
    const valor = document.querySelector('#crearText');
    const contenido = document.createTextNode(valor.value)
    let acumulado = JSON.parse(storage.getItem('acumulador'));
    //Verifica si es nulo

    if(acumulado !== null){ 
        for (i = 0; acumulado.length>i;i++){
            id = "newLi" + (i+1)  
            if(!acumulado.includes(id)){ 
                console.log("Agregando algo?");
                storage.setItem(id,contenido.data)
                acumula(id)                  
            }       
        }
    }
    else{//Genera primera instancia del arreglo
        console.log("Como llegue aqui?");
        storage.setItem("newLi0",contenido.data)
        acumula("newLi0")
    }
    refresco()
}

function acumula(aregarElement){
    const storage = window.localStorage;
    // obtengo desde el storage, el key acumulador.
    let valida = storage.getItem('acumulador');
    let acumulado = [];
    // si no existe el key acumulador, no hago nada. Pero si existe, lo obtengo.
    if (valida != null){
        acumulado = JSON.parse(storage.getItem('acumulador'));
    }
    const valor = aregarElement;
    acumulado.push(valor);
    storage.setItem('acumulador', JSON.stringify(acumulado));
}

function eliminacion(id){
    const storage = window.localStorage;
    let acumula = JSON.parse(storage.getItem('acumulador'));
    console.log(id);
    if(1 === acumula.length){
        nuevoAcumulado = acumula.filter((element) => element !== id)
        // console.log('SOY UN ARREGLO'+nuevoAcumulado);
        storage.setItem('acumulador', JSON.stringify(nuevoAcumulado));
        storage.removeItem(id)  
        storage.removeItem('acumulador')
        console.log("Hay un loop en if?");
    }else{
        nuevoAcumulado = acumula.filter((element) => element !== id)
        // console.log('SOY UN ARREGLO'+nuevoAcumulado);
        storage.setItem('acumulador', JSON.stringify(nuevoAcumulado));
        storage.removeItem(id)  
        console.log("Hay un loop en else?");
    }
    refresco()
}