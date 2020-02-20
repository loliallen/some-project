import { useCallback, useState } from 'react';


export function useHttp(){
    const [loading, setLoading] = useState();
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        const response = await fetch(url, {
            method,
            headers,
            body
        })
    })

    return {request}
}