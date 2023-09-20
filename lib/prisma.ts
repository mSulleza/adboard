import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

declare global {
    var prisma: PrismaClient
}

// do not exhaust the db connection limit
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma