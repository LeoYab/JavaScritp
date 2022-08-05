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


function prodGen() {

    prodIng = document.getElementById("cantProd").value = "";
    precIng = document.getElementById("precIngr").value = "";
    cantIng = document.getElementById("cantIngr").value = "";

    let genTab = document.createElement("tr");

    for (const productor of productos) {

        genTab.innerHTML =`
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
        <button class="btn btn-sm btn-outline-success" type="submit">Edit</button>
        <button class="btn btn-sm btn btn-outline-secondary" type="submit">Del</button>
      </div>
    </td>
    `;
    document.getElementById("totalProd").innerHTML = "TOTAL: $" + precioTotal;

    }

  /*   precioTotal = precioTotal + producto.totprod; */
  
    tabGen = document.getElementById("tabla");
    tabGen.append(genTab);


}



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
       //REVISAR PORQUÉ EL PRECIO TOTAL SALE COMO UNDEFINED
    }

    productos.push(new Producto(prodIng, precIng, cantIng));


    prodGen()
}




//AL PRESIONAR EL BOTON DE AGREGAR PRODUCTO, DESAPARECE Y APARECEN LOS INPUTS.

function btnAgregar() {
    document.getElementById("agregarProd").style.display = "none";
    document.getElementById("ingresarProd").style.display = "flex"

    document.getElementById("cantProd").focus();
    document.getElementById("cantProd").select();
}

let agrProBtn = document.getElementById("agrProBtn")

agrProBtn.onclick = () => {btnAgregar()}


//AL TERMINAR DE AGREGAR EL PRODUCTO Y ENVIARLO AL ARRAY, OCULTA LOS IMPUTS Y VUELVE A MOSTRAR EL BOTON AGREGAR

function btnAgregarOcul() {
    document.getElementById("agregarProd").style.display = "block";
    document.getElementById("ingresarProd").style.display = "none"

    addProd() 
}

let ocuProBtn = document.getElementById("button-addon2")

ocuProBtn.onclick = () =>{btnAgregarOcul()}


