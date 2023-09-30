import Image from "next/image";
import FileInput from "./components/FileInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>Let&apos;s rate your hotdog!</p>
        <div>
          <div className="mr-2">Made with</div>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div>...and wingstop...</div>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.linkedin.com/in/jeb-griffin-120631206/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Idea by Jeb Griffin
          </a>
        </div>
      </div>
      <FileInput />
    </main>
  );
}
