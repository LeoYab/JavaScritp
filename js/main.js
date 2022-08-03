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

alert("¡Bienvenido a SuperLista!\n\nAquí podrás crear tu lista de super y visualizar el total." + "\n\nFecha: " + fecha.toLocaleString());


addProd()

//Función constructora y modificadora de productos previamente creados.

function addProd() {

    class Producto {
        constructor(nombre, precio, cantidad) {

            this.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
            this.precio = parseFloat(precio);
            this.cantidad = parseInt(cantidad);
            this.totprod = parseFloat(this.precio * this.cantidad);
        }

    }

    //Se realiza un While en donde se irán agregando los nuevos productos hasta que se escriba OK.
    //Los mismos se irán mostrando en la consola para poder luego editarlos en caso de necesitarlo.

    while (terminar != "OK") {


        productos.push(new Producto(prompt("Ingresa el producto:"), prompt("Ingresa el Precio:"), prompt("Ingresa la cantidad:")));

        terminar = prompt("Presione ENTER para agregar otro producto\n\nIngrese OK para terminar.");

        console.log(productos[contProdNom])

        contProdNom = contProdNom + 1;


    }

    //Luego de la carga de productos se ingresa una condición en donde el usuario puede modificar y eliminar productos.

    if (terminar == "OK") {

        let modList = prompt("\nSi desea modificar la lista elija lo siguiente:\n\n1) Modificar producto\n2) Eliminar producto\n3) Terminar");

        if (modList == 1) {

            let indSelec = parseInt(prompt("Ingrese el índice del producto a modificar:"));
            let nombreMay = prompt("Ingrese el nuevo nombre:");

            productos[indSelec].nombre = nombreMay[0].toUpperCase() + nombreMay.slice(1).toLowerCase();
            productos[indSelec].precio = parseFloat(prompt("Ingrese el precio:"));
            productos[indSelec].cantidad = parseInt(prompt("Ingrese la cantidad:"));
            productos[indSelec].totprod = productos[indSelec].precio * productos[indSelec].cantidad;

            console.log(productos);

            valTotal();
            busProd();
            // La modificación de datos la intenté realizar con el splice que se muestra comentado abajo, pero no tomaba el valor del precio por la cantidad. 
            //Por lo cual se realizó como se ve arriba.
            /* productos.splice(prompt("Ingrese el índice del producto a modificar:"), 1, { nombre: prompt("Ingrese el nuevo nombre:"), precio: parseFloat(prompt("Ingrese el precio:")), cantidad: parseInt(prompt("Ingrese la cantidad:")) }); */

        } else if (modList == 2) {

            productos.splice(prompt("Ingrese el índice del producto a eliminar:"), 1);

            console.log(productos);

            valTotal();
            busProd();

        } else {

            valTotal();
            busProd();
        }
    } 

   
}

//Se crea una función con un for que recorre el array y suma el valor total de los productos agregados.

function valTotal() {

    for (const vTotal of productos) {

        precioTotal = precioTotal + vTotal.totprod;
    }
    console.log("El precio total es: $" + precioTotal);

}

//Función para realizar búsquedas de productos

function busProd() {

    let buscarProd = prompt("Si desea buscar un producto presione ENTER\n\nIngrese ESC para salir");

    while (buscarProd != "ESC") {

        let busProd = prompt("Ingrese el nombre del producto a buscar")

        busProd = busProd[0].toUpperCase() + busProd.slice(1).toLowerCase();

        const resBusq = productos.filter((prod) => prod.nombre.includes(busProd))

        if (resBusq != "") {

            console.table(resBusq);

            break;

        } else {

            console.log("El producto no está en la lista.")
            buscarProd = prompt("Si desea buscar un producto presione ENTER\n\nIngrese ESC para salir");
        } 

    } 

        console.log("Gracias por su visita")
   

}
