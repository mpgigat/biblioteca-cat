// Escribir un programa que guarde en una variable el 
//objecto {'Euro':'€', 'Dollar':'$', 
// 'Yen':'¥'}, pregunte al usuario por una divisa y muestre su símbolo o un mensaje de aviso 
// si la divisa no está en el diccionario



const devuelveDivisa=(divisa)=>{
    const divisas={euro:'€', dollar:'$', yen:'¥'}
    if(divisas[divisa]){
        return divisas[divisa]
    }else{
        return ""
    }
}

while(true){
    const divisa=prompt("Digite divisa").toLowerCase()
    if(divisa=="salir") break
    console.log(devuelveDivisa(divisa))
}


const divisas={euro:'€', dollar:'$', yen:'¥'}

const claves=Object.values(divisas)
let total=0
claves.forEach( valor => {
    total=total+valor
    
}  )