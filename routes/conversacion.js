import Router from "express"

import { deleteCategoriasId, getCategorias, getCategoriasId, postCategorias, putCategoriasId } from "../controllers/categorias.js"

const router = Router()

router.get("/", getCategorias )

router.get("/:id",getCategoriasId)

router.post("/",postCategorias)

router.put("/:id",putCategoriasId)

router.delete("/:id",deleteCategoriasId)

export default router