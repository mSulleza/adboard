import { parseCSV } from "@/util/fileParser";
import formidable from "formidable"
import { NextApiRequest, NextApiResponse } from "next"

export const config = {
    api: {
        bodyParser: false,
    },
}
  
const readFile = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const form = formidable()
    
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
        })
    })
}
export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const data = await readFile(req)
        
        if (data.files.file?.length) {
            const currFile = data.files.file[0]
            
            if (currFile.mimetype === "text/csv") {
                parseCSV(currFile)
            }
        }
        return res.json("ok")
    }

    return res.status(400)
}
