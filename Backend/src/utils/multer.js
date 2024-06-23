import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)) // url a7na fiin 7alin

export const fileValidation = {
    image: ["image/jpeg", "image/png", "image/gif"],
    file: ["application/pdf", "application/msword"],
    video: ["video/mp4"]
}

export function fileUpload(customPatch = "general", customValidation = []) {

    const fullPatch = path.join(__dirname, `../uploads/${customPatch}`) // al mkan aly hishi fih al files

    if (!fs.existsSync(fullPatch)) { //lw al file aly hait7t feh msh mawgood hay creat
        fs.mkdirSync(fullPatch, { recursive: true })
    }

    //storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, fullPatch) //file
        },
        filename: (req, file, cb) => {
            const uniqueFileName = nanoid() + '_' + file.originalname // asm al file aly hait5zn bih
            file.dest = `uploads/${customPatch}/${uniqueFileName}`// link aly hait7fz fy al data
            cb(null, uniqueFileName)
        }
    })

    //fileFilter
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb("In-valid file format", false)
        }
    }
    const upload = multer({ fileFilter, storage })
    return upload
}