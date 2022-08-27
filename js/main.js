/* Desafío: Programa de una lista de supermercado en donde se debe indicar el Nombre del producto, Valor y Cantidad.
En el mismo se puede editar, buscar y eliminar un producto previamente cargado.*/

let precio = 0;
let precTotProd = 0;
let precioTotal = 0;
let terminar;
let productos = [];
let producto = [];
let totProd;
let contProdNom = 0;
let fecha = new Date();
let genTab;
let id = -1;
let idUsr = -1;
let usuario = [];
let dniUser;
let nomUser;
let prod = -1;
let obtenerUser;
AOS.init();
//Al editar los productos de un usuario en particular, agarra otro array en vez de continuar con el mismo. Tambien con la eliminación.
if (localStorage.getItem("usuarios")) {
  usuario = JSON.parse(localStorage.getItem("usuarios"));
  idUsr = usuario.length - 1;

  obtenerUser = JSON.parse(localStorage.getItem("userLog"));

  if (obtenerUser != null) {


    prodUser("", obtenerUser)

  }





}

function prodUser(userIng, dniIng) {


  const obtenerUsr = usuario.find((user) => user.dni === dniIng);

  dniUser = dniIng;


  /*     productos = JSON.parse(localStorage.getItem("usuarios")); */

  let ultimoProd = usuario[obtenerUsr.id].producto.length;

  if (ultimoProd == 0) {


    productos = [];


  } else {

    productos = usuario[obtenerUsr.id].producto[ultimoProd - 1];

    if (productos != null) {
      tabOrig(productos)
    } else {
      productos = [];
    }
  }





}


/* if (localStorage.getItem("usuarios")) {
  usuario = JSON.parse(localStorage.getItem("usuarios"));
}




// BUSCA SI HAY PRODUCTOS GUARDADOS Y LOS MUESTRA EN PANTALLA.
if (localStorage.getItem("productos"+dniUser)) {

  productos = JSON.parse(localStorage.getItem("productos"+dniUser));
  rearmarTab(productos);
}

 */






function createUser(usrAdd, dniAdd) {
  /* 
    let usrAdd = document.getElementById("usrAdd").value;
    let dniAdd = document.getElementById("dniAdd").value; */

  class User {
    constructor(id, nombre, dni) {
      this.id = id;
      this.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
      this.dni = dni;
      this.producto = [];
    }

  }

  idUsr++;

  usuario.push(new User(idUsr, usrAdd, dniAdd));

  localStorage.setItem("usuarios", JSON.stringify(usuario));

   let obtenerUsr = usuario.find((user) => user.dni === dniAdd);


  localStorage.setItem("userLog", JSON.stringify(obtenerUsr.dni));

}

let usrunlg = document.getElementById("logoff");

usrunlg.onclick = () => {
  localStorage.setItem("userLog", null);
  location.reload();
}





let usrlg = document.getElementById("usrProf1");

usrlg.onclick = () => { usrlog() }

function usrlog() {

  Swal.fire({
    title: 'INGRESA TUS DATOS',
    html:
      '<input id="usrAdd" class="swal2-input" placeholder="Nombre">' +
      '<input id="dniAdd" class="swal2-input" placeholder="DNI">',

    focusConfirm: false,
    confirmButtonColor: '#69a30a',



    /*    usuario.dni.includes(dniAdd) ? console.log("existe") : console.log("no existe"), */


    preConfirm: () => {

      /* const userBusq = usuario.find ((e) => e.id.includes(verifUser))
      console.log(userBusq); */
      /* usuario.forEach((e) => e.dni.includes(verifUser) ? console.log("Existe") : console.log("No existe")) */

      let userIng = document.getElementById("usrAdd").value;
      let dniIng = document.getElementById("dniAdd").value;


      if (!userIng) {
        Swal.showValidationMessage("Ingrese un usuario");
        return false;
      }

      if (!dniIng) {
        Swal.showValidationMessage("Ingrese la contraseña");
        return false;
      }

      

   /*    usuario[obtenerUsr.id].producto[0] = productos; */


 
      if (usuario.find((user) => user.dni === dniIng)) {

   
        let obtenerUsr = usuario.find((user) => user.dni === dniIng);

        localStorage.setItem("userLog", JSON.stringify(obtenerUsr.dni));

        dniUser = dniIng;
        nomUser = userIng;

        prodUser(userIng, dniIng)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido \n' + document.getElementById('usrAdd').value,
          showConfirmButton: false,
          timer: 1500

        })



      } else {
        swal.fire({
          title: 'Usuario no encontrado',
          text: "¿Desea crearlo?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Crear',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {

            dniUser = dniIng;
            nomUser = userIng;

            swal.fire(
              'Usuario ' + userIng + ' creado',
              '',
              'success',
              createUser(userIng, dniIng)
            )
          } else {

            swal.fire({
              title: 'Usuario no creado',
              icon: 'error',
              showCancelButton: false,
              showCloseButton: false,
              showConfirmButton: false,
              timer: 1000
            })
          }
        })



        /* Swal.fire({
          icon: 'error',
          title: 'Usuario no encontrado',
          text: '¿Desea crearlo?',
          showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }) */
      }

    }

  })

}













/*GENERACIÓN DE TABLA EN PANTALLA*/
/* -------------------------------------------------------------------- */




//SE LIMPIAN VALORES DE LOS IMPUTS DE AGREGAR PRODUCTO Y SE GENERA TABLA CON LOS DATOS INDICADOS.

function prodGen() {

  prodIng = document.getElementById("cantProd").value = "";
  precIng = document.getElementById("precIngr").value = "";
  cantIng = document.getElementById("cantIngr").value = "";

  genTab = document.createElement("tr");
  genTab.setAttribute("data-aos", "zoom-in")
  genTab.setAttribute("data-aos-once", "true")

  for (const producto of productos) {

    genTab.innerHTML = `
    <td class="align-middle">${producto.nombre}</td>
    <td class="align-middle">$${producto.precio}</td>
    <td class="canti">
      <div class="input-group input-group-sm ">
      <span class="input-group-text" id="basic-addon1">X</span>
        <input id="${producto.id}" type="number" class="form-control text-center" min="1" value="${producto.cantidad}" aria-describedby="basic-addon1">
      </div>
    </td>
    <td class="align-middle">$${producto.totprod}</td>
    <td class="align-middle">
      <div class="d-flex justify-content-end btn-group">
      <button id="ed${producto.id}" value="${producto.id}" class="btn btn-outline-success btn-sm fa-regular fa-pen-to-square" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd"></button>
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
  prod++;

  productos.push(new Producto(id, prodIng, precIng, cantIng));




  /*  usuario[obtenerUsr.id].producto[0] = productos; */
  /*   usuario[0].producto2=usuario[0].push(new Producto(id, prodIng, precIng, cantIng));; */

  //Al producto seleccionado del usuario se le agrega el array de productos
  const obtenerUsr = usuario.find((user) => user.dni === dniUser);
  usuario[obtenerUsr.id].producto[0] = productos;

  localStorage.setItem("usuarios", JSON.stringify(usuario));

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
  /*   document.getElementById("cantProd").select(); */

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
     <input input id="${prod.id}" type="number" class="form-control text-center" min="1" value="${prod.cantidad}" aria-describedby="basic-addon1">
   </div>
 </td>
 <td class="align-middle">$${prod.totprod}</td>
 <td class="align-middle">
 <div class="d-flex justify-content-end btn-group">
 <button id="ed${prod.id}" value="${prod.id}" class="btn btn-outline-success btn-sm fa-regular fa-pen-to-square" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd"></button>
   <button id="el${prod.id}" value="${prod.id}" class="btn btn-outline-secondary btn-sm fa-regular fa-trash-can" type="button"></button>
   </div>
 </td>
 `;

  tabGen = document.getElementById("tabla");
  tabGen.append(genTab);

}

//REARMA TABLA CON LOS PRODUCTOS ACTUALES.

function rearmarTab() {

  precioTotal = 0;

  productos.forEach((prod) => {

    //Sugar syntax
    id++;

    productos[id].id = id;

    tabla(prod)


    precioTotal = precioTotal + productos[id].totprod;

  })

  document.getElementById("totalProd").innerText = "TOTAL: $" + precioTotal;


  const obtenerUsr = usuario.find((user) => user.dni === dniUser);

  usuario[obtenerUsr.id].producto[0] = productos;

  localStorage.setItem("usuarios", JSON.stringify(usuario));


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

    /*   localStorage.setItem("productos" + dniUser, JSON.stringify(productos)); */

  });

}

//ELIMINAR ELEMENTOS DE LA TABLA Y MUESTRA EN LA TABLA LOS PRODUCTOS CARGADOS.

function tabOrig() {

  id = -1;

  let elimTabla = document.getElementById("tabla")

  while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);


  rearmarTab()


}

//ESCUCHADOR DE EVENTOS INPUT. SI EL VALOR ES VACÍO MUESTRA LA TABLA ORIGINA.
//SINO MUESTRA LO ENCONTRADO EN REFERENCIA A LO INGRESADO EN EL INPUT.

let busProdIng = document.getElementById("busProdIng");


//Operador Ternario

busProdIng.addEventListener("input", () => busProdIng.value ? busqueda() : tabOrig());




/*   if (busProdIng.value != "") {

    busqueda()

  } else {

    tabOrig()

  } */



/*MODIFICACIÓN DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//ELIMINA INPUTS DE MODIFICACIÓN DE PRODUCTOS SI LOS HAY Y CREA NUEVAMENTE LOS MISMOS OBTENIENDO EL VALOR ACTUAL DEL PRODUCTOS SELECCIONADO.

function modProd(valVal) {

  let ediProd = document.getElementById("ediProd")

  while (ediProd.firstChild) ediProd.removeChild(ediProd.firstChild);

  let prodSelecEdi = productos[valVal];


  /*   (async () => {
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
      }); */



  /*     if (formValues) { */



  modTab = document.createElement("div");
  modTab.innerHTML = `
    
      <form class="d-flex gap-2 needs-validation align-items-center" novalidate>
      <div class="mb-3">
        <label for="prodIngrMod" class="form-label col-form-label-sm mb-0">Producto</label>
        <input autofocus id="prodIngrMod" type="text" class="form-control" value="${prodSelecEdi.nombre}" required>
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


    const obtenerUsr = usuario.find((user) => user.dni === dniUser);


    usuario[obtenerUsr.id].producto[0] = productos;

    localStorage.setItem("usuarios", JSON.stringify(usuario));



    /*     productos = JSON.parse(localStorage.getItem("usuarios")); */

    tabOrig()










    document.getElementById("prodIngrMod").focus();
  });

}

/*   }) ()

} */


//ESCUCHADOR DE EVENTOS CLICK EN EL CUAL CHEQUEA SI SE PRESIONÓ EL BOTÓN EDITAR O ELIMINAR DE UN PRODUCTO ESPECÍFICO.
//SE REALIZA UN CONDICIONAL PARA SACAR ERROR EN CONSOLA EL CUAL ERA PRODUCIDO POR TOCAR CUALQUIER ETIQUETA DENTRO DEL id "tabla".
//ÉSTE CONDICIONAL ACTIVA LAS FUNCIONES SI LO PRESIONADO EN TABLA DEVUELVE UN VALOR.


//ver si es posible utilizar el indexof
let tab = document.getElementById("tabla");

tab.addEventListener("change", (e) => {

  let cantNuev = e.target.value;

  productos[e.target.id].cantidad = cantNuev;
  productos[e.target.id].totprod = productos[e.target.id].precio * cantNuev;

  tabOrig()
});




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
        reverseButtons: true,
        confirmButtonColor: '#69a30a',
        cancelButtonColor: '#6c757d',
        focusConfirm: false,
        focusCancel: false

      }).then((delProd) => {

        if (delProd.isConfirmed) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: `El producto ${productos[valId.value].nombre.bold()} se eliminó`
          })





          /* swal.fire(
            '¡Borrado!',
            `El producto ${productos[valId.value].nombre.bold()} se eliminó`,
            'success'
          ) */
          productos.splice(valId.value, 1);

          const obtenerUsr = usuario.find((user) => user.dni === dniUser);


          usuario[obtenerUsr.id].producto[0] = productos;

          localStorage.setItem("usuarios", JSON.stringify(usuario));


          tabOrig()
        }
      });



    }
  }


});










/*
let usrlg = document.getElementById("usrProf1");

usrlg.onclick = () => { usrlog() }

function usrlog() {
  Swal.fire({
    title: 'Ingresa tu nombre',
    html:
      '<input id="swal-input1" class="swal2-input">',

    focusConfirm: false,
    confirmButtonColor: '#69a30a',
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
 */

//ACTUALIZACIÓN DE CANTIDAD EN TIEMPO REAL.
/* let inputTotProd = document.getElementById(`cantProd${producto.cantidad}`);
console.log(inputTotProd)
inputTotProd.change = (e) => {

  let cantNuev = e.target.value;
  
  producto.cantidad = cantNuev;

}; */