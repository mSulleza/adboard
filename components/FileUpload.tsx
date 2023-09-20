import { gql, useMutation } from "@apollo/client"
import axios from "axios"
import { Dispatch, SetStateAction, useCallback, useState } from "react"

type FileUploadProps = {
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}
export const FileUpload = (props: FileUploadProps) => {
    const { showModal, setShowModal} = props

    const [selectedFile, setSelectedFile] = useState<File>()
    
    const fileUploadHandler = useCallback(async () => {
        if (!selectedFile) return

        const formData = new FormData()
        formData.append("file", selectedFile)

        const res = await axios.post("/api/upload", formData) 
        setShowModal(false)
    }, [selectedFile, setShowModal])
    return (
        showModal && 
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-700 outline-none focus:outline-none">
                            <div className="relative p-6 flex-auto">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"  accept=".csv"
                                    onChange={(e) => { 
                                        if (!e.target.files) return
                                        setSelectedFile(e.target.files[0])
                                    }}/>
                            </div>
                            <div className="flex items-start justify-between mt-0 p-3 border-solid border-slate-200 rounded-t">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                > 
                                    Close
                                </button>
                                <button
                                    className="bg-blue-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={fileUploadHandler}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        
    )
}