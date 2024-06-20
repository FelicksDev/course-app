// pages/api/uploadVideo.js

import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Deshabilitar body parser integrado de Next.js
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Middleware de multer para manejar la subida de archivos
      upload.any()(req, res, async (err) => {
        if (err) {
          console.error("Error al subir archivos:", err);
          return res.status(500).json({ error: "Error al subir archivos" });
        }

        // Aquí puedes procesar los archivos subidos
        console.log("Archivos subidos:", req.files);

        // Devolver una respuesta exitosa
        return res
          .status(200)
          .json({ message: "Archivos subidos correctamente" });
      });
    } catch (error) {
      console.error("Error interno del servidor:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}
