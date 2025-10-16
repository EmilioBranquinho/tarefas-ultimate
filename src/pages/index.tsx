import Image from "next/image";
import superhero from '../../public/assets/superhero-animate.svg'

export default function Home() {
  return (
    <div
     className="flex items-center justify-center h-screen"
    >
    <main className="flex flex-col items-center h-screen">
      <div>
        <Image 
        src={superhero}
        alt={""}
        width={450}
        height={500}
        priority={true}
        />
      </div>
      <div className="flex flex-col gap-8 items-center justify-center ">
        <div className="text-white lg:text-3xl font-bold w-3xs lg:w-auto ">ORGANIZE AS SUAS TAREFAS DE FORMA EFICIENTE E PRODUTIVA</div>
        <div className="text-black flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-10 w-full">
          <div className="bg-white h-10 flex items-center justify-center w-full lg:w-36 rounded-md">+20 posts</div>
          <div className="bg-white h-10 flex items-center justify-center w-full lg:w-36 rounded-md">+50 comentários</div>
        </div>
      </div>
    </main>
    </div>
  );
}
