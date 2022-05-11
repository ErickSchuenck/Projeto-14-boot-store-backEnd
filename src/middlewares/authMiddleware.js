import joi from "joi";

export function validateSignIn(req, res, next) {
    const login = req.body;

     // DEVE TER EMAIL E SENHA
    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = signInSchema.validate(login);// CHECA SE INFORMAÇÕES ESTAO CERTAS

    if (error) {
        return res.sendStatus(422); // DADOS NAO ESTÃO CONFORME REQUISITADO
    }

    next();
}

export function validateSignUp(req, res, next) {
    const register = req.body;

    // DEVE TER NOME, EMAIL E SENHA (COM CONFIRMAÇÃO IGUAL)
    const signUpSchema = joi.object({ 
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.ref('password')
    });

    const { error } = signUpSchema.validate(register); // CHECA SE INFORMAÇÕES ESTAO CERTAS

    if (error) {
        return res.sendStatus(422); // DADOS NAO ESTÃO CONFORME REQUISITADO
    }

    next();
}