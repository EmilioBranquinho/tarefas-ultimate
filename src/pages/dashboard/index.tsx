import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Head from "next/head";
import { RedirectType } from "next/navigation";
import { GetServerSideProps } from "next";
import { Trash, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";

export default function Dashboard(){
    return(
        <>
        <Head>
            <title>Meu painel</title>
        </Head>

        <section className="mt-10">
            <div className="flex flex-col justify-center mx-5 lg:mx-32 gap-2 h-2/4 ">
              <h1 className="text-white text-3xl font-bold">Qual é a sua tarefa?</h1>  
              <Textarea/> 
               <div className="flex gap-3">
               <input className="border bg-black right-0" type="checkbox" />
               <span className="text-white font-semibold">Deixar tarefa pública</span>
               </div>
               <div>
                <button className="bg-blue-600 w-full text-white h-10 rounded-md cursor-pointer hover:bg-white hover:text-blue-600 transition-all duration-700 transform scale-105">Registrar</button>
               </div>
                </div>                
        </section>

        <section className="bg-white h-screen mt-10">
        <h1 className="text-center text-3xl font-bold pt-14">Minhas tarefas</h1>
            <div className="flex flex-col items-center mx-5 lg:mx-40">
                <div className="mt-5 border border-gray-700 rounded-md w-full h-16 flex items-center justify-between px-10">
                    <span>Estudar Nexts com o sujeito programador</span>
                    <button className="cursor-pointer">
                        <i><Trash2 color="red"/></i>
                    </button>
                    </div>          
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
        props: {},
    };
};