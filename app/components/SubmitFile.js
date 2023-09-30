export default function SubmitFile(props) {
  const { fileInput } = props;

  return (
    <button
      className="absolute place-self-center border-2 rounded-full border-sky-500 p-3 top-24 hover:bg-slate-800"
      onClick={() => {
        console.log(fileInput);
      }}
    >
      Submit hotdog
    </button>
  );
}
