import { CreateArticleDto } from '@/utilies/dto';
import { createArticleSchema } from '@/utilies/validationSchemas';
import { NextRequest,NextResponse} from 'next/server'
import { Article} from '@prisma/client';
import prisma from '@/utilies/db';
import { ARTICLE_PRE_PAGE } from '@/utilies/constans';
import { verifyToken } from '@/utilies/verifyToken';

/**
 * @method GET
 * @route ~/api/articles
 * @description Get Articles By page number
 * @access public
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request:NextRequest){
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        
        const articles = await prisma.article.findMany({
            skip: ARTICLE_PRE_PAGE * (parseInt(pageNumber) -1),  // 0
            take: ARTICLE_PRE_PAGE,
            orderBy: {createdAt: 'desc'}
        });
        return NextResponse.json(articles,{status: 200});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {message:"internal server error",},
            {status: 500}
        )
    }
}



/**
 * @method POST
 * @route ~/api/articles
 * @description Create New Article
 * @access private (only admin can create article) 
 */
export async function POST(request:NextRequest){
    try {
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false){
            return NextResponse.json(
                {message: "only admin , access denied"},
                {status: 403}
            )
        }
        const body= (await request.json()) as CreateArticleDto;

        const validation =  createArticleSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json({message:validation.error.errors[0].message} , { status:400 });
        }
    
        const newArticle: Article = await prisma.article.create({
            data: {
              title: body.title,
              description: body.description  
            }
        });
    
        return NextResponse.json(newArticle, {status:201});
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
        {message:"internal server error",},
        {status: 500}
        )
    }
}

// /**
//  * @method POST
//  * @route ~/api/articles
//  * @description Create New Article
//  * @access public 
//  */
// export async function POST(request:NextRequest){
//     try {
//         const body= (await request.json()) as CreateArticleDto;

//         const validation =  createArticleSchema.safeParse(body);
//         if(!validation.success){
//             return NextResponse.json({message:validation.error.errors[0].message} , { status:400 });
//         }
    
//         const newArticle: Article = await prisma.article.create({
//             data: {
//               title: body.title,
//               description: body.description  
//             }
//         });
    
//         return NextResponse.json(newArticle, {status:201});
    
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//         return NextResponse.json(
//         {message:"internal server error",},
//         {status: 500}
//         )
//     }
// }