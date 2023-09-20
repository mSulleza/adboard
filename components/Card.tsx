import { gql, useMutation } from "@apollo/client";
import { Advertisement } from "@prisma/client";
import Link from "next/link";
import { useCallback } from "react";

const IncrementQueryMutation = gql`
    mutation IncrementClick($id: ID!) {
        incrementClick(id: $id) {
            clicks
        }
    }
`

const AllAdsQuery = gql`
  query {
    ads {
      id
      title
      description
      url
      imageUrl
      clicks
    }
  }
`
export const Card = (props: {data: Advertisement}) => {
    const {
        data
    } = props

    const [incrementClick] = useMutation(IncrementQueryMutation, {
        refetchQueries: [{ query: AllAdsQuery}]
    })
    
    const clickHandler = useCallback(async (ad: Advertisement) => {
        await incrementClick({ variables: { id: ad.id}})
    }, [incrementClick])

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
            <div className="p-5 flex flex-col justify-between h-full">
                <div>
                    <Link href={`/ad/${data.id}`} target="_blank" onClick={() => clickHandler(data)}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.title}
                    </h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {data.description}
                    </p>
                </div>
                <div className="flex">
                    {data.clicks}
                    <div className="ml-3 flex items-center">
                        <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
