"use client";
import { Dispatch, SetStateAction, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { DOMAIN } from '@/utilies/constans';


interface UpdateCommentModelProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    commentId: number;
}

const UpdateCommentModel = ({setOpen , text , commentId} : UpdateCommentModelProps) => {

    const [updateText , setUpdateText] = useState(text);
    const router = useRouter();
    
    const formSubmitHandler = async (e:FormEvent) => {
        e.preventDefault();
        if(updateText === "") return toast.info("Please write something");

        try {
            await axios.put(`${DOMAIN}/api/comments/${commentId}`, {text: updateText});
            router.refresh();
            setUpdateText("");
            setOpen(false);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }


  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center '>
        <div className='w-11/12 lg:w-2/4 bg-white rounded-lg p-3'>
        <div className='flex justify-end items-start mb-5'>
            <IoMdCloseCircleOutline onClick={() => setOpen(false)} className='text-red-500 cursor-pointer text-3xl'/>
        </div>
        <form onSubmit={formSubmitHandler}>
            <input type="text" value={updateText} onChange={(e) => setUpdateText(e.target.value)} placeholder='Edit comment ...' className='text-xl rounded-lg p-2 w-full bg-white mb-2' />
            <button type="submit" className='bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition'>
                Edit
            </button>
        </form>

        </div>
      
    </div>
  )
}

export default UpdateCommentModel
