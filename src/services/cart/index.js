import Cookies from "js-cookie";
export async function addToCart(formData) {
    try {
        const response = await fetch('http://localhost:3000/api/cart/add-to-cart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)

        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}


export async function allCartItems(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/cart/all-cart-items?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function DeleteFromCart(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/cart/delete-from-cart?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}