import User from "@/models/userModels";
import  {connectToMongoDB} from "@/dbConfig/dbConfig";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        connectToMongoDB();
        const reqBody = await request.json();
        const { email, password } = reqBody;
        
        // Check if password is provided
        if (!password) {
            return NextResponse.json(
                {
                    error: 'Password is required',
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    error: 'User does not Exist in This System',
                },
                { status: 400 }
            );
        }

        console.log(user);

        // Check if the user password is provided
        if (!user.password) {
            return NextResponse.json(
                {
                    error: 'User has no password set',
                },
                { status: 400 }
            );
        }

        // user password is connecting DB Check
        const validPassword = await bcryptjs.compare(password, user.password);

        // not valid password..........
        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid Password' }, { status: 400 });
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // create Token......
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '2d',
        });

        // user cookies..
        const response = NextResponse.json({
            message: 'Login Successful',
            success: true,
        });

        // send token to user cookies
        response.cookies.set('token', token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}