import Categorias from "../models/categorias.js";

const getCategorias = async (req, res) => {
  try {
    const categorias = await Categorias.find();
    res.json({ categorias });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

const getCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const categorias = await Categorias.findById(id);
    res.json({ categorias });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

const postCategorias = async (req, res) => {
  try {
    const { codigo, nombre } = req.body;
    const categorias = new Categorias({ codigo, nombre });
    await categorias.save;
    res.json({ categorias });
  } catch (error) {
    res.status(400).json({ msg: "ERoror al guardar la cateforia" });
  }
};

const putCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, nombre } = req.body;
    const categorias = await Categorias.findByIdAndUpdate(id, {
      codigo,
      nombre,
    });
    res.json({ categorias });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

const deleteCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const categorias = await Categorias.findByIdAndDelete(id);
    res.json({ categorias });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

export {
  getCategorias,
  getCategoriasId,
  postCategorias,
  putCategoriasId,
  deleteCategoriasId,
};
