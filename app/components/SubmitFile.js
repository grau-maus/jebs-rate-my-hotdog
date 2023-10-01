export default function SubmitFile(props) {
  const { fileInput } = props;

  return (
    <button
      className="absolute place-self-center border-2 rounded-full border-sky-500 p-3 top-24 hover:bg-slate-800"
      onClick={async () => {
        const formData = new FormData();
        formData.append("name", fileInput.name);
        formData.append("file", fileInput);

        /*
        See "../api/rate/route.js" on how an API route gets called in Next.js 13.5+
        */
        const data = await fetch("/api/rate", {
          body: formData,
          method: "POST",
        })
          .then(async (res) => {
            return await res.json();
          })
          .catch((res) => {
            console.log(res);
          });
        console.log(data);
      }}
    >
      Submit hotdog
    </button>
  );
}
