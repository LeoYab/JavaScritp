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

/* alert("¡Bienvenido a SuperLista!\n\nAquí podrás crear tu lista de super y visualizar el total." + "\n\nFecha: " + fecha.toLocaleString()); */

function addProd(){

    let prodIng = document.getElementById("cantProd").value;
    let precIng = document.getElementById("precIngr").value;
    let cantIng = document.getElementById("cantIngr").value;
    
   

    class Producto {
        constructor(nombre, precio, cantidad) {

            this.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
            this.precio = parseFloat(precio);
            this.cantidad = parseInt(cantidad);
            this.totprod = parseFloat(this.precio * this.cantidad);
        }

    }

    productos.push(new Producto(prodIng, precIng, cantIng));

    prodgen()
}



//Función constructora y modificadora de productos previamente creados.

function prodgen() {

     prodIng = document.getElementById("cantProd").value = "";
     precIng = document.getElementById("precIngr").value = "";
     cantIng = document.getElementById("cantIngr").value = "";

   let genTab = document.createElement("tr");

   for(const producto of productos){
    
    genTab.innerHTML = `
    <td>${producto.nombre}</td>
    <td>${producto.precio}</td>
    <td class="canti">
      <div class="input-group input-group-sm ">
        <span class="input-group-text" id="basic-addon1">X</span>
        <input type="number" class="form-control text-center" placeholder="1" aria-describedby="basic-addon1">
      </div>
    </td>
    <td>${producto.cantidad}</td>
    <td>
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-sm btn-outline-success" type="submit">Edit</button>
        <button class="btn btn-sm btn btn-outline-secondary" type="submit">Del</button>
      </div>
    </td>
    `
   }

   tabGen = document.getElementById("tabla");
   tabGen.append(genTab);
 
   
}
    