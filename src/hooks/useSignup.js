import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError ] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        // resets error if user tries to rectify it
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            // save user to local storage, incase they exit site then come back to it later
            localStorage.setItem('user', JSON.stringify(json))

            // updates auth context- using hook
            dispatch({ type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return { signup , isLoading, error }
} 