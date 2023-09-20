import { PrismaClient } from "@prisma/client"
import { ads } from "./data/ads"

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: "john.doe@email.com",
            role: "ADMIN"
        }
    })

    await prisma.advertisement.createMany({
        data: ads
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })