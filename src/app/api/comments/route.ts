import { NextRequest , NextResponse } from "next/server";
import prisma from "@/utilies/db";
import { verifyToken } from "@/utilies/verifyToken";
import { CreateCommentDto } from "@/utilies/dto";
import { createCommentSchema } from "@/utilies/validationSchemas";


/**
 * @method POST
 * @route ~/api/comments
 * @description create new comment
 * @access private (only login user)
 */

export async function POST(request: NextRequest){
    try {
        const user = verifyToken(request);
        if(!user){
            return NextResponse.json(
                {message: "only logged in user , access denied"},
                {status: 401} // unAuthorized
            );
        }

        const body = await request.json() as CreateCommentDto;

        const validation = createCommentSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400});
        }

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id
            }
        });

        return NextResponse.json(newComment,{status: 201});


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {message: "internal server error"},
            {status: 500}
        )
    }
}

/**
 * @method GET
 * @route ~/api/comments
 * @description Get All comment
 * @access private (only Admin)
 */

export async function GET(request: NextRequest){
    try {
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false){
            return NextResponse.json(
                {message : "only admin , access denied"},
                {status: 403}
            );
        }

        const comments = await prisma.comment.findMany();

        return NextResponse.json(comments,{status: 200});

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {message: "internal server error"},
            {status: 500}
        )
    }
}

