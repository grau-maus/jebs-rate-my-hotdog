"use client";
import React, { useState } from "react";
import SubmitFile from "./SubmitFile";
import { fileSizeToKBMB } from "../utils";

export default function FileInput(props) {
  const { setRating, setIsLoading, userFileInput, setUserFileInput } = props;
  const [fileSize, setFileSize] = useState("0 KB");
  const [fileError, setFileError] = useState("");
  const [APIInput, setAPIInput] = useState("");

  // *TO-DO* ERROR HANDLING FOR API KEY

  return (
    <div className="flex flex-col pt-40">
      <div>
        <label className="block mb-2" htmlFor="api_input">
          <div className="text-decoration-line: underline">
            Enter astica API key
          </div>
          <a
            className="font-mono text-sm hover:bg-slate-500"
            href="https://astica.ai/?a=38200"
            target="_blank"
          >
            go to https://astica.ai/ and generate a key
          </a>
        </label>
        <input
          className="text-black px-2"
          id="api_input"
          type="password"
          onChange={(e) => {
            setAPIInput(e.target.value);
          }}
        />
      </div>
      <div className="relative mt-4">
        <label className="block mb-2" htmlFor="file_input">
          <div className="text-decoration-line: underline">Upload hotdog</div>
          <div className="font-mono text-sm">
            (2 MB max. PNG / JPG hotdogs only.)
          </div>
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const currentFileSize = fileSizeToKBMB(e.target.files[0].size);
              const isImageType = e.target.files[0].type.includes("image");
              const imageType = e.target.files[0].type.split("/")[1];
              setFileSize(currentFileSize);
              setFileError("");
              if (!isImageType) {
                setFileError(
                  "What you're uploading is definitely not a hotdog -- please upload a hotdog"
                );
              } else if (!["png", "jpeg"].includes(imageType)) {
                setFileError(
                  "Hotdog is needs to be in '.png' or '.jpg' format"
                );
              } else if (
                currentFileSize.includes("MB") &&
                Number(currentFileSize.split(" ")[0]) > 2
              ) {
                setFileError(
                  "Hotdog is too large! Please resize or upload a smaller hotdog"
                );
              } else {
                setUserFileInput(e.target.files[0]);
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
          <span className="absolute font-mono text-sm text-red-500 top-28">
            {fileError}
          </span>
        ) : fileSize === "0 KB" ? null : (
          <SubmitFile
            fileInput={userFileInput}
            APIKey={APIInput}
            setIsLoading={setIsLoading}
            setRating={setRating}
          />
        )}
      </div>
    </div>
  );
}
