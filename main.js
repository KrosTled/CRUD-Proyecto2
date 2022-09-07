const btn_add = document.querySelector("#btn1");
btn_add.addEventListener("click", e => agregar());

refresco()

function refresco(){
    const storage = window.localStorage;
    const lista = document.querySelector("#listaCRUD");
    const newLi = document.createElement('li')
    const template = element =>{
        `<li>
            ${element}
        </li>`
    }
    let acumulado = JSON.parse(storage.getItem('acumulador'))
    lista.innerHTML=''
    if(acumulado !== null){ 
        acumulado.forEach((element) => {
            ayuda = storage.getItem(element)
            lista.innerHTML += `<li>${ayuda}</li>`
        });
    }
}


function agregar(){
    const storage = window.localStorage;
    const lista = document.querySelector("#listaCRUD");
    const valor = document.querySelector('#crearText');
    const newLi = document.createElement('li')
    const contenido = document.createTextNode(valor.value)
    let acumulado = JSON.parse(storage.getItem('acumulador'));
    //Verifica si es nulo
   
    if(acumulado !== null){ 
        for (i = 0; acumulado.length>=i;i++){
            id = "newLi" + (i+1)  
            if(!acumulado.includes(id)){ 
                // console.log("Como llegue aqui?");
                newLi.setAttribute("id",id)
                storage.setItem(id,contenido.data)
                acumula(id)   
                console.log("No se pudo")                      
            }else{
                for(i=0; acumulado.length>i;i++){
                    ayuda = storage.getItem(id)
                    newAyuda = document.createTextNode(ayuda)             
                }
                console.log('SOY UNA ID '+id)
                }            
        }
    }
    else{//Genera primera instancia del arreglo
        console.log("Como llegue aqui?");
        newLi.setAttribute("id","newLi0")
        storage.setItem("newLi0",contenido.data)
        acumula("newLi0")
    }
    refresco()  
}
function acumula(aregarElement){
    const storage = window.localStorage;
    // obtengo desde el storage, el key acumulador.
    let valida = storage.getItem('acumulador');
    let acumula = [];
    // si no existe el key acumulador, no hago nada. Pero si existe, lo obtengo.
    if (valida != null){
        acumula = JSON.parse(storage.getItem('acumulador'));
    }
    const valor = aregarElement;
    acumula.push(valor);
    storage.setItem('acumulador', JSON.stringify(acumula));
}