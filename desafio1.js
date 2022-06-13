class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }
    static nroMascotas = 0
    static mascotas = []
    static libros = []

    getFullName() {
        return (`${this.nombre} ${this.apellido}`)
    }
    addMascota(pet) {
        Usuario.mascotas.push(pet)
        Usuario.nroMascotas++
    }

    countMascotas() {
        return(Usuario.nroMascotas)
    }

    addBook(titulo, autor) {
        Usuario.libros.push({
            'nombre': titulo,
            'autor': autor
        })
    }

    getBookNames() {
        const lista = []
        for (const book of Usuario.libros) {
            lista.push(book.nombre)
        }
        return(lista.toString())
    }
    getPetNames() {
        return(Usuario.mascotas.toString())
    }
}

const usuario1 = new Usuario("Maico", "Bernal")
usuario1.addBook("Rayuela", "Julio Cortazar")
usuario1.addBook("Time Crysis", "John Doe")
usuario1.addBook("1984", "George Orwell")
usuario1.addMascota("Boris")
usuario1.addMascota("Puchito")
usuario1.addMascota("Lunita")
usuario1.addMascota("Felipe")
usuario1.addMascota("Frida")

console.log("El nombre completo ingresado es: " + usuario1.getFullName())
console.log("Los libros ingresados son: " + usuario1.getBookNames())
console.log("La cantidad de mascotas ingresadas son: " + usuario1.countMascotas())
console.log("Las mascotas ingresadas son: " + usuario1.getPetNames())