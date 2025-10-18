import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Head from "next/head";
import { RedirectType } from "next/navigation";
import { GetServerSideProps } from "next";
import { Share, Share2, Trash, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { email } from "zod";

interface taskProps{
    id: string,
    user: string,
    task: string,
    public: string,
    createdAt: string
}

interface DashboardProps{
    user: {
        email: string
    }
}

export default function Dashboard({ user }: DashboardProps){

    const[input, setInput] = useState("");
    const[publicTask, setPublicTask] = useState(false)
    const[tasks, setTasks] = useState<taskProps[]>([]);

    useEffect(()=>{
        async function getTasks(){
            const tasksRefs = collection(db, "tasks");
            const q = query(tasksRefs, orderBy("createdAt", "desc"), where("user", "==", user.email))
        }    
    })

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>){
        setPublicTask(event.target.checked)       
    }

    async function handleAddTask(){
        if(input === ""){
            alert("Preencha o campo!")
            return
        }

        const taskRef = collection(db, "tasks");
        await addDoc(taskRef, {
            user: user.email,
            task: input,
            public: publicTask,
            createdAt: new Date()
        })
        .then(()=>{
            alert("Tarefa cadastrada com sucesso")
            setInput("")
            setPublicTask(false)
        })
        .catch((error)=>{
            console.log(error)
        })

    }
    
                      

    return(
        <>
        <Head>
            <title>Meu painel</title>
        </Head>

        <section className="mt-10">
            <div className="flex flex-col justify-center mx-5 lg:mx-32 gap-2 h-2/4 ">
              <h1 className="text-white text-3xl font-bold">Qual é a sua tarefa?</h1>  
              <Textarea
              placeholder="Digite a sua tarefa..."
              value={input}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>)=>{setInput(event.target.value)}}
              /> 
               <div className="flex gap-3">
               <input className="border bg-black right-0" type="checkbox" 
               checked={publicTask}
               onChange={handleChangePublic}
               />
               <span className="text-white font-semibold">Deixar tarefa pública</span>
               </div>
               <div>
                <button onClick={handleAddTask} className="bg-blue-600 w-full text-white h-10 rounded-md cursor-pointer hover:bg-white hover:text-blue-600 transition-all duration-700 transform scale-105">Registrar</button>
               </div>
                </div>                
        </section>

        <section className="bg-white h-screen mt-10">
        <h1 className="text-center text-3xl font-bold pt-14">Minhas tarefas</h1>
            <div className="flex flex-col items-center mx-5 lg:mx-40">
                {tasks.map((task)=>(
                    <div className="mt-5 border border-gray-700 rounded-md w-full h-20 flex flex-col justify-center gap-2 px-10">
                    <div className="flex gap-2 items-center">
                        <span className="bg-blue-600 text-white w-16 flex items-center justify-center rounded-sm">Público</span>
                        <i><Share2 className="text-blue-600"/></i>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="whitespace-pre-wrap">{task.task}</span>
                        <button className="cursor-pointer">
                            <i><Trash2 color="red"/></i>
                        </button>
                    </div>
                    </div>
                ))}
                          
            </div>
        </section>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async( { req } ) =>{
    const session = await getSession( { req } )  

    if(!session){
        return{
            redirect: {
                destination: "/",
                permanent: false              
            }
        }
    }
    
    return {
        props: { 
            user: {
                email: session?.user?.email
            }
         },
    };
};