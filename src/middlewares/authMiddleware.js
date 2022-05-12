import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";


// VALIDA INFORMAÇÕES DE LOGIN
export function validateSignIn(req, res, next) {
    const login = req.body;

    // DEVE TER EMAIL E SENHA
    const { error } = signInSchema.validate(login);// CHECA SE INFORMAÇÕES ESTAO CERTAS

    if (error) {
        return res.sendStatus(422); // DADOS NAO ESTÃO CONFORME REQUISITADO
    }

    next();
}

//VALIDA INFORMAÇÕES DE CADASTRO
export function validateSignUp(req, res, next) {
    const register = req.body;

    // DEVE TER NOME, EMAIL E SENHA (COM CONFIRMAÇÃO IGUAL)
    const { error } = signUpSchema.validate(register); // CHECA SE INFORMAÇÕES ESTAO CERTAS

    if (error) {
        return res.sendStatus(422); // DADOS NAO ESTÃO CONFORME REQUISITADO
    }

    next();
}