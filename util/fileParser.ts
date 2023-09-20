import formidable from "formidable"
import Papa, { ParseResult } from "papaparse"
import { readFile } from "fs"
import { parse } from "path"
import { Advertisement } from "@prisma/client"


export const parseCSV = (file: formidable.File) =>
{
    const tempPath = file.filepath
    readFile(tempPath, async (err, text) => {
        if (err) console.error(`Error encountered parsing file: ${file}`)
        const parsed: ParseResult<Advertisement> = Papa.parse(text.toString(), {header: true})
        
        // clean the data to prevent errors:
        const cleanData = parsed.data.filter((e) => e.title.length > 0)

        // insert data to mongo. - probably need to move this to a util file
        try {
            console.info(`Inserting ${cleanData.length} rows to Advertisement table`)
            await prisma.advertisement.createMany({
                data: cleanData
            })
        } catch (e) {
            console.error(e)
        }
    })
}