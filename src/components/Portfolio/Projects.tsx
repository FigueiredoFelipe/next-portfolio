import Image from "next/image";
import agtvw610 from "../UI/img/agtvw610.png";

export function Projects() {
  return (
    <main className="m-auto max-w-full flex flex-col md:flex-row w-full md:w-full py-4 items-center space-x-24">
      <figure className="w-full">
        <Image
          className="rounded-lg w-full"
          src={agtvw610}
          alt="Arena Gaming Tv web site"
          priority={false} // {false} | {true}
        />
      </figure>
      <aside className="flex flex-col w-3/5 justify-center items-center order-0 md:order-1">
        <h1 className="font-bold">ArenaGamingTV</h1>
        <h4>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis dolor
          laborum distinctio eum! Veritatis tenetur reiciendis pariatur quidem!
        </h4>
        <h5 className="font-bold cursor-pointer">PHP, HTML, CSS</h5>
        <h5 className="font-bold cursor-pointer">Code Live Demo</h5>
      </aside>
    </main>
  );
}
