import Cookies from 'js-cookie';

import axios from "axios";



const httpAxios = axios.create({
    baseURL: process.env.BASE_URL,
})
// export async function addNewProduct(formData) {
//     try {
//         const response = await fetch('/api/admin/add-product', {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json",
//                 Authorization: `Bearer ${Cookies.get('token')}`,
//             },
//             body: JSON.stringify(formData),
//         })
//         console.log('resss===', response);
//         const finalData = await response.json();
//         console.log('final dat', finalData)
//         return finalData;
//     } catch (error) {
//         console.log(error.message, "===product not created");
//     }
// }

export async function addNewProduct(formData) {
    const response = await httpAxios
        .post('/api/admin/add-product', formData)
        .then((response) => response.data)
    return response;
}
export async function getAllAdminProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/admin/all-products", {
            method: "GET",
            cache: "no-store",
        })
        const data = await response.json()
        // console.log('data====',data)
        return data;
    } catch (error) {
        console.log(error);
    }
}


export async function updateProduct(formData) {
    console.log("new values :: ", formData)
    try {
        const response = await fetch("http://localhost:3000/api/admin/update-product", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

// export async function updateProduct(formData) {
//     const result = await httpAxios
//         .put('/api/tasks', formData)
//         .then((response) => response.data)
//     return result;
// }

export async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/delete-product?id=${id}`, {
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

export async function productsByCategory(id) {
    // console.log('id===',id);
    try {
        const res = await fetch(`http://localhost:3000/api/admin/product-by-category?id=${id}`, {
            method: "GET",
        })
        const data = await res.json();
        // console.log('data===',data.data);
        return data;
    } catch (error) {
        console.log(error);
    }
}


export async function ProductById(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/product-by-id?id=${id}`, {
            method: "GET",
            cache: "no-store"
        })
        const data = await response.json();
        return data;
    } catch (error) {

    }
}