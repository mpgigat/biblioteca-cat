
import fs from "fs"
fs.readFile('borrar.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    console.log(data);
});

import readline from "readline"

var reader = readline.createInterface({
    input: fs.createReadStream('borrar.txt')
});

reader.on('line', function (linea) {
    console.log(linea);
});

fs.writeFile("nuevo.txt", "Primera línea\nSegunda línea", function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("El archivo fue creado correctamente");
});

var stream = fs.createWriteStream("nuevo2.txt");
stream.once('open', function (fd) {
    stream.write("Primera línea\n");
    stream.write("Segunda línea\n");
    stream.end();
});

fs.stat('nuevo.txt', function (err) {
    if (err == null) {
        console.log("El archivo existe");
    } else if (err.code == 'ENOENT') {
        console.log("el archivo no existe");
    } else {
        console.log(err); // ocurrió algún error
    }
})