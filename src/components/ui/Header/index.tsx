export function Header(){
    return(
        <>
        <header className="lg:h-14">
            <div className="flex h-full items-center justify-between mx-8 lg:mx-32 mt-5 gap-3 lg:gap-0">
            <div className="flex items-center justify-center gap-3">
                <a className="text-white lg:text-4xl font-bold" href="/">Tarefas <span className="text-red-600">Ultim8</span></a>
                <a href="#" className="bg-white h-5 lg:h-10 flex items-center justify-center w-24 lg:w-36 rounded-md">Meu Painel</a>
            </div>

            <button className="text-white border rounded-full lg:h-10 flex items-center justify-center w-20 lg:w-36 cursor-pointer hover:bg-white hover:text-black transition-all duration-400 transform scale-105">Acessar</button>
            </div>
        </header>
        </>
    )
}