"use client"

import { Textarea } from "@/components/ui/Textarea";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, Trash2 } from "lucide-react";

interface taskProps{
    item:{
        id: string,
        user: string,
        task: string,
        public: boolean,
        createdAt: string
    }
    allComments: CommentProps[] 
}

interface CommentProps{
    id: string
    comment: string,
    taskId?: string | null,
    username?: string | null,
    useremail?: string | null,
    userPicture?: string | null,
    createdAt: Date | string
}

export default function Task({ item, allComments }: taskProps){

    const { data: session } = useSession();
    const[input, setInput] = useState("");
    const[comments, setComments] = useState<CommentProps[]>(allComments || []);

    async function handleAddComment(){

        if(input === ""){
            toast.error("Preencha o campo");
            return;
        }

    
    try{
        const docRef = await addDoc(collection(db, "comments"), {
            comment: input,
            taskId: item.id,
            username: session?.user?.name,
            useremail: session?.user?.email,
            userPicture: session?.user?.image,
            createdAt: new Date()
    });

        const data = {
            id: docRef.id,
            comment: input,
            taskId: item?.id,
            username: session?.user?.name,
            useremail: session?.user?.email,
            userPicture: session?.user?.image,
            createdAt: new Date()
    } 
    
    setComments((oldItem)=>[...oldItem, data])  
        
    toast.success("Comentário adicionado");
    setInput("");
        
    } catch (error){
        console.log(error)
    }
    
    };

    async function handleDeleteComment(id: string){
        await deleteDoc(doc(db, "comments", id))
        .then(()=>{
            setComments(comments.filter(comment => comment.id !== id))
            toast.success("Comentário deletado")
        })
        .catch((error)=>{
            toast.error("Ocorreu um erro ao deletar o comentário");
            console.log(error)
        })

    }

    return(
        <>
        <Head>
            <title>Tarefa</title>
        </Head>
          <section className="mt-10 w-full">
                    <div className="flex flex-col mx-5 lg:mx-32">
                        <div className="flex flex-col justify-center gap-2 h-2/4">
                          <h1 className="text-white text-3xl font-bold">Tarefa</h1>
                          <Textarea
                          placeholder="Digite a sua tarefa..."
                          defaultValue={item.task}
                          />
                        </div>
                        <div className="flex flex-col justify-center gap-2 h-2/4 mt-10 ">
                          <h1 className="text-white text-xl">Deixar comentário</h1>
                          <Textarea
                          placeholder="Digite o seu comentário..."
                          value={input}
                          onChange={(event: ChangeEvent<HTMLTextAreaElement>)=>{setInput(event.target.value)}}
                          />
                         <button onClick={handleAddComment} className="bg-blue-600 w-full  text-white h-10 rounded-md cursor-pointer hover:bg-white hover:text-blue-600 transition-all duration-700 transform ">Enviar comentário</button>
                        </div>
                    </div>               
            </section>

            <section className="bg-white h-screen overflow-y-auto">
                <h1 className="text-center text-3xl font-bold pt-14">Comentários</h1>
                    <div className="flex flex-col items-center mx-5 lg:mx-40">
                        {comments.map((comment)=>(
                            <div key={comment.id} className="mt-5 border border-gray-700 rounded-md w-full h-20 flex flex-col justify-center gap-2 px-3 lg:px-10">
                            <div className="flex gap-1 w-full">
                            <div>
                            {/* <Image className="rounded-full" quality={100} src={`${session?.user?.image}`} width={50}height={50} alt="sldkd" /> */}
                            </div>
                            <div className="flex flex-col w-full">
                            <div className="flex items-center"> 
                            <span className="bg-gray-600 text-white w-auto flex items-center justify-center rounded-sm p-1 text-sm">
                            {comment.username}
                            </span>
                            </div>
                            <span className="whitespace-pre-wrap">{comment.comment}</span>
                            </div>
                          <div className="flex flex-col items-center gap-3">
                             <span className="text-xs text-gray-600 flex items-center">
                              <i><Calendar size={10}/></i>
                              {comment.createdAt.toLocaleString().slice(0,10)}
                              </span>             
                              {comment.useremail === session?.user?.email &&(
                              <button onClick={()=>{handleDeleteComment(comment.id)}} className="cursor-pointer">
                              <i><Trash2 color="red"/></i>
                              </button>
                              )}
                          </div>
                            </div>
                            </div>
                        ))}
                    </div>
            </section>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req })=>{

    const id = params?.id as string;
    const session = await getSession({ req });

    if(!session?.user){
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    
    const taskRef = doc(db, "tasks", id);
    const snapshot = await getDoc(taskRef)

    if(snapshot.data() === undefined){
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    if(snapshot.data()?.public === false){
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }       
     
    const milliseconds = snapshot.data()?.createdAt?.seconds * 1000;

    const task = ({
        id: snapshot.id,
        user: snapshot.data()?.user,
        task:snapshot.data()?.task,
        public:snapshot.data()?.public,
        createdAt: new Date(milliseconds).toLocaleString()
    });

    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"), where("taskId", "==", snapshot.id))

    const snapshotComments = await getDocs(q)

    let allComments = [] as CommentProps[];

        snapshotComments.forEach((doc)=>{
            const commentDate = doc.data()?.createdAt?.seconds * 1000;
            allComments.push({
                id: doc.id,
                comment: doc.data().comment,
                taskId: doc.data().taskId,
                username: doc.data().username,
                useremail: doc.data().useremail,
                userPicture: doc.data().userPicture,
                createdAt: new Date(commentDate).toLocaleString()
            })
        })

    console.log(allComments)

    return{
        props: {
            item: task,
            allComments: allComments 
        }
    }

}