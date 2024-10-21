import { NextRequest , NextResponse } from "next/server";
import prisma from "@/utilies/db";

/**
 * @method GET
 * @route ~/api/articles/count
 * @description Get Articles count
 * @access public
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({count} , {status: 200});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {message: "internal server error"},
            {status: 500}
        )
    }
}

