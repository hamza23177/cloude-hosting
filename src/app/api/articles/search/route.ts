import { NextRequest , NextResponse } from "next/server";
import prisma from "@/utilies/db";

/**
 * @method GET
 * @route ~/api/articles/search?searchText=value
 * @description Get Articles By search text
 * @access public
 */


export async function GET(request:NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText");
        let articles;

        if(searchText){
            articles = await prisma.article.findMany({
                where: {
                    title: {
                        startsWith:searchText,
                        mode: "insensitive"
                    }
                }
            })
        } else {
            articles = await prisma.article.findMany({take: 6});
        }

        return NextResponse.json(articles,{status: 200});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {message: "internal server error"},
            {status: 500}
        )
    }
    
}
