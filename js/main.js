// Desafío: Programa de una lista de supermercado en donde se debe indicar el Nombre del producto, Valor y Cantidad.
//Luego se muestra el total con IVA y si tiene o no descuento dependiendo de la tarjeta.
let precio = 0;
let precioTotal = 0;
let prodIngr;
let tarjeta;
let precioDesc;
let cantidadProd;


alert("¡Bienvenido a SuperLista!\n\nAquí podrás crear tu lista de super y visualizar el total.");

// Ejecución del programa
while (prodIngr != "OK") {
    producto();
}

//Función para agregar productos y verificar tarjeta para descuento
function producto() {
    prodIngr = prompt("Ingresa un producto\n\nPara terminar ingresa OK");

    if (prodIngr != "OK") {

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
}



/* 
//Constructor

class Producto {
    constructor(nombre, precio, cantidad){

    this.nombre = nombre[0].toUpperCase() + nombre.substring(1);
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
}
ingresaProducto(){
    console.log("Producto: " + this.nombre + "\nPrecio: " + this.precio + "\nCantidad: " + this.cantidad)
}
}

const prod1 = new Producto (prompt("Ingresa el producto:"), prompt("Ingresa el Precio:"), prompt("Ingresa la cantidad:"));

console.log(prod1); */