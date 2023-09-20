export const typeDefs = `
    type Advertisement {
        id: ID
        title: String
        description: String
        url: String
        imageUrl: String
        clicks: Int
        createdAt: String
    }

    type Query {
        ads: [Advertisement]!
        ad(id: ID!): Advertisement
    }

    type Mutation {
        incrementClick(id: ID!): Advertisement
    }
    
`