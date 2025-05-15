import Articulos from "../models/conversacion.js";

const httpArticulos = {
  getArticulos: async (req, res) => {
    try {
      const articulos = await Articulos.find();
      res.json({ articulos });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar los articulos" });
    }
  },
  getArticulosId: async (req, res) => {
    try {
      const { id } = req.params;
      const articulo = await Articulos.findById(id);
      res.json({ articulo });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la categoria" });
    }
  },
  postArticulo: async (req, res) => {
    try {
      const { codigo, nombre } = req.body;
      const articulo = new Articulos({ codigo, nombre });
      await articulo.save;
      res.json({ articulo });
    } catch (error) {
      res.status(400).json({ msg: "ERoror al guardar la articulo" });
    }
  },
  putArticulo: async (req, res) => {
    try {
      const { id } = req.params;
      const { codigo, nombre } = req.body;
      const articulos = await Articulos.findByIdAndUpdate(id, {
        codigo,
        nombre,
      });
      res.json({ articulos });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  },
  deleteArticulo: async (req, res) => {
    try {
      const { id } = req.params;
      const articulos = await Articulos.findByIdAndDelete(id);
      res.json({ articulos });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  },
};

const deleteCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const categorias = await Articulos.findByIdAndDelete(id);
    res.json({ categorias });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

export default httpArticulos