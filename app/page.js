"use client";
import React, { useState } from "react";
import Image from "next/image";
import { fileSizeToKBMB } from "./utils";

export default function Home() {
  const [fileSize, setFileSize] = useState("0 KB");
  const [fileError, setFileError] = useState("");

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

      <div className="relative pb-40">
        <label className="block mb-2" htmlFor="file_input">
          Upload hotdog (2 MB max)
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const currentFileSize = fileSizeToKBMB(e.target.files[0].size);
              const isImageType = e.target.files[0].type.includes("image");
              setFileSize(currentFileSize);
              setFileError("");
              if (!isImageType) {
                setFileError(
                  "What you're uploading is definitely not a hotdog. Please upload a hotdog."
                );
              } else if (
                currentFileSize.includes("MB") &&
                Number(currentFileSize.split(" ")[0]) > 2
              ) {
                setFileError(
                  "Hotdog is too large! Please resize or upload a smaller hotdog."
                );
              }
            }
          }}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          {fileSize}
        </p>
        {fileError !== "" ? (
          <span className="absolute font-mono text-sm text-red-500">
            {fileError}
          </span>
        ) : null}
      </div>
    </main>
  );
}
