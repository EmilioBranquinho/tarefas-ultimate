import { HTMLProps } from "react";

export function Textarea({ ...rest }: HTMLProps<HTMLTextAreaElement>){
    return(
        <>
        <textarea className="bg-white h-40 w-full rounded-lg resize-none outline-none p-2" name="" id=""
       {...rest}
        >
        </textarea>
        </>
    )
}