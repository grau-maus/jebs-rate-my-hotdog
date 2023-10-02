export default function SubmitFile(props) {
  const { fileInput, APIKey, setIsLoading, setRating, setAPIError } = props;

  return (
    <button
      className="absolute border-2 rounded-full border-sky-500 p-3 top-28 hover:bg-slate-800"
      onClick={() => {
        const formData = new FormData();
        formData.append("name", fileInput.name);
        formData.append("APIKey", APIKey);
        formData.append("file", fileInput);

        /*
        See "../api/rate/route.js" on how an API route gets called in Next.js 13.5+
        */
        fetch("/api/rate", {
          body: formData,
          method: "POST",
        })
          .then(async (res) => {
            const rating = await res.json();
            if (!rating.data.error && !rating.error) {
              setRating(rating.data);
            } else {
              setAPIError(
                rating.data.error !== undefined
                  ? rating.data.error
                  : rating.error
              );
            }
            setIsLoading(false);
          })
          .catch((res) => {
            console.log(res);
            setIsLoading(false);
          });
        setIsLoading(true);
      }}
    >
      Submit hotdog
    </button>
  );
}
