import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { createSchema, createYoga } from "graphql-yoga";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

const  cache = new NodeCache()

export default createYoga<{
    req: NextApiRequest
    res: NextApiResponse
}>({
    schema: createSchema({
        typeDefs,
        resolvers
    }),
    graphqlEndpoint: '/api/graphql',
    context: {
        cache
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}