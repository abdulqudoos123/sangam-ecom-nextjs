import Cookies from "js-cookie"

export async function createNewOrder(data) {
    // console.log('dataaaaa===',data)
    try {
        const res = await fetch('http://localhost:3000/api/order/create-order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(data)
        })
        const finalData = await res.json();
        return finalData;
    } catch (error) {
        console.log(error)
    }
}


export async function getAllOrdersForUser(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/order/get-all-orders?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        })
        const data = await res.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function getOrderDetails(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/order/order-detail?id=${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllOrdersOfAllUsers() {
    try {
        const res = await fetch('http://localhost:3000/api/admin/orders/get-all-orders', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function updateOrderStatus(formData) {
    try {
        const res = await fetch('http://localhost:3000/api/admin/orders/update-order-status', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}