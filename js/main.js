/* Desafío: Programa de una lista de supermercado en donde se debe indicar el Nombre del producto, Valor y Cantidad.
En el mismo se puede editar, buscar y eliminar un producto previamente cargado.*/

let precio = 0;
let precTotProd = 0;
let precioTotal = 0;
let terminar;
let productos = [];
let totProd;
let contProdNom = 0;
let fecha = new Date();
let genTab;
let id = -1;


/*GENERACIÓN DE TABLA EN PANTALLA*/
/* -------------------------------------------------------------------- */


// BUSCA SI HAY PRODUCTOS GUARDADOS Y LOS MUESTRA EN PANTALLA.
if (localStorage.getItem("productos")) {

  productos = JSON.parse(localStorage.getItem("productos"));
  rearmarTab(productos);
}


//SE LIMPIAN VALORES DE LOS IMPUTS DE AGREGAR PRODUCTO Y SE GENERA TABLA CON LOS DATOS INDICADOS.

function prodGen() {

  prodIng = document.getElementById("cantProd").value = "";
  precIng = document.getElementById("precIngr").value = "";
  cantIng = document.getElementById("cantIngr").value = "";

  genTab = document.createElement("tr");

  for (const producto of productos) {

    genTab.innerHTML = `
    <td>${producto.nombre}</td>
    <td>$${producto.precio}</td>
    <td class="canti">
      <div class="input-group input-group-sm ">
        <span class="input-group-text" id="basic-addon1">X</span>
        <input type="number" class="form-control text-center" placeholder="${producto.cantidad}" aria-describedby="basic-addon1">
      </div>
    </td>
    <td>$${producto.totprod}</td>
    <td>
      <div class="d-flex justify-content-end gap-2">
      <button id="ed${producto.id}" value="${producto.id}" class="btn btn-sm btn-outline-success" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd">Edit</button>
        <button id="el${producto.id}" value="${producto.id}" class="btn btn-sm btn-outline-secondary" type="button">Del</button>
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

  localStorage.setItem("productos", JSON.stringify(productos));

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


 //SE AGREGA SCRIPT PARA LA VALIDACIÓN DEL FORMULARIO DE BOOSTRAP.

function btnVali(){

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

  })();

}


//AL TERMINAR DE AGREGAR EL PRODUCTO Y ENVIARLO AL ARRAY, OCULTA LOS IMPUTS Y VUELVE A MOSTRAR EL BOTON AGREGAR (+).

function btnAgregarOcul() {

  let prodIng = document.getElementById("cantProd").value;
  let precIng = document.getElementById("precIngr").value;
  let cantIng = document.getElementById("cantIngr").value;

  btnVali()

  if (prodIng != "" && precIng != "" && cantIng != "") {

    document.getElementById("agregarProd").style.display = "block";
    document.getElementById("ingresarProd").style.display = "none";

    addProd()

  }

}

//SE LLAMA CON EL EVENTO CLICK A LA FUNCION btnAgregarOcul().

let ocuProBtn = document.getElementById("button-addon2")

ocuProBtn.onclick = () => { btnAgregarOcul() }

//FUNCIÓN PARA CREAR TABLA DEPENDIENDO SI SE ELIMINA O SE MODIFICA UN CAMPO DE ALGÚN PRODUCTO.

function tabla(prod) {

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
   <button id="ed${prod.id}" value="${prod.id}" class="btn btn-sm btn-outline-success" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd">Edit</button>
   <button id="el${prod.id}" value="${prod.id}" class="btn btn-sm btn-outline-secondary" type="button">Del</button>
   </div>
 </td>
 `;

  tabGen = document.getElementById("tabla");
  tabGen.append(genTab);


}

//REARMA TABLA CON LOS PRODUCTOS ACTUALES.

function rearmarTab(productos) {

  precioTotal = 0;

  productos.forEach((prod) => {

    id = id + 1;

    productos[id].id = id;

    tabla(prod)

    precioTotal = precioTotal + productos[id].totprod;
    
  })

  document.getElementById("totalProd").innerHTML = "TOTAL: $" + precioTotal;

  localStorage.setItem("productos", JSON.stringify(productos));

}


/*BUSCADOR DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//SE REALIZA BÚSQUEDA DEL PRODUCTO Y SE MUESTRA EN LA TABLA EN TIEMPO REAL. SI EL CAMPO ESTÁ VACÍO MUESTRA LOS PRODUCTOS AGREGADOS.

function busqueda() {

  id = -1;

  const resBusq = productos.filter((prod) => prod.nombre.includes(busProdIng.value[0].toUpperCase() + busProdIng.value.slice(1).toLowerCase()));

  //ELIMINAR ELEMENTOS DE LA TABLA PARA MOSTRAR LOS BUSCADOS

  let elimTabla = document.getElementById("tabla")

  while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);

  //SE RECORRE EL ARRAY DE BÚSQUEDA Y SE IMPRIME EN PANTALLA.

  resBusq.forEach((prod) => {

    //SE LLAMA A LA FUNCION PARA CREAR LA TABLA.

    tabla(prod)

    localStorage.setItem("productos", JSON.stringify(productos));

  });

}

//ELIMINAR ELEMENTOS DE LA TABLA Y MUESTRA EN LA TABLA LOS PRODUCTOS CARGADOS.

function tabOrig() {

  id = -1;

  let elimTabla = document.getElementById("tabla")

  while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);


  rearmarTab(productos)


}

//ESCUCHADOR DE EVENTOS INPUT. SI EL VALOR ES VACÍO MUESTRA LA TABLA ORIGINA.
//SINO MUESTRA LO ENCONTRADO EN REFERENCIA A LO INGRESADO EN EL INPUT.

let busProdIng = document.getElementById("busProdIng");

busProdIng.addEventListener("input", () => {


  if (busProdIng.value != "") {

    busqueda()

  } else {

    tabOrig()

  }

});

/*MODIFICACIÓN DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//ELIMINA INPUTS DE MODIFICACIÓN DE PRODUCTOS SI LOS HAY Y CREA NUEVAMENTE LOS MISMOS OBTENIENDO EL VALOR ACTUAL DEL PRODUCTOS SELECCIONADO.

function modProd(valVal) {

  let ediProd = document.getElementById("ediProd")

  while (ediProd.firstChild) ediProd.removeChild(ediProd.firstChild);

  let prodSelecEdi = productos[valVal];


  modTab = document.createElement("div");

  modTab.innerHTML = `

  <form class="d-flex gap-2 needs-validation" novalidate>
  <div class="mb-3">
    <input id="prodIngrMod" type="text" class="form-control" value="${prodSelecEdi.nombre}" required>
  </div>
  <div class="mb-3">
    <input id="precIngrMod" type="number" min="1" class="form-control" value="${prodSelecEdi.precio}" required>
  </div>
  <div class="mb-3">
    <input id="cantIngrMod" type="number" min="1" class="form-control" value="${prodSelecEdi.cantidad}" required>
  </div>
  <div class="mb-3">
    <button class="btn btn-outline-success" type="submit" id="btnMod">EDITAR</button>
  </div>
</div>
</form>

   `;

  tabGen = document.getElementById("ediProd");

  tabGen.append(modTab);

//SE AGREGA EL PRODUCTO MODIFICADO AL ARRAY Y SE GUARDA EN EL LOCALSTORAGE.

  let btnMod = document.getElementById("btnMod");

  btnMod.addEventListener("click", () => {

    let prodIngrMod = document.getElementById("prodIngrMod").value;
    let precIngrMod = document.getElementById("precIngrMod").value;
    let cantIngrMod = document.getElementById("cantIngrMod").value;

    productos[valVal].nombre = prodIngrMod[0].toUpperCase() + prodIngrMod.slice(1).toLowerCase();
    productos[valVal].precio = parseFloat(precIngrMod);
    productos[valVal].cantidad = parseInt(cantIngrMod);
    productos[valVal].totprod = productos[valVal].precio * productos[valVal].cantidad;
    
    btnVali()

    localStorage.setItem("productos", JSON.stringify(productos));

    tabOrig()


  });

}


//ESCUCHADOR DE EVENTOS CLICK EN EL CUAL CHEQUEA SI SE PRESIONÓ EL BOTÓN EDITAR O ELIMINAR DE UN PRODUCTO ESPECÍFICO.
//SE REALIZA UN CONDICIONAL PARA SACAR ERROR EN CONSOLA EL CUAL ERA PRODUCIDO POR TOCAR CUALQUIER ETIQUETA DENTRO DEL id "tabla".
//ÉSTE CONDICIONAL ACTIVA LAS FUNCIONES SI LO PRESIONADO EN TABLA DEVUELVE UN VALOR.

let tab = document.getElementById("tabla");

tab.addEventListener("click", (e) => {


  let valId = e.target.id;

  if ((valId != "")) {

    let valVal = document.getElementById(valId).value;

    if (valId == "ed" + valVal) {

      modProd(valVal)

    } else if (valId == "el" + valVal) {

      productos.splice(valVal, 1);

      tabOrig()

    }
  }

});



