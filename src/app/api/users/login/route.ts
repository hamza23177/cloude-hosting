import prisma from "@/utilies/db";
import { LoginUserDto } from "@/utilies/dto";
import { loginSchema } from "@/utilies/validationSchemas";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import {setCookie} from '@/utilies/generateToken';

/**
 * @method POST
 * @route ~/api/users/login
 * @description Login User [(Log In (Sign In) (تسجيل دخول))]
 * @access public
 */

export async function POST(request:NextRequest){
    try {
        const body = await request.json() as LoginUserDto;
        const validation = loginSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({message: validation.error.errors[0].message},{status:400})
        }

        const user = await prisma.user.findUnique({where: {email: body.email}});
        if(!user){
            return NextResponse.json(
                {message: "invalid email or password"},
                {status: 400}
            );
        }

        const isPasswordMatch = await bcrypt.compare(body.password,user.password);
        if(!isPasswordMatch){
            return NextResponse.json({message: "invalid email or password"} , {status: 400});
        }


        const cookie = setCookie({
            id: user.id,
            isAdmin: user.isAdmin,
            username :user.username
        }) ;

        return NextResponse.json({message: "Authenticated"},{status: 200 , headers: {"Set-Cookie": cookie}});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({
            message: "internal server error"
        },
    {status: 500})
    }
}