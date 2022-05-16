import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import db from "../db.js";


// Funçao de Criação de Usuário ------ Recebendo nome, email e senha
export async function signUp(req, res) {
  const { password, name, email } = req.body;
  try {
    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: passwordHash
    });

    return res.sendStatus(201); // created
  } catch (e) {
    console.log("Erro na criação do usuário!\n", e);
    return res.sendStatus(500);
  }
}


//Função de Login ---- Recebendo email e senha
export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.sendStatus(404); // USUARIO NAO ENCONTRADO - NOT FOUND

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({ token, userId: user._id });
      return res.send({ token, name: user.name });
    }

    return res.sendStatus(404); // SENHA ERRADA - NOT FOUND
  } catch (e) {
    console.log("Erro no login!\n", e);
    return res.sendStatus(500);
  }
}


export async function signOut(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.sendStatus(403); // NAO TEM TOKEN - FORBIDEN

  try {
    await db.collection("sessions").deleteOne({ token: token });
    res.sendStatus(200); //SUCESSO
  } catch (e) {
    console.log("Erro ao sair!\n", e);
    return res.sendStatus(500);
  }
}


export async function deleteAccount(req, res) {
  const { user } = res.locals;

  try {
    await db.collection("users").deleteOne(user);
    res.sendStatus(200); //SUCESSO
  } catch (e) {
    console.log("Erro ao deletar a conta!\n", e);
    return res.sendStatus(500);
  }
}

export async function editAccount(req, res) {
  const { _id } = res.locals.user;
  const { body } = req;

  try {
    await db.collection("users").updateOne({
      _id
    }, { $set: body })

    res.sendStatus(200); //SUCESSO
  } catch (e) {
    console.log("Erro ao modificar conta!\n", e);
    return res.sendStatus(500);
  }
}