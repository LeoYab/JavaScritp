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



/*BÚSQUEDA DE USUARIOS*/
/* -------------------------------------------------------------------- */

//Revisa si hay usuarios cargados en el localStorage y los agrega al array de usuarios.

if (localStorage.getItem("usuarios")) {

  usuario = JSON.parse(localStorage.getItem("usuarios"));

  //Se obtiene la cantidad de usuarios y se guarda en una variable para que, si se agrega otro usuario, comience desde el próximo índice vacío.

  idUsr = usuario.length - 1;

  //Se carga en una variable el valor de la key userlog para poder actualizar la página sin que se el último usuario logueado se cierre.

  obtenerUser = JSON.parse(localStorage.getItem("userLog"));

  //Si hay un usuario (DNI) en la variable nos carga los productos y muestra el botón de deslogueo en el menú hamburguesa.

  if (obtenerUser != null) {

    prodUser("", obtenerUser);

    document.getElementById("logoff").setAttribute("class", "nav-link fa-solid fa-right-from-bracket");
    document.getElementById("logoffSalir").setAttribute("style", "display:block");

  }
}

//Muestra el valor del dolar blue.

/* async function dolar(){

const dolarTr = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
const resp = await fetch(dolarTr)
const data = await resp.json()

document.getElementById("dolar").innerHTML=`<p>Dolar Blue: US$ ${data.compra}</p>`;

} */

/*CARGA DE RECETAS*/
/* -------------------------------------------------------------------- */

//Se crea una función asincrónica que obtiene datos de un archivo local json para poder mostrar recetas.

const recetas = async () => {

  const recetJson = await fetch("./js/data/recetas.json")

  const data = await recetJson.json();

  /*   const filtro = data.filter ((el) => el.Ingredientes.includes(" "))
  
    console.log(filtro) */


  //Se crean variables en donde se guardan núm. randoms los cuales se usan como el índice de cada receta.
  //Se obitene el id de la receta, saco el "Receta de" de cada título, uno las palabras con un guión bajo, pongo en mayúscula la primera letra de la primera palabra y saco las tildes del título.

  let numAl1 = Math.round(Math.random() * 11300);
  let numAl2 = Math.round(Math.random() * 11300);
  let numAl3 = Math.round(Math.random() * 11300);


  let numAl1Id = data[numAl1].Id;
  let nombAl1 = data[numAl1].Nombre.replace("Receta de ", "")
  nombAl1 = nombAl1.replace(/ /g, "_")
  nombAl1 = nombAl1[0].toLowerCase() + nombAl1.slice(1).toLowerCase();
  nombAl1 = nombAl1.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

  let numAl2Id = data[numAl2].Id;
  let nombAl2 = data[numAl2].Nombre.replace("Receta de ", "")
  nombAl2 = nombAl2.replace(/ /g, "_")
  nombAl2 = nombAl2[0].toLowerCase() + nombAl2.slice(1).toLowerCase();
  nombAl2 = nombAl2.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

  let numAl3Id = data[numAl3].Id;
  let nombAl3 = data[numAl3].Nombre.replace("Receta de ", "")
  nombAl3 = nombAl3.replace(/ /g, "_")
  nombAl3 = nombAl3[0].toLowerCase() + nombAl3.slice(1).toLowerCase();
  nombAl3 = nombAl3.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

  //Todo lo anterior es para poder modificar el link de la imagen de cada receta y mostrarla correctamente. Puede que alguna que otra imagen no cargue ya que no se filtran todos los caracteres especiales.
  //Como los ingredientes están separados por comas dentro del json, se reemplaza la "," por un salto de línea y un punto para mostrar por separado cada uno.

  document.getElementById("recetas").innerHTML = `

  <div class="carousel-item active">

    <h3 class="text-center">${data[numAl1].Nombre.replace("Receta de ", "")}</h3>
    <img class="imgRecetas" alt="" src="https://t1.rg.ltmcdn.com/es/posts/${data[numAl1].Id.toString().slice(-1)}/${data[numAl1].Id.toString().slice(numAl1Id.toString().length - 2, -1)}/${data[numAl1].Id.toString().slice(numAl1Id.toString().length - 3, -2)}/${nombAl1}_${data[numAl1].Id}_600.jpg">
    <ul>
      <li class="text-start"><a href="${data[numAl1].Link_receta}" target="_blank">Receta completa</a></li>
      <li class="text-start"><strong>Tiempo:</strong> ${data[numAl1].Tiempo}</li>
      <li class="text-start"><strong>Ingredientes:</strong><br>• ${data[numAl1].Ingredientes.replace(/,/g, "<br>• ")}</li>
    </ul>
  </div>

  <div class="carousel-item">

  <h3 class="text-center">${data[numAl2].Nombre.replace("Receta de ", "")}</h3>
  <img class="imgRecetas" alt="" src="https://t1.rg.ltmcdn.com/es/posts/${data[numAl2].Id.toString().slice(-1)}/${data[numAl2].Id.toString().slice(numAl2Id.toString().length - 2, -1)}/${data[numAl2].Id.toString().slice(numAl2Id.toString().length - 3, -2)}/${nombAl2}_${data[numAl2].Id}_600.jpg">
    <ul>
      <li class="text-start"><a href="${data[numAl2].Link_receta}" target="_blank">Receta completa</a></li>
      <li class="text-start"><strong>Tiempo:</strong> ${data[numAl2].Tiempo}</li>
      <li class="text-start"><strong>Ingredientes:</strong><br>• ${data[numAl2].Ingredientes.replace(/,/g, "<br>• ")}</li>
    </ul>
  </div>

  <div class="carousel-item">

  <h3 class="text-center">${data[numAl3].Nombre.replace("Receta de ", "")}</h3>
  <img class="imgRecetas" alt="" src="https://t1.rg.ltmcdn.com/es/posts/${data[numAl3].Id.toString().slice(-1)}/${data[numAl3].Id.toString().slice(numAl3Id.toString().length - 2, -1)}/${data[numAl3].Id.toString().slice(numAl3Id.toString().length - 3, -2)}/${nombAl3}_${data[numAl3].Id}_600.jpg">
    <ul>
      <li class="text-start"><a href="${data[numAl3].Link_receta}" target="_blank">Receta completa</a></li>
      <li class="text-start"><strong>Tiempo:</strong> ${data[numAl3].Tiempo}</li>
      <li class="text-start"><strong>Ingredientes:</strong><br>• ${data[numAl3].Ingredientes.replace(/,/g, "<br>• ")}</li>
    </ul>

  </div>`

}

recetas();


/*CARGA DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//Busca el usuario por DNI ingresado y cambia el botón de login por el de la inicial del usuario ingresado.
//Luego busca la cantidad de productos del usuario ingresado. Si no hay, carga el array vacío. Sino se llama a la función para cargarlos en pantalla. 

function prodUser(userIng, dniIng) {

  const obtenerUsr = usuario.find((user) => user.dni === dniIng);

  dniUser = dniIng;

  document.getElementById("changeButtonusrProf1").innerHTML = `
  <div class="usrProf d-flex justify-content-center align-items-center ">
  <h2 title="${obtenerUsr.nombre}">${obtenerUsr.nombre[0]}</h2>
  </div>`;

  let ultimoProd = usuario[obtenerUsr.id].producto.length;

  if (ultimoProd == 0) {

    productos = [];

  } else {

    productos = usuario[obtenerUsr.id].producto[ultimoProd - 1];

    if (productos != null) {

      tabOrig(productos);

    } else {

      productos = [];

    }

  }

}


/*CREACIÓN DE USUARIO*/
/* -------------------------------------------------------------------- */

//Toma los datos de los imputs Usuario y DNI cargándoles en un array de objetos.
//Se guarda en el localStorage usuario y se guarda en la key userLog el DNI para utilizarlo cuando se vuelva a recargar la página.

function createUser(usrAdd, dniAdd) {

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

  /*   let obtenerUsr = usuario.find((user) => user.dni === dniAdd); */

  localStorage.setItem("userLog", JSON.stringify(dniAdd));

  document.getElementById("logoff").setAttribute("class", "nav-link fa-solid fa-right-from-bracket");

  document.getElementById("logoffSalir").setAttribute("style", "display:block");

}


/*LOGUEO Y DESLOGUEO DE USUARIO*/
/* -------------------------------------------------------------------- */

//Se crea un evento click para desloguear al usuario y guardar en el localStorage la key null.

let usrunlg = document.getElementById("logoff");

usrunlg.onclick = () => {

  localStorage.setItem("userLog", null);

  location.reload();

}

//Se crea evento click para loguear o registrar al usuario.

let usrLog = document.getElementById("usrProf1");

usrLog != null && (document.getElementById("usrProf1").onclick = () => usrlog())


/*LOGUEO Y DESLOGUEO DE USUARIO*/
/* -------------------------------------------------------------------- */
//Se ejecutan sweets alerts en donde al ingresar un usario - dni y evisa si está o no creado.

function usrlog() {

  Swal.fire({
    title: 'INGRESA TUS DATOS',
    html:
      '<input id="usrAdd" class="swal2-input" placeholder="Nombre">' +
      '<input id="dniAdd" type="number" class="swal2-input" placeholder="DNI">',

    focusConfirm: false,
    confirmButtonColor: '#69a30a',

    preConfirm: () => {

      let userIng = document.getElementById("usrAdd").value[0].toUpperCase() + document.getElementById("usrAdd").value.slice(1).toLowerCase();
      let dniIng = document.getElementById("dniAdd").value;

      //Revisa si hay algún campo vacío.

      if (!userIng) {
        Swal.showValidationMessage("Ingresa tu nombre");
        return false;
      }

      if (!dniIng) {
        Swal.showValidationMessage("Intresa tu DNI");
        return false;
      }

      //Si el nombre y DNI son correctos se guardan en el localStorage, se muestra la inicial del nombre en el usuario y se llama a la funcion prodUser.

      if (usuario.find((user) => user.nombre === userIng && user.dni === dniIng)) {

        let obtenerUsr = usuario.find((user) => user.dni === dniIng);

        localStorage.setItem("userLog", JSON.stringify(obtenerUsr.dni));

        document.getElementById("usrProf1").innerHTML = `<h2 title="${userIng}">${userIng[0]}</h2>`;
        document.getElementById("logoff").setAttribute("class", "nav-link fa-solid fa-right-from-bracket");
        document.getElementById("logoffSalir").setAttribute("style", "display:block");

        dniUser = dniIng;
        nomUser = userIng;

        prodUser(userIng, dniIng);

        //Muestra el nombre en pantalla

        Swal.fire({

          position: 'center',
          icon: 'success',
          title: 'Bienvenido \n' + document.getElementById('usrAdd').value,
          showConfirmButton: false,
          timer: 1500

        })

        //Si el dni ingresado se encuentra en el array muestra el siguiente sweet alert.

      } else if (usuario.find((user) => user.dni === dniIng)) {

        swal.fire({
          title: 'DNI Existente',
          text: 'El usuario no corresponde con el DNI ingresado.',
          icon: 'warning',
          confirmButtonText: 'Volver',

          //Si se confirma el volver, vuelve a llamar a la funcion usrlog.

        }).then((result) => {

          if (result.isConfirmed) {

            usrlog();

          }

        })

        //Si no encuentra al usuario se crea el mismo.

      } else {

        swal.fire({
          title: 'Usuario no encontrado',
          text: '¿Desea crearlo?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Crear',
          cancelButtonText: 'Cancelar',
          reverseButtons: true

        }).then((result) => {

          if (result.isConfirmed) {

            dniUser = dniIng;
            nomUser = userIng;

            document.getElementById("changeButtonusrProf1").innerHTML = `
            <div class="usrProf d-flex justify-content-center align-items-center ">
            <h2 title="${userIng}">${userIng[0]}</h2>
            </div>`;
            
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

      }

    }

  })

}


/*GENERACIÓN DE TABLA EN PANTALLA*/
/* -------------------------------------------------------------------- */

//Se limpian los valores de los imputs de agregar producto y se genera tabla en pantalla.
//Se imprime en pantalla el valor total de los productos.

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
    <td class="align-middle">$${producto.precio.toFixed(2)}</td>
    <td class="canti">
      <div class="input-group input-group-sm ">
      <span class="input-group-text" id="basic-addon1">X</span>
        <input id="${producto.id}" type="number" class="form-control text-center" min="1" value="${producto.cantidad}" aria-describedby="basic-addon1">
      </div>
    </td>
    <td class="align-middle">$${producto.totprod.toFixed(2)}</td>
    <td class="align-middle">
      <div class="d-flex justify-content-end btn-group">
      <button id="ed${producto.id}" value="${producto.id}" class="btn btn-outline-success btn-sm fa-regular fa-pen-to-square" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd"></button>
        <button id="el${producto.id}" value="${producto.id}" class="btn btn-outline-secondary btn-sm fa-regular fa-trash-can" type="button"></button>
      </div>
    </td>`;

    document.getElementById("totalProd").innerText = "TOTAL: $" + precioTotal.toFixed(2);
    document.getElementById("cantidadProductos").innerText = productos.length;
    document.getElementById("cantidadProductos").setAttribute("class", "mb-0 fw-bold");
  }

  tabGen = document.getElementById("tabla");
  tabGen.append(genTab);

}


/*CARGA DE PRODUCTOS EN ARRAY DE OBJETOS*/
/* -------------------------------------------------------------------- */

//se toman valores de los inputs y se guardan en el array. Luego se llama al a función prodGen para mostrarlos en pantalla.

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

  id++;
  prod++;

  productos.push(new Producto(id, prodIng, precIng, cantIng));

  const obtenerUsr = usuario.find((user) => user.dni === dniUser);
  usuario[obtenerUsr.id].producto[0] = productos;

  localStorage.setItem("usuarios", JSON.stringify(usuario));

  prodGen()

}


/*INPUTS PARA AGREGAR PRODUCTOS*/
/* -------------------------------------------------------------------- */

//Al presionar el botgon (+) de agregar producto, desaparece y aparecen los imputs seteándolos con el attrib required.

function btnAgregar() {

  //Borra la clase was-validated la cual muestra los íconos de validación de formulario.

  document.getElementById("formu").classList.remove("was-validated");

  document.getElementById("agregarProd").style.display = "none";
  document.getElementById("ingresarProd").style.display = "flex";

  document.getElementById("cantProd").focus();

}

//Se llama con el evento click a la funcion btnAgregar().

let agrProBtn = document.getElementById("agrProBtn");

agrProBtn.onclick = () => btnAgregar();


//Se agrega script para la validación del formulario de Boostrap.

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

//Al terminar de agregar el producto y enviarlo al array, oculta los imputs y vuelve a mostrar el botón agregar (+).

function btnAgregarOcul() {

  let prodIng = document.getElementById("cantProd").value;
  let precIng = document.getElementById("precIngr").value;
  let cantIng = document.getElementById("cantIngr").value;

  btnVali();

  if (prodIng != "" && precIng != "" && cantIng != "") {

    document.getElementById("agregarProd").style.display = "block";
    document.getElementById("ingresarProd").style.display = "none";

    addProd();

  }

}

//Se llama con el evento click a la funcion btnAgregarOcul().

let ocuProBtn = document.getElementById("button-addon2");

ocuProBtn.onclick = () => btnAgregarOcul();


/*CREACIÓN DE TABLA*/
/* -------------------------------------------------------------------- */

//Función para crear tabla dependiente si se elimina o se modifica un campo de algún producto.

function tabla(prod) {

  genTab = document.createElement("tr");

  genTab.innerHTML += `

 <td class="align-middle">${prod.nombre}</td>
 <td class="align-middle">$${prod.precio.toFixed(2)}</td>
 <td class="canti">
   <div class="input-group input-group-sm ">
     <span class="input-group-text" id="basic-addon1">X</span>
     <input input id="${prod.id}" type="number" class="form-control text-center" min="1" value="${prod.cantidad}" aria-describedby="basic-addon1">
   </div>
 </td>
 <td class="align-middle">$${prod.totprod.toFixed(2)}</td>
 <td class="align-middle">
 <div class="d-flex justify-content-end btn-group">
 <button id="ed${prod.id}" value="${prod.id}" class="btn btn-outline-success btn-sm fa-regular fa-pen-to-square" data-bs-toggle="modal" type="button" data-bs-target="#modificarProd"></button>
   <button id="el${prod.id}" value="${prod.id}" class="btn btn-outline-secondary btn-sm fa-regular fa-trash-can" type="button"></button>
   </div>
 </td>`;

  tabGen = document.getElementById("tabla");

  tabGen.append(genTab);

}

//Rearma la tabla con los productos actuales.

function rearmarTab() {

  precioTotal = 0;

  productos.forEach((prod) => {

    id++;

    productos[id].id = id;

    tabla(prod);

    precioTotal = precioTotal + productos[id].totprod;

  });

  document.getElementById("totalProd").innerText = "TOTAL: $" + precioTotal.toFixed(2);
  document.getElementById("cantidadProductos").innerText = productos.length;
  document.getElementById("cantidadProductos").setAttribute("class", "mb-0 fw-bold");

  const obtenerUsr = usuario.find((user) => user.dni === dniUser);

  usuario[obtenerUsr.id].producto[0] = productos;

  localStorage.setItem("usuarios", JSON.stringify(usuario));


}


/*BUSCADOR DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//Se realiza búsqueda del producto y se muestra en la tabla en tiempo real. Si el campo está vacío, muestra los productos agregados.

function busqueda() {

  id = -1;

  const resBusq = productos.filter((prod) => prod.nombre.includes(busProdIng.value[0].toUpperCase() + busProdIng.value.slice(1).toLowerCase()));

  //Eliminar elementos de tabla para mostrar los buscados.

  let elimTabla = document.getElementById("tabla");

  while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);

  //Se recorre el array de búsqueda y se imprime en pantalla.

  resBusq.forEach((prod) => {

    tabla(prod);

  });

}
//Elimina elementos de la tabla y muestra en la misma los productos cargados.

function tabOrig() {

  id = -1;

  let elimTabla = document.getElementById("tabla");

  while (elimTabla.firstChild) elimTabla.removeChild(elimTabla.firstChild);

  rearmarTab();

}

let busProdIng = document.getElementById("busProdIng");

busProdIng.addEventListener("input", () => busProdIng.value ? busqueda() : tabOrig());


/*MODIFICACIÓN DE PRODUCTOS*/
/* -------------------------------------------------------------------- */

//Elimina inputs de modificación de productos, si los hay, y crea nuevamente los mismos obteniendo el valor actual de los productos seleccionados.

function modProd(valVal) {

  let ediProd = document.getElementById("ediProd");

  while (ediProd.firstChild) ediProd.removeChild(ediProd.firstChild);

  let prodSelecEdi = productos[valVal];

  modTab = document.createElement("div");
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
    </form>`;

  tabGen = document.getElementById("ediProd");

  tabGen.append(modTab);

//Se agrega el producto modificado al array y se guarda en el localStorage.

  let btnMod = document.getElementById("btnMod");

  btnMod.addEventListener("click", () => {

/*     document.getElementById("prodIngrMod").focus(); */

    let prodIngrMod = document.getElementById("prodIngrMod").value;
    let precIngrMod = document.getElementById("precIngrMod").value;
    let cantIngrMod = document.getElementById("cantIngrMod").value;


    if (prodIngrMod != "" && precIngrMod != "" && cantIngrMod != "") {
      
    productos[valVal].nombre = prodIngrMod[0].toUpperCase() + prodIngrMod.slice(1).toLowerCase();
    productos[valVal].precio = parseFloat(precIngrMod);
    productos[valVal].cantidad = parseInt(cantIngrMod);
    productos[valVal].totprod = productos[valVal].precio * productos[valVal].cantidad;

    const obtenerUsr = usuario.find((user) => user.dni === dniUser);

    usuario[obtenerUsr.id].producto[0] = productos;

    localStorage.setItem("usuarios", JSON.stringify(usuario));

    tabOrig();

  }
 });

}
//Escuchador de eventos click en el cual chequea si se presionó el botón editar o eliminar de un producto específico.
//Se realiza un condicional para sacar error en consola el cual era producido por tocar cualquier etiqueta dentro del id "tabla".
//Éste condicional activa las funciones si lo presionado en tabla devuelve un valor.

let tab = document.getElementById("tabla");

tab.addEventListener("change", (e) => {

  let cantNuev = e.target.value;

  productos[e.target.id].cantidad = cantNuev;
  productos[e.target.id].totprod = productos[e.target.id].precio * cantNuev;

  tabOrig();

});

//Se realiza condicional concatenando el valor del botón presionado con un string y se compara para saber si se presionó editar o eliminar.

tab.addEventListener("click", (e) => {

  let valId = document.getElementById(e.target.id);

  valId != null && busqIdBot();

  function busqIdBot() {

    if (valId.id == "ed" + valId.value) {

      modProd(valId.value);

    } else if (valId.id == "el" + valId.value) {

      //Sweet alert para confirmar la eliminación.

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

          //Se elimina el producto seleccionado

          productos.splice(valId.value, 1);

          const obtenerUsr = usuario.find((user) => user.dni === dniUser);

          usuario[obtenerUsr.id].producto[0] = productos;

          localStorage.setItem("usuarios", JSON.stringify(usuario));

          tabOrig();

        }

      });

    }

  }

});