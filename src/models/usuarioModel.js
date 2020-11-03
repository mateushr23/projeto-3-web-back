const mongoCliente = require('mongodb').MongoClient;

require("dotenv-safe").config();
var jwt = require('jsonwebtoken');

module.exports = class Users {

    static async autenticaUsuario(email,senha){
        var usuario = await this.procurar(email);
        if(senha == usuario[0].password){
            var id = usuario[0].id;
            var token = jwt.sign({id}, process.env.SECRET);
            return {token : token, admin : usuario[0].admin};
        }
        else return undefined;
    }

    static async AutenticaRegistro(email,senha){
        var usuario = await this.procurar(email);
        if(usuario.length == 0){
            this.inserir(email,senha);
            return false;
        }else{
            return true;
        }
    }

    static async inserir(email, senha){
        const conn = await mongoCliente.connect('mongodb://127.0.0.1:27017/usuarios');
            const db = conn.db();
            const usuarios = db.collection('usuario');
            usuarios.insertOne({email : email, password : senha, admin : false});
        conn.close();
    }

    static async atualizar(email, senha){
        const conn = await mongoCliente.connect('mongodb://127.0.0.1:27017/usuarios');
        const db = conn.db();    
        const usuarios = db.collection('usuario');
            usuarios.updateOne({email : email}, {$set : {password : senha}});
        conn.close();    
    }

    static async procurar(email){
        const conn = await mongoCliente.connect('mongodb://127.0.0.1:27017/usuarios');
        const db = conn.db();
        const res = await db.collection('usuarios').find({email : email}).toArray();
        conn.close();
            return res;
    }
}