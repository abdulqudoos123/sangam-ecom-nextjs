import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

export async function AuthUser(req) {
    const headerList = req.headers
    // console.log('heasarlist===', headerList)
    const token = headerList.get('cookie').split(' ')[1].split('=')[1]
    // const token = req.headers.get("Authorization")?.split(" ")[1];
    // const token= token1.split(';')[0]
    console.log('header token===', token)
    if (!token) return false;
    try {
        const verifyAuthUser = jwt.verify(token, "default_secret_key");
        // console.log('vertoken====', verifyAuthUser);
        if (verifyAuthUser) return verifyAuthUser;
    } catch (error) {
        console.log(error)
    }

}