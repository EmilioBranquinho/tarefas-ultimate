import { useSession, signIn, signOut } from "next-auth/react"

export function Header(){

    const { data: session, status } = useSession();

    return(
        <>
        <header className="lg:h-14">
            <div className="flex h-full items-center justify-between mx-5 lg:mx-32 mt-5 gap-3 lg:gap-0">
            <div className="flex items-center justify-center gap-3">
                <a className="text-white lg:text-4xl font-bold lg:flex-row lg:gap-2 flex flex-col" href="/">
                <span>Tarefas</span> 
                <span className="text-red-600">UltiM8</span>
                </a>
                {session?.user &&(
                    <a href="/dashboard" className="bg-white h-7 lg:h-10 flex items-center justify-center w-24 lg:w-36 rounded-md">Meu Painel
                </a>
                )}
            </div>

           {status === "loading" ? (
            <>
            <div
            className="text-white border rounded-full lg:h-10 flex items-center justify-center w-20 lg:w-36 cursor-pointer hover:bg-white hover:text-black transition-all duration-700 transform scale-105"
            >Carregando...</div>
            </>
            ) : session ? (
            <button 
            className="text-white text-sm border rounded-full lg:h-10 flex items-center justify-center w-28 lg:w-36 cursor-pointer hover:bg-white hover:text-black transition-all duration-700 transform scale-105"
            onClick={()=>{signOut()}}
            >Olá {session.user?.name} </button>                
            ) : (
            <button 
            className="text-white border rounded-full lg:h-10 flex items-center justify-center w-20 lg:w-36 cursor-pointer hover:bg-white hover:text-black transition-all duration-700 transform scale-105"
            onClick={()=>{signIn("google")}}
            >Acessar</button>
            )}   
            </div>
        </header>
        </>
    )
}