import prisma from "@/utilies/db";
import { RegisterUserDto } from "@/utilies/dto";
import { registerSchema } from "@/utilies/validationSchemas";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

import {setCookie } from "@/utilies/generateToken";

/**
 * @method POST
 * @route ~/api/users/register
 * @description Create New User [(Register: (Sign Up) (إنشاء حساب))]
 * @access public
 */

export async function POST(request:NextRequest){
    try {
        const body = await request.json() as RegisterUserDto;
        const validation = registerSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({message: validation.error.errors[0].message},{status:400})
        }

        const user = await prisma.user.findUnique({where: {email: body.email}});
        if(user){
            return NextResponse.json(
                {message: "user is already registered"},
                {status: 400}
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password,salt);

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
            },
            select: {
                username: true,
                id: true,
                isAdmin: true 
            }
        });

        const cookie = setCookie({
            id: newUser.id,
            username :newUser.username,
            isAdmin: newUser.isAdmin,
        })

        return NextResponse.json({...newUser, message: "registered and authenticated"},
            {
                status: 201,
                headers: {"Set-Cookie": cookie}
            
            });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({
            message: "internal server error"
        },
    {status: 500})
    }
}