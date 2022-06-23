const fs = require("fs")

let productos = [];

class Productos {

    constructor(title, price, stock, thumbnail) {
        this.title = title,
        this.price = price,
        this.stock = stock,
        this.thumbnail = thumbnail
    };

}

//productos.push(new Productos('Mouse', 2500, 10, 'https://cdn.pixabay.com/photo/2013/07/12/17/41/computer-mouse-152249_1280.png'));
//productos.push(new Productos('Teclado', 3000, 10, 'https://cdn.pixabay.com/photo/2016/05/23/05/48/keyboard-1409743_1280.png'));
//productos.push(new Productos('Monitor', 5000, 10, 'https://cdn.pixabay.com/photo/2012/04/13/17/00/lcd-32872_1280.png'));
productos.push(new Productos('Impresora', 2000, 10, 'https://cdn.pixabay.com/photo/2013/07/13/12/19/printer-159612_1280.png'));
productos.push(new Productos('SSD 512GB', 15000, 10, 'https://cdn.pixabay.com/photo/2014/04/09/08/16/data-storage-319844_1280.jpg'));


class Contenedor {
    constructor(file) {
        this.file = file;
    }
    getAll = async () => {

        try {
            const check = await fs.promises.readFile(`${this.file}`, 'utf-8');
            return JSON.parse(check);
            ///https://stackoverflow.com/questions/37605464/asynchronous-version-of-json-stringify-and-json-parse;

        } catch (error) {
            console.log('El archivo está vacío');
            await fs.promises.writeFile(this.file,"");
            const check = await fs.promises.readFile(this.file, 'utf-8');
            return check;

        }

    } 
    saveAll = async (productoingresado) => {
        let arrayprevio = await this.getAll();
        let idPrevio = () => {
            if (arrayprevio.length >0) {
                return arrayprevio.length;
            } else {
                arrayprevio = [];
                return 0;

            }
        }
        productoingresado.forEach((value, index) => {
            value.id = index + idPrevio() +1 ;
        })
        arrayprevio.push(...productoingresado);
        
        try {
            await fs.promises.writeFile(`${this.file}`, JSON.stringify(arrayprevio, null, 2));
            return console.log(`Nuevo item agregado con exito!`);
        } catch (error) {
            throw new Error('Error en el guardado');
        }
    }

    getById = async (nro) => {
        try {
            const check = await this.getAll();
            let validate = 0;
            check.forEach((element) => {
                if (element.id == nro) {
                    console.log('Su producto se encuentra en el carrito');
                    validate++;
                }
            })
            if (validate == 0) {
                console.log('No existe el producto');
            }
        } catch {
            throw new Error('Error al obtener el Id');
        }
    }

    deleteById = async (nro) => {
        try {
            const check = await this.getAll();
            check.forEach(element => {
                if (nro == element.id) {
                    check.splice(check.indexOf(element), 1);
                }
            })
            await fs.promises.writeFile(this.file, JSON.stringify(check, null, 2));
        } catch {
            throw new Error('Error en el borrado de Id');
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.file, "") //JSON.stringify([], null, 2);
            console.log('Todos los productos fueron eliminados');
        } catch {
            throw new Error('No se pudieron borrar todos los objetos');
        }
    }

    sellById = async (nro) => {
        try {
            let check = await this.getAll();
            let validate = 0;
            check.forEach(element => {
                if (nro == element.id) {
                    element.stock--;
                    validate++;
                    console.log('El producto se vendio con exito');
                    console.log('Quedan ' + element.stock + ' unidades');
                }
            })
            if (validate == 0) {
                console.log('No existe el producto o no hay stock');
            }
            await fs.promises.writeFile(this.file, JSON.stringify(check, null, 2));

        } catch {
            throw new Error('Error en la venta');
        }

    }
}

let pruebaproductos = new Contenedor('productos.txt');

const prueba = async () => {
    console.log('****LECTURA DE ARCHIVO INICIAL****');
    console.log(await pruebaproductos.getAll());

    console.log('****GUARDO PRODUCTOS INICIALES****');
    console.log(await pruebaproductos.saveAll(productos));
  
    console.log('****LECTURA DE ARCHIVO POSTERIOR****');
    console.log(await pruebaproductos.getAll());

    console.log('****BUSCAR PRODUCTO POR ID 2****');
    console.log(await pruebaproductos.getById(2));
    console.log('****BUSCAR PRODUCTO POR ID 34****');
    console.log(await pruebaproductos.getById(34));

    console.log('****ELIMINAR PRODUCTO POR ID 2****');
    console.log(await pruebaproductos.deleteById(2));

    console.log('****LECTURA DE ARCHIVO POSTERIOR****');
    console.log(await pruebaproductos.getAll());

    console.log('****VENTA DE PRODUCTO POR ID 3****');
    console.log(await pruebaproductos.sellById(3));

    console.log('****LECTURA DE ARCHIVO POSTERIOR****');
    console.log(await pruebaproductos.getAll());
     
    console.log('****ELIMINAR TODOS LOS PRODUCTOS****');
    console.log(await pruebaproductos.deleteAll()); 
    
    console.log('****LECTURA DE ARCHIVO POSTERIOR****');
    console.log(await pruebaproductos.getAll());

    console.log('****AGREGAR PRODUCTOS NUEVAMENTE****');
    console.log(await pruebaproductos.saveAll(productos));

    console.log('****LECTURA DE ARCHIVO POSTERIOR****');
    console.log(await pruebaproductos.getAll());

    console.log('****AGREGO NUEVO PRODUCTO Y LO GUARDO****');
    otrosproductos = [];
    otrosproductos.push(new Productos('Microfono', 2000, 10, 'https://cdn.pixabay.com/photo/2016/06/21/08/40/prairie-dog-1470659_1280.jpg'));
    otrosproductos.push(new Productos('Webcam 4K', 3000, 10, 'https://cdn.pixabay.com/photo/2020/04/26/15/42/videoanruf-5095868_1280.jpg'));
    console.log(await pruebaproductos.saveAll(otrosproductos));
    
    console.log('********************************');
    console.log('****LECTURA DE ARCHIVO FINAL****');
    console.log(await pruebaproductos.getAll());
}

prueba();