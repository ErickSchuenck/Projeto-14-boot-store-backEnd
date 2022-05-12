import db from "../db.js";

export async function getAds(req, res) {
    try {
        const ads = await db.collection("ads").find().toArray();
        res.send(ads);
    } catch (e) {
        console.log("Erro ao carregar propagandas\n", e);
        return res.sendStatus(500);
    }
}