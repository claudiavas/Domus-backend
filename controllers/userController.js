const user = require ('../models/userModel');
const jwt = require("jsonwebtoken");
const mySecret = process.env.JWT_SECRET;
const { objectId } = require ('mongodb');





const meUser = (req, res) => {
    const token = req.headers.authorization;
    console.log('tokeeeeennnn', token);
    // verifico si el token es correcto si error captura el catch
    try {
        const decodedToken = jwt.verify(token, mySecret);
        console.log('decoded token es',decodedToken);
        res.json({result: 'success', data: 'info: decodedToken'})
    } catch (error) {
        console.log('este es el error al verificar el token');
        res.status(400).json({ result: 'No es un token válido'});
    }
    res.json({info: decodedToken })
}



const addUser= (req, res) => {
    const newUser = new User({
        identification: req.body.identification,
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        zip_code: req.body.zip_code,
        telephone: req.body.telephone,
        email: req.body.email,
        password: req.body.password,
        date_register: req.body.date_register,
        observations: req.body.observations,
        id_realstate: req.body.id_realstate,
        tipo_usuario: req.body.tipo_usuario,
        foto_perfil: req.body.foto_perfil,
        deleteAt:req.body.deleteAt
    });

newUser
    .save()
    .then((user) => res.status(200).send(user))    
    .catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case 11000:
                res.status(400).send({msg: 'El Usuario ya existe' });
                break;
            default:
                res.status(400).send(error);
        }
    });
};

const getUser = (req,res) => {
    if (req.params.userId) {
        user.findById(req.params.userId)
            .then ((user) => {
                if (user === null ) {
                    res.status(400).send({ msg: 'No se ha encontrado el usuario '});
                } else {
                    res.status(200).send(user);
                }
            })
            .catch ((error) => {
                console.log(error);
                switch (error.name) {
                    case 'CastError':
                        res.status(400).send('Formato de ID de user inválido');
                        break;
                    default:
                        res.status(400).send(error);
                }
            });
    } else {
        let filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        console.log(req.query.status, filter);
        user.find(filter)
            .then ((users) => {
                if (users.length === 0) {
                    res.status(404).send({msg: 'No se han encontrado Usuarios' }) 
                } else {
                    res.status(200).send(users);
                }
            })
            .catch ((error)=> res.status(400).send(error));
    }
};

module.exports = {
    getUser,
    addUser,
    meUser,
    //deleteuser,
    //updateuser,
    //permanetDeleteuser
}