import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromTokens =(request: NextRequest)=>{
try {
    const token = request.cookies.get('token')?.value || '';
    const deCodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return deCodedToken.id;
} catch (error: any) {
    throw new Error(error.message)
}
}