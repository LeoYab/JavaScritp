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
let usuario = [];
AOS.init();


/* function createUser(){

class User {

  constructor(nombre, edad, dni) {
    this.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
    this.edad = parseInt(edad);
    this.dni = parseInt(dni);
  }

}

usuario.push(new User(nombre, edad, dni))


}

function addUser(){

} */
















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
  genTab.setAttribute("data-aos", "zoom-in")
  for (const producto of productos) {

    genTab.innerHTML = `
    <td class="align-middle">${producto.nombre}</td>
    <td class="align-middle">$${producto.precio}</td>
    <td class="canti">
      <div class="input-group input-group-sm ">
      <button type="button" class="btn btn-outline-secondary" disabled>X</button>
        <input type="number" class="form-control text-center" min="1" placeholder="${producto.cantidad}" aria-describedby="basic-addon1">
      </div>
    </td>
    <td class="align-middle">$${producto.totprod}</td>
    <td class="align-middle">
      <div class="d-flex justify-content-end btn-group">
      <button id="ed${producto.id}" value="${producto.id}" class="btn btn-outline-success btn-sm fa-regular fa-pen-to-square" data-bs-toggle="modal" type="button" ></button>
        <button id="el${producto.id}" value="${producto.id}" class="btn btn-outline-secondary btn-sm fa-regular fa-trash-can" type="button"></button>
      </div>
    </td>
    `;

    document.getElementById("totalProd").innerText = "TOTAL: $" + precioTotal;

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

  //Sugar Syntax
  id++;

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

function btnVali() {

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

 <td class="align-middle">${prod.nombre}</td>
 <td class="align-middle">$${prod.precio}</td>
 <td class="canti">
   <div class="input-group input-group-sm ">
     <span class="input-group-text" id="basic-addon1">X</span>
     <input type="number" class="form-control text-center" min="1" placeholder="${prod.cantidad}" aria-describedby="basic-addon1">
   </div>
 </td>
 <td class="align-middle">$${prod.totprod}</td>
 <td class="align-middle">
 <div class="d-flex justify-content-end btn-group">
 <button id="ed${prod.id}" value="${prod.id}" class="btn btn-outline-success btn-sm fa-regular fa-pen-to-square" data-bs-toggle="modal" type="button" ></button>
   <button id="el${prod.id}" value="${prod.id}" class="btn btn-outline-secondary btn-sm fa-regular fa-trash-can" type="button"></button>
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

    //Sugar syntax
    id++;

    productos[id].id = id;

    tabla(prod)

    precioTotal = precioTotal + productos[id].totprod;

  })

  document.getElementById("totalProd").innerText = "TOTAL: $" + precioTotal;

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


//Operador Ternario

busProdIng.addEventListener("input", () => { busProdIng.value ? busqueda() : tabOrig() });




/*   if (busProdIng.value != "") {

    busqueda()

  } else {

    tabOrig()

  } */



/*MODIFICACIÓN DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//ELIMINA INPUTS DE MODIFICACIÓN DE PRODUCTOS SI LOS HAY Y CREA NUEVAMENTE LOS MISMOS OBTENIENDO EL VALOR ACTUAL DEL PRODUCTOS SELECCIONADO.

function modProd(valVal) {

  /*  let ediProd = document.getElementById("ediProd") */

  /*  while (ediProd.firstChild) ediProd.removeChild(ediProd.firstChild); */

  let prodSelecEdi = productos[valVal];


  (async () => {
    const { value: formValues } = await Swal.fire({
      title: 'MODIFICAR',
      color: '#fff',
      customClass: {
        title: 'title-class2',
        confirmButton: 'btn btn-outline-success fa-solid fa-circle-check btnSwt',
      },
      html:
        ` <form class="d-flex gap-2 needs-validation align-items-center" novalidate>
    <div class="mb-3">
      <label for="prodIngrMod" class="form-label col-form-label-sm mb-0">Producto</label>
      <input id="prodIngrMod" type="text" class="form-control" value="${prodSelecEdi.nombre}" required>
      </div>
    <div class="mb-3">
      <label for="precIngrMod" class="form-label col-form-label-sm mb-0">Precio</label>
      <input id="precIngrMod" type="number" min="1" class="form-control" value="${prodSelecEdi.precio}" required>
      </div>
    <div class="mb-3">
      <label for="cantIngrMod" class="form-label col-form-label-sm mb-0">Cantidad</label>
      <input id="cantIngrMod" type="number" min="1" class="form-control" value="${prodSelecEdi.cantidad}" required>
      </div>
  </div>
  </form>`,
      focusConfirm: false,
      buttonsStyling:false,
      confirmButtonText:false,
    });
    /*   let btnMod = document.getElementById("btnMod");
      btnMod.addEventListener("click", () => {formValues});
       */
    if (formValues) {



      /* modTab = document.createElement("div");
    
      modTab.innerHTML = `
    
      <form class="d-flex gap-2 needs-validation align-items-center" novalidate>
      <div class="mb-3">
        <label for="prodIngrMod" class="form-label col-form-label-sm mb-0">Producto</label>
        <input id="prodIngrMod" type="text" class="form-control" value="${prodSelecEdi.nombre}" required>
        </div>
      <div class="mb-3">
        <label for="precIngrMod" class="form-label col-form-label-sm mb-0">Precio</label>
        <input id="precIngrMod" type="number" min="1" class="form-control" value="${prodSelecEdi.precio}" required>
        </div>
      <div class="mb-3">
        <label for="cantIngrMod" class="form-label col-form-label-sm mb-0">Cantidad</label>
        <input id="cantIngrMod" type="number" min="1" class="form-control" value="${prodSelecEdi.cantidad}" required>
        </div>
      <div class="mb-3">
        <label for="cantIngrMod" class="form-label col-form-label-sm mb-0">⁪</label>
        <button class="btn btn-outline-success fa-solid fa-circle-check" type="submit" id="btnMod"></button>
      </div>
    </div>
    </form>
    
       `;
    
      tabGen = document.getElementById("ediProd");
    
      tabGen.append(modTab);
     */
      //SE AGREGA EL PRODUCTO MODIFICADO AL ARRAY Y SE GUARDA EN EL LOCALSTORAGE.

      /* let btnMod = document.getElementById("btnMod");

      btnMod.addEventListener("click", () => {  */


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


    /*   }); */

    }

  })()

}


//ESCUCHADOR DE EVENTOS CLICK EN EL CUAL CHEQUEA SI SE PRESIONÓ EL BOTÓN EDITAR O ELIMINAR DE UN PRODUCTO ESPECÍFICO.
//SE REALIZA UN CONDICIONAL PARA SACAR ERROR EN CONSOLA EL CUAL ERA PRODUCIDO POR TOCAR CUALQUIER ETIQUETA DENTRO DEL id "tabla".
//ÉSTE CONDICIONAL ACTIVA LAS FUNCIONES SI LO PRESIONADO EN TABLA DEVUELVE UN VALOR.

let tab = document.getElementById("tabla");

tab.addEventListener("click", (e) => {


  let valId = document.getElementById(e.target.id);

  //Operador avanzado AND

  valId != null && busqIdBot();


  function busqIdBot() {

    if (valId.id == "ed" + valId.value) {

      modProd(valId.value)

    } else if (valId.id == "el" + valId.value) {

      //SWEET ALERT PARA CONFIRMAR LA ELIMINACIÓN

      Swal.fire({
        icon: 'warning',
        title: 'Se eliminará: ' + productos[valId.value].nombre.bold(),
        text: '¿Desea continuar?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

      }).then((delProd) => {

        if (delProd.isConfirmed) {

          swal.fire(
            '¡Borrado!',
            `El producto ${productos[valId.value].nombre.bold()} se eliminó`,
            'success'
          )
          productos.splice(valId.value, 1);

          tabOrig()
        }
      });



    }
  }


});



let usrlg = document.getElementById("usrProf1");

usrlg.onclick = () => { usrlog() }

function usrlog() {
  Swal.fire({
    title: 'Ingresa tu nombre',
    html:
      '<input id="swal-input1" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      return [

        document.getElementById('swal-input1').value,
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido \n' + document.getElementById('swal-input1').value,
          showConfirmButton: false,
          timer: 1500
        })
      ]
    }
  })

}

