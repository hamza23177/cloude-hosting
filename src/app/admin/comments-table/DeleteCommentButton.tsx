"use client";
import { DOMAIN } from "@/utilies/constans";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


interface DeleteCommentButtonPros {
    commentId:number;
}
const DeleteCommentButton = ({commentId}: DeleteCommentButtonPros) => {

    const router = useRouter();

    const deleteCommentHandler= async () => {
        try {
            if(confirm("you want to delete this comment, Are you sure?")){
            await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
            router.refresh();
            toast.success("comment deleted");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }
  return (
    <div 
    onClick={deleteCommentHandler}
    className="bg-red-600 text-white rounded-lg inline-block py-1 px-1 cursor-pointer hover:bg-red-800 transition"

    >
      Delete
    </div>
  )
}

export default DeleteCommentButton
