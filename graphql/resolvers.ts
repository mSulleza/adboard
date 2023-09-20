import prisma from "@/lib/prisma"

export const resolvers = {
    Query: {
      ads: async (parent: unknown, args: unknown, context: any ) => {
        const { cache } = context
        // sort the ads by the number of clicks
        const data = await prisma.advertisement.findMany({
            orderBy: {
                clicks: "desc"
            }
        })
        
        const cacheKeys = cache.keys();

        const dataIds = new Set(data.map((item) => item.id));
        
        // Iterate through the cache keys and remove any keys that are not in the data
        for (const key of cacheKeys) {
          if (!dataIds.has(key)) {
            cache.del(key); // Remove the cache key that is not in the data
          }
        }
        
        // Check if the first two items are cached and cache them if not
        if (data.length > 0 && !cache.has(data[0].id)) {
            cache.set(data[0].id, data[0], 120);
        }
        
        if (data.length > 1 && !cache.has(data[1].id)) {
            cache.set(data[1].id, data[1], 120);
        }
        
        return data
      },
      ad: async (parent: unknown, args: {id: string }, context: any) => {
        const { cache } = context

        if (cache.has(args.id)) 
        {
            console.log("found in cache")
            return cache.get(args.id)
        }

        const ad = await prisma.advertisement.findUnique({
            where: {
                id: args.id
            }
        })

        if (!ad) 
        {
            console.error(`unable to find ad with id: ${args.id} when querying an ad.`)
            throw new Error("Advertisement not found")
        }

        return ad
      }
    },
    Mutation: {
        incrementClick: async (parent: unknown, args: {id: string}, context: any) => {
            const { cache } = context

            const ad = await prisma.advertisement.findUnique({
                where: {
                    id: args.id
                }
            })

            if (!ad) 
            {
                console.error(`unable to find ad with id: ${args.id} when incrementing clicks.`)
                throw new Error("Advertisement not found")
            }

            const updatedAd = await prisma.advertisement.update({
                where: {
                    id: args.id
                },
                data: {
                    clicks: ad.clicks += 1
                }
            })

            // update cache if necessary
            if (cache.get(updatedAd.id)) {
                cache.take(updatedAd.id)
                cache.set(updatedAd.id, updatedAd, 120)
            }
        }
    }
  }