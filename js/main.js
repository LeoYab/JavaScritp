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

    prodUser("", obtenerUser);
   
    document.getElementById("logoff").setAttribute("class", "nav-link fa-solid fa-right-from-bracket");
    document.getElementById("logoffSalir").setAttribute("style", "display:block");
  }

}

/* async function dolar(){

const dolarTr = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
const resp = await fetch(dolarTr)
const data = await resp.json()

document.getElementById("dolar").innerHTML=`<p>Dolar Blue: US$ ${data.compra}</p>`;



} */




const recetas = async () => {

  const recetJson = await fetch("./js/data/recetas.json")

  const data = await recetJson.json();

/*   const filtro = data.filter ((el) => el.Ingredientes.includes(" "))

  console.log(filtro) */

let numAl1 = Math.round(Math.random() * 11300);
let numAl2 = Math.round(Math.random() * 11300);
let numAl3 = Math.round(Math.random() * 11300);


let numAl1Id = data[numAl1].Id;
let nombAl1 =  data[numAl1].Nombre.replace("Receta de ", "")
nombAl1 = nombAl1.replace(/ /g, "_")
nombAl1 = nombAl1[0].toLowerCase() + nombAl1.slice(1).toLowerCase();
nombAl1 = nombAl1.normalize('NFD').replace(/[\u0300-\u036f]/g,"")

let numAl2Id = data[numAl2].Id;
let nombAl2 =  data[numAl2].Nombre.replace("Receta de ", "")
nombAl2 = nombAl2.replace(/ /g, "_")
nombAl2 = nombAl2[0].toLowerCase() + nombAl2.slice(1).toLowerCase();
nombAl2 = nombAl2.normalize('NFD').replace(/[\u0300-\u036f]/g,"")

let numAl3Id = data[numAl3].Id;
let nombAl3 =  data[numAl3].Nombre.replace("Receta de ", "")
nombAl3 = nombAl3.replace(/ /g, "_")
nombAl3 = nombAl3[0].toLowerCase() + nombAl3.slice(1).toLowerCase();
nombAl3 = nombAl3.normalize('NFD').replace(/[\u0300-\u036f]/g,"")

/* console.log(data[numAl1].Id.toString().slice(-1))

console.log(data[numAl1].Id.toString().slice(numAl1Id.toString().length -2, -1))

console.log(data[numAl1].Id.toString().slice(numAl1Id.toString().length -3, -2)) */



  document.getElementById("recetas").innerHTML = `

  <div class="carousel-item active">

    <h3 class="text-center">${data[numAl1].Nombre.replace("Receta de ", "")}</h3>
    <img class="imgRecetas" alt="" src="https://t1.rg.ltmcdn.com/es/posts/${data[numAl1].Id.toString().slice(-1)}/${data[numAl1].Id.toString().slice(numAl1Id.toString().length -2, -1)}/${data[numAl1].Id.toString().slice(numAl1Id.toString().length -3, -2)}/${nombAl1}_${data[numAl1].Id}_600.jpg">
    <ul>
      <li class="text-start"><a href="${data[numAl1].Link_receta}" target="_blank">Receta completa</a></li>
      <li class="text-start"><strong>Tiempo:</strong> ${data[numAl1].Tiempo}</li>
      <li class="text-start"><strong>Ingredientes:</strong><br>• ${data[numAl1].Ingredientes.replace(/,/g, "<br>• ")}</li>
    </ul>
  </div>

  <div class="carousel-item">

  <h3 class="text-center">${data[numAl2].Nombre.replace("Receta de ", "")}</h3>
  <img class="imgRecetas" alt="" src="https://t1.rg.ltmcdn.com/es/posts/${data[numAl2].Id.toString().slice(-1)}/${data[numAl2].Id.toString().slice(numAl2Id.toString().length -2, -1)}/${data[numAl2].Id.toString().slice(numAl2Id.toString().length -3, -2)}/${nombAl2}_${data[numAl2].Id}_600.jpg">
    <ul>
      <li class="text-start"><a href="${data[numAl2].Link_receta}" target="_blank">Receta completa</a></li>
      <li class="text-start"><strong>Tiempo:</strong> ${data[numAl2].Tiempo}</li>
      <li class="text-start"><strong>Ingredientes:</strong><br>• ${data[numAl2].Ingredientes.replace(/,/g, "<br>• ")}</li>
    </ul>
  </div>

  <div class="carousel-item">

  <h3 class="text-center">${data[numAl3].Nombre.replace("Receta de ", "")}</h3>
  <img class="imgRecetas" alt="" src="https://t1.rg.ltmcdn.com/es/posts/${data[numAl3].Id.toString().slice(-1)}/${data[numAl3].Id.toString().slice(numAl3Id.toString().length -2, -1)}/${data[numAl3].Id.toString().slice(numAl3Id.toString().length -3, -2)}/${nombAl3}_${data[numAl3].Id}_600.jpg">
    <ul>
      <li class="text-start"><a href="${data[numAl3].Link_receta}" target="_blank">Receta completa</a></li>
      <li class="text-start"><strong>Tiempo:</strong> ${data[numAl3].Tiempo}</li>
      <li class="text-start"><strong>Ingredientes:</strong><br>• ${data[numAl3].Ingredientes.replace(/,/g, "<br>• ")}</li>
    </ul>

  </div>
  `
}


recetas();


/* const userBd = async () => {

  const userReg = await fetch("./js/data/datausr.json")

  const data = await userReg.json()


  data.forEach((post) => {
    localStorage.setItem("usuarios", JSON.stringify(post));
    usuario = post;

  });

}
userBd(); */





/* 
const dolar = async () => {

  const dolarBlue = await fetch("https://api-dolar-argentina.herokuapp.com/api/dolarblue")

  const data = await dolarBlue.json()

  document.getElementById("dolar").innerHTML = `<p>Dolar Blue: US$ ${data.compra}</p>`;

}
dolar();*/
function prodUser(userIng, dniIng) {


  const obtenerUsr = usuario.find((user) => user.dni === dniIng);

  dniUser = dniIng;

  document.getElementById("changeButtonusrProf1").innerHTML = `
  <div class="usrProf d-flex justify-content-center align-items-center ">
  <h2 title="${obtenerUsr.nombre}">${obtenerUsr.nombre[0]}</h2>
  </div>`;

 
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


  /* const guardarjson = async () =>{
  
    const URLJSON = await fetch("./js/datausr.json");
  
    const data = await URLJSON.json()
  
  data ((post) => {
  usuario
  
  })
  
  }
  
  guardarjson()
   */
  /*   .then((res) => res.json())
    .then((data) =>{
  
      
    }) */

  let obtenerUsr = usuario.find((user) => user.dni === dniAdd);


  localStorage.setItem("userLog", JSON.stringify(obtenerUsr.dni));

  document.getElementById("logoff").setAttribute("class", "nav-link fa-solid fa-right-from-bracket");
  document.getElementById("logoffSalir").setAttribute("style", "display:block");
}

let usrunlg = document.getElementById("logoff");

usrunlg.onclick = () => {
  localStorage.setItem("userLog", null);
  location.reload();
}


let usrLog = document.getElementById("usrProf1");

usrLog != null && (document.getElementById("usrProf1").onclick = () => usrlog() )



function usrlog() {

  Swal.fire({
    title: 'INGRESA TUS DATOS',
    html:
      '<input id="usrAdd" class="swal2-input" placeholder="Nombre">' +
      '<input id="dniAdd" type="number" class="swal2-input" placeholder="DNI">',

    /*     input: 'file',
        inputAttributes: {
          'accept': 'image/*',
          'aria-label': 'Upload your profile picture',
           id: "imgUsr"
        }, */
    focusConfirm: false,
    confirmButtonColor: '#69a30a',



    /*    usuario.dni.includes(dniAdd) ? console.log("existe") : console.log("no existe"), */


    preConfirm: () => {

      /* const userBusq = usuario.find ((e) => e.id.includes(verifUser))
      console.log(userBusq); */
      /* usuario.forEach((e) => e.dni.includes(verifUser) ? console.log("Existe") : console.log("No existe")) */

      let userIng = document.getElementById("usrAdd").value[0].toUpperCase() + document.getElementById("usrAdd").value.slice(1).toLowerCase();
      let dniIng = document.getElementById("dniAdd").value;


      if (!userIng) {
        Swal.showValidationMessage("Ingresa tu nombre");
        return false;
      }

      if (!dniIng) {
        Swal.showValidationMessage("Intresa tu DNI");
        return false;
      }



      /*    usuario[obtenerUsr.id].producto[0] = productos; */



      if (usuario.find((user) => user.nombre === userIng && user.dni === dniIng)) {


        let obtenerUsr = usuario.find((user) => user.dni === dniIng);

        localStorage.setItem("userLog", JSON.stringify(obtenerUsr.dni));

        document.getElementById("usrProf1").innerHTML = `<h2 title="${userIng}">${userIng[0]}</h2>`;
        document.getElementById("logoff").setAttribute("class", "nav-link fa-solid fa-right-from-bracket");
        document.getElementById("logoffSalir").setAttribute("style", "display:block");
        dniUser = dniIng;
        nomUser = userIng;

        prodUser(userIng, dniIng)

        //Se toma el elemento imagen del id imgUsr y se debe inyectar en el css .usrProf
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido \n' + document.getElementById('usrAdd').value,
          showConfirmButton: false,
          timer: 1500

        })



      } else if (usuario.find((user) => user.dni === dniIng)) {
        swal.fire({
          title: 'DNI Existente',
          text: 'El usuario no corresponde con el DNI ingresado.',
          icon: 'warning',
          confirmButtonText: 'Volver',

        }).then((result) => {
          if (result.isConfirmed) {
            usrlog();
          }
        })
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
            document.getElementById("usrProf1").innerHTML = `
            <h2 title="${userIng}">${userIng[0]}</h2>`;
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