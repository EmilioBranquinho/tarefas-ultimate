import Image from "next/image";
import superhero from '../../public/assets/superhero-animate.svg'
import Head from "next/head";
import { GetStaticProps } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface HomeProps{
  posts: number,
  comments: number
}

export default function Home({ posts, comments }: HomeProps ) {

  return (
    <>
     <Head>
      <title>Home</title>
    </Head>
    <div
     className="flex items-center justify-center h-screen"
    >
    <main className="flex flex-col items-center h-screen md:mx-12">
      <div>
        <Image 
        src={superhero}
        alt={""}
        width={450}
        height={500}
        priority={true}
        />
      </div>
      <div className="flex flex-col gap-8 items-center justify-center w-full px-5">
        <div className="text-white md:text-2xl lg:text-3xl font-bold w-full  md:w-full lg:w-auto ">ORGANIZE AS SUAS TAREFAS DE FORMA EFICIENTE E PRODUTIVA</div>
        <div className="text-black flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-10 w-full">
          <div className="bg-white h-10 flex items-center justify-center w-full md:h-12 md:text-xl lg:text-[16px] lg:w-36 rounded-md">+{posts} posts</div>
          <div className="bg-white h-10 flex items-center justify-center w-full md:h-12 md:text-xl lg:text-[16px] lg:w-36 rounded-md">+{comments} comentários</div>
        </div>
      </div>
    </main>
    </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async()=>{

  //buscar os numeros do banco e mandar papra o componente

  const commentRef = collection(db, "comments");
  const PostRef = collection(db, "tasks");

  const commentSnapshot= await getDocs(commentRef);
  const PostSnapshot = await getDocs(PostRef);




  return{
    props: {
      posts: PostSnapshot.size || 0,
      comments:commentSnapshot.size || 0
    },
    revalidate: 10
  }
}
