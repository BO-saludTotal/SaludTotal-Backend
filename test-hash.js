

const bcrypt = require('bcrypt');
const password = '12345'; 
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error hashing password:", err);
        return;
    }
    console.log('Password (texto plano):', password);
    console.log('Hashed Password (para la BD):', hash);
});