import multer from "multer";
import { NextResponse } from "next/server";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false, // No usar el body-parser integrado en Next.js
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // 'videoFile' y 'thumbnailFile' son los nombres que usaste en el FormData
      const uploadMiddleware = upload.fields([
        { name: "videoFile", maxCount: 1 },
        { name: "thumbnailFile", maxCount: 1 },
      ]);
      uploadMiddleware(req, res, async (err) => {
        if (err) {
          return NextResponse.error(
            err.message || "Error al subir archivos",
            500
          );
        }

        // Aquí puedes procesar los archivos subidos y hacer lo necesario (p. ej., guardar en base de datos)

        // Devolver una respuesta exitosa
        return NextResponse.json({ message: "Archivos subidos correctamente" });
      });
    } catch (error) {
      return NextResponse.error("Error interno del servidor", 500);
    }
  } else {
    return NextResponse.error("Método no permitido", 405);
  }
}
