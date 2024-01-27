import { getDataFromTokens } from "@/helpers/getDataFromTokens";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModels";
import { connectToMongoDB } from "@/dbConfig/dbConfig";

connectToMongoDB();
export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromTokens(request)
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({message: "user found", data: user})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}