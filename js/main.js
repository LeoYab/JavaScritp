// Desafío: Programa de una lista de supermercado en donde se debe indicar el Nombre del producto, Valor y Cantidad.
//Luego se muestra el total con IVA y si tiene o no descuento dependiendo de la tarjeta.
let precio = 0;
let precTotProd = 0;
let precioTotal = 0;
let terminar;
const productos = [];
let totProd;
alert("¡Bienvenido a SuperLista!\n\nAquí podrás crear tu lista de super y visualizar el total.");

// Ejecución del programa
/* while (productos[nombre] != "OK") {
    addProd();
} */


addProd()

function addProd() {

    class Producto {
        constructor(nombre, precio, cantidad) {

            this.nombre = nombre[0].toUpperCase() + nombre.slice(1).toLowerCase();
            this.precio = parseFloat(precio);
            this.cantidad = parseInt(cantidad);
            this.totprod = parseFloat(this.precio * this.cantidad);
        }

    }

    while (terminar != "OK") {

        productos.push(new Producto(prompt("Ingresa el producto:"), prompt("Ingresa el Precio:"), prompt("Ingresa la cantidad:")));

        terminar = prompt("Presione ENTER para agregar otro producto\n\nIngrese OK para terminar.");
    }


    if (terminar == "OK") {

        let modList = prompt("Si desea modificar la lista elija lo siguiente:\n\n1) Modificar producto\n2) Eliminar producto\n3) Terminar");

        if (modList == 1) {

            let indSelec = parseInt(prompt("Ingrese el índice del producto a modificar:"));
            let nombreMay = prompt("Ingrese el nuevo nombre:");
            productos[indSelec].nombre = nombreMay[0].toUpperCase() + nombreMay.slice(1).toLowerCase();
            productos[indSelec].precio = parseFloat(prompt("Ingrese el precio:"));
            productos[indSelec].cantidad = parseInt(prompt("Ingrese la cantidad:"));
            productos[indSelec].totprod = productos[indSelec].precio * productos[indSelec].cantidad;

            console.log(productos);
            // A arreglar, no toma el valor de totprod
            /*  productos.splice(prompt("Ingrese el índice del producto a modificar:"), 1, { nombre: prompt("Ingrese el nuevo nombre:"), precio: parseFloat(prompt("Ingrese el precio:")), cantidad: parseInt(prompt("Ingrese la cantidad:")) }); */

        } else if (modList == 2) {

            productos.splice(prompt("Ingrese el índice del producto a eliminar:"), 1);

            console.log(productos);

        } else {

            console.log(productos);
        }
    } else {

        return productos();

    }

    valTotal();
    busProd()
}


function valTotal() {

    for (const vTotal of productos) {
        precioTotal = precioTotal + vTotal.totprod;
    }
    console.log("El precio total es: $" + precioTotal);

}


function busProd() {

    let buscarProd = prompt("Si desea buscar un producto presione ENTER\n\nIngrese ESC para salir");

    if (buscarProd != "ESC") {

        let busProd = prompt("Ingrese el nombre del producto a buscar")
        let posicionProd;

        busProd = busProd[0].toUpperCase() + busProd.slice(1).toLowerCase();

        for (const producto of productos) {

            if (producto.nombre == busProd) {
                posicionProd = productos.indexOf(producto);
                console.log("Producto buscado: " + busProd);
                console.log(producto);
                break;
            }
        }

        if (posicionProd == undefined) {
            console.log("El producto no está en la lista.")
        }
       
    } else {

        console.log("Gracias por su visita")
    }

}
   /*  for (let i = 0; i < productos.length; i++) {

precioTotal = precioTotal + productos[i].precio;

}

console.log("El precio total es: $" + precioTotal); */


/* if (prodIngr != "OK") {

    precio = parseFloat(prompt("Ingresa el valor"));
 cantidadProd = parseInt(prompt("Ingresa la cantidad"));

    if (cantidadProd < 1) {
        alert("Ingrese una cantidad válida");
        cantidadProd = parseInt(prompt("Ingresa la cantidad"));
        precioTotProd();
    } else {
        precioTotProd();
    }

} else {

    console.log("Total: $" + precioTotal);
    tarjeta = prompt("Elige la tarjeta: \n1) BBVA 20%\n2) Santander 40%\n3) Supervielle 60%");
    descuento(tarjeta);
}
}

// Se suma el precio del producto por la cantidad y se muestra en pantalla los datos ingresados.
function precioTotProd(){
precioTotal = precioTotal + (precio * cantidadProd);
console.log("Producto: " + prodIngr + " " + "Cantidad: x" + cantidadProd + " " + "Valor unitario: $" + precio);
}

//Bucle para indicar el precio con el descuento e iva.
function descuento(valortarj) {

for (i = 1; i <= 3; i++) {

    precioDesc = (precioTotal - ((precioTotal * (i * 20)) / 100)) * 1.21;

    if (i == 1 && valortarj == "1") {

        console.log("Con BBVA tenés un 20% de descuento quedando en: $" + precioDesc + " IVA incluido.");

    } else if (i == 2 && valortarj == "2") {

        console.log("Con Santander tenés un 40% de descuento quedando en: $" + precioDesc + " IVA incluido.");

    } else if (i == 3 && valortarj == "3") {

        console.log("Con Supervielle tenés un 60% de descuento quedando en: $" + precioDesc + " IVA incluido.");

    } else if (valortarj != "1" && valortarj != "2" && valortarj != "3") {

        console.log("No contás con descuento. Valor total con IVA: $" + (precioTotal * 1.21));

        break;
    }
}


*/

/* 
//Constructor

 */