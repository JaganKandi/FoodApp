import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"


function useProfile() {
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)
    const {status} = useSession()

    useEffect(()=>{
        if(status === 'authenticated'){setLoading(true)
        fetch('/api/profile').then(response =>{
            response.json().then(data =>{
                setData(data);
                setLoading(false)
            })
        })}
        
    }, [status])

    return {loading, data};
}

export default useProfile;