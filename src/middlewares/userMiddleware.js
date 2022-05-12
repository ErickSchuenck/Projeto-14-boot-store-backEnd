import db from "../db.js";


//FUNÇÃO USADA EM TODAS AS ETAPAS DE NAVEGAÇAO DE PRODUTOS, PARA RESGATE DE USUÁRIO
export async function getUser(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) return res.status(401).send("Token não encontrado!"); // SEM HEADER COM TOKEN

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Sessão não encontrada"); // NAO HÁ SESSÃO ATIVA PARA ESTE TOKEN

        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) return res.status(401).send("Usuário não encontrado"); // USUÁRIO NAO ENCONTRADO NO BANCO

        res.locals.user = user; // GUARDA USUÁRIO PARA PRÓXIMA FUNCIONALIDADE
        next();

    } catch (e) {
        console.log("Erro ao tentar obter usuário\n", e);
        return res.sendStatus(500);
    }

}