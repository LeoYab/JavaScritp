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
        <button type="button" class="btn btn btn-sm btn-outline-success" data-bs-toggle="modal" data-bs-target="#modificarProd">Edit</button>
        <button class="btn btn-sm btn btn-outline-secondary" type="submit">Del</button>
      </div>
    </td>
    `;
    document.getElementById("totalProd").innerHTML = "TOTAL: $" + precioTotal;

  }

  tabGen = document.getElementById("tabla");
  tabGen.append(genTab);


}

/*ARRAY DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//SE TOMAN VALORES DE LOS INPUTS Y SE GUARDAN EN EL ARRAY. LUEGO SE LLAMA A LA FUNCION prodGen() PARA MOSTRARLOS EN PANTALLA.

function addProd() {

  let prodIng = document.getElementById("cantProd").value;
  let precIng = document.getElementById("precIngr").value;
  let cantIng = document.getElementById("cantIngr").value;

  class Producto {
    constructor(nombre, precio, cantidad) {

      this.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
      this.precio = parseFloat(precio);
      this.cantidad = parseInt(cantidad);
      this.totprod = parseFloat(this.precio * this.cantidad);
      precioTotal = parseFloat(precioTotal + this.totprod);
    }
  }

  productos.push(new Producto(prodIng, precIng, cantIng));


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

    const resBusq = productos.filter((prod) => prod.nombre.includes(busProdIng.value[0].toUpperCase() + busProdIng.value.slice(1).toLowerCase()));

    //ELIMINAR ELEMENTOS DE LA TABLA PARA MOSTRAR LOS BUSCADOS

    let elimTabla = document.getElementById("tabla")

    while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);

    //SE RECORRE EL ARRAY DE BÚSQUEDA Y SE IMPRIME EN PANTALLA.

    resBusq.forEach((prod) => {

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
     <button type="button" class="btn btn btn-sm btn-outline-success" data-bs-toggle="modal" data-bs-target="#modificarProd">Edit</button>
     <button class="btn btn-sm btn btn-outline-secondary" type="submit">Del</button>
     </div>
   </td>
   `;

      tabGen = document.getElementById("tabla");
      tabGen.append(genTab);

    });

  } else {

    //ELIMINAR ELEMENTOS DE LA TABLA Y MUESTRA EN LA TABLA LOS PRODUCTOS CARGADOS.

    let elimTabla = document.getElementById("tabla")

    while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);


    productos.forEach((prod) => {

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
         <button type="button" class="btn btn btn-sm btn-outline-success" data-bs-toggle="modal" data-bs-target="#modificarProd">Edit</button>
         <button class="btn btn-sm btn btn-outline-secondary" type="submit">Del</button>
         </div>
       </td>
       `;

      tabGen = document.getElementById("tabla");
      tabGen.append(genTab);

    })
  }
});


