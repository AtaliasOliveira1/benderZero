const crypto = require('crypto')
const fs = require('fs')
const moment = require("moment-timezone") 
const time = moment.tz('America/Lima').format('DD/MM HH:mm:ss')
let Nreg = JSON.parse(fs.readFileSync('./settings/Grupo/Json/registros.json'));

const registro = JSON.parse(fs.readFileSync('./settings/Grupo/Json/registros.json'))
/////REGISTRO
 const AddReg = ( sender, nombre) => {
     const obj = {
  id : sender ,
  nombre : nombre,
  nivel : 1,
  xp : 1,
  rxp : 0,
  dinero : 50,
  rep : 0}
            registro.push(obj)
            fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
        }

        

        const checkOfReg = (sender) => {
            let status = false
            Object.keys(registro).forEach((i) => {
                if (registro[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
      const checkOfRegM  = (usuario) => {
            let status = false
            Object.keys(registro).forEach((i) => {
                if (registro[i].id === usuario) {
                    status = true
                }
            })
            return status
        }
        
 //////REGISTRO
 /////ECONOMIA 

const delkoin = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].dinero -= monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const addkoin = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].dinero += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const MoneyOfSender = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].dinero
}
}
 
 /// mencionado
 const delkoinM = (usuario, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === usuario) {
position = i
}
})
if (position !== false) {
registro[position].dinero -= monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const addkoinM = (usuario, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === usuario) {
position = i
}
})
if (position !== false) {
registro[position].dinero += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}

const MoneyOfM = (usuario) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === usuario) {
position = i
}
})
if (position !== false) {
return registro[position].dinero
}
}
////ECONOMIA 
////NÍVEL
const addLevel = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].nivel += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}
/////ADICIONAR XP
const addXp = (sender, monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].xp += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}
////NÍVEL DO USUÁRIO 
const levelOfsender = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].nivel
}
}
///XP DO USUÁRIO 
 const xpOfsender = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].xp
}
}          
///////////RXP
const addRxp = (sender,monto) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
registro[position].rxp += monto
fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null , 2 )+'\n')
}
}
const Rxp = (sender) => {
let position = false
Object.keys(registro).forEach((i) => {
if (registro[i].id === sender) {
position = i
}
})
if (position !== false) {
return registro[position].rxp
}
}





// Função para adicionar reputação a um usuário
const addRep = (usuario, monto) => {
    let status = false;

    // Certifique-se de que o usuário é uma string
    if (typeof usuario === 'string') {
        // Remova espaços do valor do usuário para garantir que não haja espaços extras
        usuario = usuario.trim();

        // Pesquise o usuário dentro de registro
        registro.forEach((user, index) => {
            // Remova espaços dos valores de id dos usuários no JSON para evitar problemas de espaço
            let userId = user.id.trim();
            if (userId === usuario) {
                console.log(`User found: ${userId}`); // Debug: Verificação de usuário
                user.rep += monto;  // Atualizar reputação do usuário
                console.log(`New reputation: ${user.rep}`); // Debug: Verificação de reputação
                status = true;  // Marcar que o usuário foi encontrado e atualizado
            }
        });
    }

    // Se o usuário foi encontrado e atualizado, salve o arquivo
    if (status) {
        console.log('Saving changes to JSON file...');
        fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null, 2) + '\n');
        console.log('Changes saved successfully.');
    } else {
        console.log('User not found or could not be updated.');
    }
}



// Função para adicionar reputação a um usuário
const delRep = (usuario, monto) => {
    let status = false;

    // Certifique-se de que o usuário é uma string
    if (typeof usuario === 'string') {
        // Remova espaços do valor do usuário para garantir que não haja espaços extras
        usuario = usuario.trim();

        // Pesquise o usuário dentro de registro
        registro.forEach((user, index) => {
            // Remova espaços dos valores de id dos usuários no JSON para evitar problemas de espaço
            let userId = user.id.trim();
            if (userId === usuario) {
                console.log(`User found: ${userId}`); // Debug: Verificação de usuário
                user.rep -= monto;  // Atualizar reputação do usuário
                console.log(`New reputation: ${user.rep}`); // Debug: Verificação de reputação
                status = true;  // Marcar que o usuário foi encontrado e atualizado
            }
        });
    }

    // Se o usuário foi encontrado e atualizado, salve o arquivo
    if (status) {
        console.log('Saving changes to JSON file...');
        fs.writeFileSync('./settings/Grupo/Json/registros.json', JSON.stringify(registro, null, 2) + '\n');
        console.log('Changes saved successfully.');
    } else {
        console.log('User not found or could not be updated.');
    }
}


const repUser = (sender) =>{
let position = false ;
Object.keys(registro).forEach((i) =>{
if(registro[i].id === sender){
position = i
}})
if(position !== false){
return registro[position].rep
}}
////NÍVEL  
   module.exports = {
   MoneyOfSender, 
   addkoin ,
    delkoin,  
    AddReg, 
    checkOfReg , 
    addLevel , 
    addXp , 
    levelOfsender , 
    xpOfsender ,
    checkOfRegM,
    addkoinM , 
    delkoinM ,
     MoneyOfM,
    Rxp,
    addRxp,
    addRep ,
    delRep , 
    repUser 
    }