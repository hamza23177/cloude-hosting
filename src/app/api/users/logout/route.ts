import { NextRequest , NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @method GET
 * @route ~/api/users/logout
 * @description Logout User [(Log In (Sign In) (تسجيل دخول))]
 * @access public
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GET(request: NextRequest){
    try {
        cookies().delete("jwtToken");
        return NextResponse.json({message: "logout "},{status:200});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            {message: "internal server error"},
            {status:500}
        );
    }
}