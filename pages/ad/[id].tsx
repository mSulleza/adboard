import { gql, useQuery } from "@apollo/client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"

export default function Ad() {
    const router = useRouter()
    const { id } = router. query

    const [fetchReady, setFetchReady] = useState<boolean>(false)

    useEffect(() => {
        if (router.isReady) setFetchReady(true)
    }, [router])
    
    const AdQuery = gql`
        query Ad($id: ID!) {
            ad(id: $id)
            {
                title
                description
                url
                imageUrl
                clicks
            }
        }
    `
    
    const { data, loading, error } = useQuery(AdQuery, { variables: { id }, skip: !fetchReady })

    if (loading || !data) return <p>Loading...</p>
    if (error) console.error(`Error querying ads: ${error.message}`)

    const ad = data.ad
    return (
        <div className="container mx-auto w-full h-screen flex flex-wrap items-center">
            <div className="container p-5 bg-slate-400 shadow-md shadow-white rounded-md">
                <div className="font-bold text-white text-4xl">{ad.title}</div>
                <div className="italic text-white">{ad.description}</div>
                <Link className="text-blue-600 hover:text-blue-100" href={ad.url}>Go to site</Link>
            </div>
        </div>
    )
}