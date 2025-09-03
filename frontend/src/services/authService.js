
export async function signInUser({ username, email, password }) {
    // Handle sign-in logic here
    console.log("Signing in with:", username, email, password);

    // You can add API calls or other logic here
    const response = await fetch('http://localhost:5000/api/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    try {
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        return data
    } catch (error) {
        // throw new Error (error.message || 'Something Went wrong')
        console.error("Auth service error:", error);
        throw error; // Re-throw the error for further handling
    }
}

//--------------------------------------------------------------------------------------------------------

export async function logInUser({ email, password }) {
    console.log("Logging in with:", email, password);

    const logInResponse = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    try {
        console.log("Response: ",logInResponse)
        const loginData = await logInResponse.json()
        if (!logInResponse.ok) {
            throw new Error(loginData.message)
        }
        return loginData;
    } catch (error) {
        throw error
    }
}