"use client";
import React, { useState } from "react";
import SubmitFile from "./SubmitFile";
import { fileSizeToKBMB } from "../utils";

export default function FileInput() {
  const [fileSize, setFileSize] = useState("0 KB");
  const [fileError, setFileError] = useState("");
  const [fileInput, setFileInput] = useState({});

  return (
    <div className="flex flex-col relative pb-40">
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
            } else {
              setFileInput(e.target.files[0]);
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
        <span className="absolute font-mono text-sm text-red-500 top-24">
          {fileError}
        </span>
      ) : fileSize === "0 KB" ? null : (
        <SubmitFile fileInput={fileInput} />
      )}
    </div>
  );
}
