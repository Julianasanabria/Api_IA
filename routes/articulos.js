import Router from "express"
import httpArticulos from "../controllers/articulos.js"

const router = Router()

router.get("/", httpArticulos.getArticulos)

router.get("/:id",httpArticulos.getArticulosId)

router.post("/",httpArticulos.postArticulo)

router.put("/:id",httpArticulos.putArticulo)

router.delete("/:id",httpArticulos.deleteArticulo)


export default router