import Image from "next/image";

export default function HotdogRating(props) {
  const { rating, setRating, userFileInput } = props;

  return (
    <div className="flex content-center">
      <Image
        className="py-10 pr-20 max-w-3xl"
        alt={rating.caption.text}
        src={URL.createObjectURL(userFileInput)}
        width={rating.metadata.width}
        height={rating.metadata.height}
      />
      <div className="self-center flex flex-col">
        <div className="font-mono text-xl w-96">{rating.caption_GPTS}</div>
        <button
          className="self-center mt-10 border-2 rounded-full border-sky-500 p-4 w-56 hover:bg-slate-800"
          onClick={() => {
            setRating("");
          }}
        >
          Rate another hotdog
        </button>
      </div>
    </div>
  );
}
