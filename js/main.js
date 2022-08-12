/* Desafío: Programa de una lista de supermercado en donde se debe indicar el Nombre del producto, Valor y Cantidad.
En el mismo se puede editar, buscar y eliminar un producto previamente cargado.*/

let precio = 0;
let precTotProd = 0;
let precioTotal = 0;
let terminar;
const productos = [];
let totProd;
let contProdNom = 0;
let fecha = new Date();
let genTab;
let id = -1;

/*GENERACIÓN DE TABLA EN PANTALLA*/
/* -------------------------------------------------------------------- */

//SE LIMPIAN VALORES DE LOS IMPUTS Y SE GENERA TABLA CON LOS DATOS INDICADOS.

function prodGen() {

  prodIng = document.getElementById("cantProd").value = "";
  precIng = document.getElementById("precIngr").value = "";
  cantIng = document.getElementById("cantIngr").value = "";

  genTab = document.createElement("tr");

  for (const productor of productos) {

    genTab.innerHTML = `
    <td>${productor.nombre}</td>
    <td>$${productor.precio}</td>
    <td class="canti">
      <div class="input-group input-group-sm ">
        <span class="input-group-text" id="basic-addon1">X</span>
        <input type="number" class="form-control text-center" placeholder="${productor.cantidad}" aria-describedby="basic-addon1">
      </div>
    </td>
    <td>$${productor.totprod}</td>
    <td>
      <div class="d-flex justify-content-end gap-2">
      <button id="ed${id}" value="${id}" class="btn btn-sm btn-outline-success" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd">Edit</button>
        <button id="el${id}" value="${id}" class="btn btn-sm btn-outline-secondary" type="button">Del</button>
      </div>
    </td>
    `;
    document.getElementById("totalProd").innerHTML = "TOTAL: $" + precioTotal;

  }

  tabGen = document.getElementById("tabla");
  tabGen.append(genTab);
/*   updateDiv() */

}

/*ARRAY DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//SE TOMAN VALORES DE LOS INPUTS Y SE GUARDAN EN EL ARRAY. LUEGO SE LLAMA A LA FUNCION prodGen() PARA MOSTRARLOS EN PANTALLA.

function addProd() {
  
  let prodIng = document.getElementById("cantProd").value;
  let precIng = document.getElementById("precIngr").value;
  let cantIng = document.getElementById("cantIngr").value;

  class Producto {
    constructor(id, nombre, precio, cantidad) {
      this.id = id;
      this.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
      this.precio = parseFloat(precio);
      this.cantidad = parseInt(cantidad);
      this.totprod = parseFloat(this.precio * this.cantidad);
      precioTotal = parseFloat(precioTotal + this.totprod);

    }
    
  }

  id = id + 1;

  productos.push(new Producto(id, prodIng, precIng, cantIng));

  console.log(productos)
  prodGen()
}

/*ACCIÓN DEL BOTON AGREGAR (+)*/
/* -------------------------------------------------------------------- */

//AL PRESIONAR EL BOTON (+) DE AGREGAR PRODUCTO, DESAPARECE Y APARECEN LOS INPUTS SETEANDOLOS CON EL ATTRIB REQUIRED.

function btnAgregar() {


  //Borra la clase was-validated la cual muestra los íconos de validación de formulario.
  document.getElementById("formu").classList.remove("was-validated");

  document.getElementById("agregarProd").style.display = "none";
  document.getElementById("ingresarProd").style.display = "flex"

  document.getElementById("cantProd").focus();
  document.getElementById("cantProd").select();


}

//SE LLAMA CON EL EVENTO CLICK A LA FUNCION btnAgregar().

let agrProBtn = document.getElementById("agrProBtn")

agrProBtn.onclick = () => { btnAgregar() }


/*INPUTS PARA AGREGAR PRODUCTOS*/
/* -------------------------------------------------------------------- */

//AL TERMINAR DE AGREGAR EL PRODUCTO Y ENVIARLO AL ARRAY, OCULTA LOS IMPUTS Y VUELVE A MOSTRAR EL BOTON AGREGAR (+).
//TAMBIÉN ELIMINA EL ATRIBUTO REQUIRED DE LOS IMPUTS PARA EVITAR ERRORES EN CONSOLA.

function btnAgregarOcul() {

  let prodIng = document.getElementById("cantProd").value;
  let precIng = document.getElementById("precIngr").value;
  let cantIng = document.getElementById("cantIngr").value;


  //SE AGREGA SCRIPT PARA LA VALIDACIÓN DEL FORMULARIO.

  (() => {
    'use strict';

    const forms = document.getElementsByClassName("needs-validation");

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add("was-validated")
      }, false)
    })
  })()

  if (prodIng != "" && precIng != "" && cantIng != "") {

    document.getElementById("agregarProd").style.display = "block";
    document.getElementById("ingresarProd").style.display = "none";

    addProd()
  }

}

//SE LLAMA CON EL EVENTO CLICK A LA FUNCION btnAgregarOcul().

let ocuProBtn = document.getElementById("button-addon2")

ocuProBtn.onclick = () => { btnAgregarOcul() }


/*BUSCADOR DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//SE REALIZA BÚSQUEDA DEL PRODUCTO Y SE MUESTRA EN LA TABLA EN TIEMPO REAL. SI EL CAMPO ESTÁ VACÍO MUESTRA LOS PRODUCTOS AGREGADOS.

let busProdIng = document.getElementById("busProdIng");

busProdIng.addEventListener("input", () => {


  if (busProdIng.value != "") {
    id=-1;
    const resBusq = productos.filter((prod) => prod.nombre.includes(busProdIng.value[0].toUpperCase() + busProdIng.value.slice(1).toLowerCase()));

    //ELIMINAR ELEMENTOS DE LA TABLA PARA MOSTRAR LOS BUSCADOS

    let elimTabla = document.getElementById("tabla")

    while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);

    //SE RECORRE EL ARRAY DE BÚSQUEDA Y SE IMPRIME EN PANTALLA.

    resBusq.forEach((prod) => {

      id = id + 1;

      productos[id].id = id;

      genTab = document.createElement("tr");

      genTab.innerHTML += `
 
   <td>${prod.nombre}</td>
   <td>$${prod.precio}</td>
   <td class="canti">
     <div class="input-group input-group-sm ">
       <span class="input-group-text" id="basic-addon1">X</span>
       <input type="number" class="form-control text-center" placeholder="${prod.cantidad}" aria-describedby="basic-addon1">
     </div>
   </td>
   <td>$${prod.totprod}</td>
   <td>
     <div class="d-flex justify-content-end gap-2">
     <button id="ed${id}" value="${id}" class="btn btn-sm btn-outline-success" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd">Edit</button>
     <button id="el${id}" value="${id}" class="btn btn-sm btn-outline-secondary" type="button">Del</button>
     </div>
   </td>
   `;

      tabGen = document.getElementById("tabla");
      tabGen.append(genTab);

    });

  } else {

    //ELIMINAR ELEMENTOS DE LA TABLA Y MUESTRA EN LA TABLA LOS PRODUCTOS CARGADOS.
    id=-1;

    rearmarTab();

  }


});


function rearmarTab(){

  let elimTabla = document.getElementById("tabla")

  while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);

 
  productos.forEach((prod) => {

    id = id + 1;

    productos[id].id = id;

    genTab = document.createElement("tr");

    genTab.innerHTML += `
   
     <td>${prod.nombre}</td>
     <td>$${prod.precio}</td>
     <td class="canti">
       <div class="input-group input-group-sm ">
         <span class="input-group-text" id="basic-addon1">X</span>
         <input type="number" class="form-control text-center" placeholder="${prod.cantidad}" aria-describedby="basic-addon1">
       </div>
     </td>
     <td>$${prod.totprod}</td>
     <td>
       <div class="d-flex justify-content-end gap-2">
       <button id="ed${id}" value="${id}" class="btn btn-sm btn-outline-success" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd">Edit</button>
        <button id="el${id}" value="${id}" class="btn btn-sm btn-outline-secondary" type="button">Del</button>
       </div>
     </td>
     `;

    tabGen = document.getElementById("tabla");
    tabGen.append(genTab);

  })
}


//TOMA EL 
  let tab = document.getElementById("tabla")

  tab.addEventListener("click", (e) => {


    let valId = e.target.id;
    let valVal = document.getElementById(e.target.id).value;
    console.log(valId);
    console.log(valVal);
    
if (valId == "ed" + valVal){

 
}else if(valId == "el" + valVal){

  productos.splice(valVal , 1);

  id=-1;

    const resBusq = productos.filter((prod) => prod.nombre.includes(busProdIng.value[0].toUpperCase() + busProdIng.value.slice(1).toLowerCase()));

    //ELIMINAR ELEMENTOS DE LA TABLA PARA MOSTRAR LOS BUSCADOS

    let elimTabla = document.getElementById("tabla")

    while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);

    //SE RECORRE EL ARRAY DE BÚSQUEDA Y SE IMPRIME EN PANTALLA.

    resBusq.forEach((prod) => {

      id = id + 1;

      productos[id].id = id;

      genTab = document.createElement("tr");

      genTab.innerHTML += `
 
   <td>${prod.nombre}</td>
   <td>$${prod.precio}</td>
   <td class="canti">
     <div class="input-group input-group-sm ">
       <span class="input-group-text" id="basic-addon1">X</span>
       <input type="number" class="form-control text-center" placeholder="${prod.cantidad}" aria-describedby="basic-addon1">
     </div>
   </td>
   <td>$${prod.totprod}</td>
   <td>
     <div class="d-flex justify-content-end gap-2">
     <button id="ed${id}" value="${id}" class="btn btn-sm btn-outline-success" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd">Edit</button>
     <button id="el${id}" value="${id}" class="btn btn-sm btn-outline-secondary" type="button">Del</button>
     </div>
   </td>
   `;

      tabGen = document.getElementById("tabla");
      tabGen.append(genTab);

    });
 /*  rearmarTab()  */
}


    });

/* btnMod.onclick = () => { 

  console.log(indiceMod)
 
   let prodIngrMod = document.getElementById("prodIngrMod").value;
    let precIngrMod = document.getElementById("precIngrMod").value;
    let cantIngrMod = document.getElementById("cantIngrMod").value; 
    console.log (cantIngrMod)
    console.log (productos)

    productos[indiceMod].nombre = prodIngrMod[0].toUpperCase() + prodIngrMod.slice(1).toLowerCase();
    productos[indiceMod].precio = parseFloat(precIngrMod);
    productos[indiceMod].cantidad = parseInt(cantIngrMod);
    productos[indiceMod].totprod = precIngrMod * cantIngrMod;
    console.log (productos)
    prodGen() 
    
  } */
  





/* 
function modProd(indiceMod) {
console.log(indiceMod)
console.log (productos)
 let cantProdMod = document.getElementById("cantProd").value;
  let precIngrMod = document.getElementById("precIngr").value;
  let cantIngrMod = document.getElementById("cantIngr").value; 
  console.log (cantIngrMod)
  productos[indiceMod].nombre = cantProdMod[0].toUpperCase() + cantProdMod.slice(1).toLowerCase();
  productos[indiceMod].precio = parseFloat(precIngrMod);
  productos[indiceMod].cantidad = parseInt(cantIngrMod);
  productos[indiceMod].totprod = precIngrMod * cantIngrMod;

}
 */












/* 
let buttonList = document.querySelectorAll(".button");
//REVISAR PORQUÉ NO FUNCIONA LA CARGA DE LA TABLA PARA PODER ACTUALIZARLA Y QUE TOME EL VALOR DE LOS ID AL MOMENTO DE 
//PRESIONAR EDITAR
buttonList.forEach(function(i){
  
  document.getElementById("tabla") = function() {
    alert('La página terminó de cargar');
  }
  i.addEventListener("click", function(e){
   
 
   console.log(e.target.id);
   
  })
})  */

/*   productos[indSelec].nombre = nombreMay[0].toUpperCase() + nombreMay.slice(1).toLowerCase();
  productos[indSelec].precio = parseFloat(prompt("Ingrese el precio:"));
  productos[indSelec].cantidad = parseInt(prompt("Ingrese la cantidad:"));
  productos[indSelec].totprod = productos[indSelec].precio * productos[indSelec].cantidad;
 */








