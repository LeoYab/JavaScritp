/* //Desafío: Selección de productos los cuales cuentan con su respectivo precio. Al terminar la "compra" se visualiza el total y los descuentos que hay con diferentes bancos.

let seleccion = prompt("Ingresa la zapatilla que desees: \nAdidas: $10.000 \nNike: $7.500 \nTopper: $5.300 \n\nOK Para terminar.");
let precio = 0;
let banco;
let precioDesc;

//Selección de productos e impresión en pantalla de cada uno.

while (seleccion != "OK") {
    switch (seleccion) {
        case "ADIDAS":
        case "Adidas":
        case "adidas":
            precio = precio + 10000;
            console.log("Elegiste Adidas.\nValor: $10.000");

            break;

        case "NIKE":
        case "Nike":
        case "nike":
            precio = precio + 7500;
            console.log("Elegiste Nike. \nValor: $7.500");

            break;

        case "TOPPER":
        case "Topper":
        case "topper":
            precio = precio + 5300;
            console.log("Elegiste Topper. \nValor: $5.300");

            break;

        default:
            console.log("No seleccionaste el producto de la lista");
            break;
    }

    seleccion = prompt("Ingresa otra zapatilla que desees: \n Adidas: $10.000 \n Nike: $7.500 \n Topper: $5.300 \n\nOK Para terminar.");
}

//Suma total de los productos seleccionados
console.log("Total: $" + precio);

// Muestra en pantalla el descuento con cada banco.

for (let i = 1; i <= 3; i++) {
    precioDesc = precio - ((precio * (i * 20)) / 100);

    if (i == 1) {
        banco = "Con BBVA tenés un 20% de descuento quedando en: $"
    } else if (i == 2) {
        banco = "Con Santander tenés un 60% de descuento quedando en: $"
    } else if (i == 3) {
        banco = "Con Supervielle tenés un 80% de descuento quedando en: $"
    }

    console.log(banco + precioDesc);
}
 */

function totalDesc (valor1, valor2){
let valor1= prompt("Ingrese valor1");
let valor2= prompt("Ingrese valor2");
return valor1

}
console.log (valor1);