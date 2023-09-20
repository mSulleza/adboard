import { Card } from "@/components/Card";
import { FileUpload } from "@/components/FileUpload";
import { Navbar } from "@/components/Navbar";
import { gql, useQuery } from "@apollo/client";
import { Advertisement } from "@prisma/client";
import { useState } from "react";

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
export default function Home() {
  const { data, loading, error } = useQuery(AllAdsQuery)
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false)

  if (loading) return <p>Loading...</p>
  
  if (error) {
    console.error(`Error querying ads: ${error.message}`)
  }

  return (
    <>
      <Navbar setShowFileUpload={setShowFileUpload} />
      <FileUpload showModal={showFileUpload} setShowModal={setShowFileUpload}/>
      <div className="container mx-auto grid grid-cols-3 mt-40">
        {
          data.ads.map((ads: Advertisement) => <Card key={ads.id} data={ads}/>)
        }
        
      </div>
    </>
  )
}
