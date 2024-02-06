// export const login = async (formData) => {
//     try {
//       const response = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const data = await response.json();
  
//       return data;
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

import axios from "axios";

const httpAxios = axios.create({
    baseURL: process.env.BASE_URL,
})


export async function login(formData) {
    const result = await httpAxios.post('/api/login', formData).then((response) => response.data);
    return result;
}
