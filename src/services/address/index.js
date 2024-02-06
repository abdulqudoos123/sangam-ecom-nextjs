import Cookies from "js-cookie";
export async function addNewAddress(formData) {
    try {
        const res = await fetch("http://localhost:3000/api/address/create-new-address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }

}


export async function getAllAddress(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/address/get-all-address?id=${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },

        })
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function deleteAddress(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/address/delete-address?id=${id}`, {
            method: 'DELETE',
            headers: {
    
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}


export async function updateAddress(formData) {
    try {
        const res = await fetch('http://localhost:3000/api/address/update-address', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}