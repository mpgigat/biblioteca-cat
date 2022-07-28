const numeros=[]

while (true) {
    const numero=parseInt(prompt("Digite numero"))
    if (numero<=0) break
    numeros.push(numero)
}

let mayor=-1000
let menor=1000
let acuNumeros=0
for (let i = 0; i < numeros.length; i++) {
    if( numeros[i]>mayor     ){
        mayor=numeros[i]
    }
    if( numeros[i]<menor     ){
        menor=numeros[i]
    }
    acuNumeros=acuNumeros+numeros[i]
}
let media=acuNumeros/numeros.length


numeros.forEach((numero)=>{
    if( numero>mayor     ){
        mayor=numero
    }
    if( numero<menor     ){
        menor=numero
    }
    acuNumeros=acuNumeros+numero
})