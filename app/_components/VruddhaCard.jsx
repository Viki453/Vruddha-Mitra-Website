import Image from "next/image";
import Link from "next/link";

function VruddhaCard({ vruddha }) {
  const { id, firstName, lastName, age, image, advise, likes, description } =
    vruddha;

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-lg transition duration-300">
      <figure className="h-60 overflow-hidden relative">
        <Image
          src={image}
          fill={true}
          alt={`${firstName} ${lastName || ""}`}
          className="w-full h-full object-cover"
          quality={80}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">
          {firstName} {lastName || ""}
        </h2>

        <p className="text-sm text-base-content/70">Age: {age}</p>

        {description && (
          <p className="text-base-content/80 italic">
            {description.length > 80
              ? description.slice(0, 80) + "..."
              : description}
          </p>
        )}

        {advise && (
          <div className="bg-base-200 p-3 rounded-md mt-2 text-sm border-l-4 border-success">
            <strong className="text-success block mb-1">
              Words of Wisdom:
            </strong>
            <span className="text-base-content/90">{advise}</span>
          </div>
        )}

        {likes && (
          <p className="text-sm mt-2 text-success">
            <strong>Likes:</strong> {likes.replace(/[{}]/g, "")}
          </p>
        )}

        <div className="card-actions justify-end mt-4">
          <Link className="btn  btn-info btn-lg " href={`/vruddhas/${id}`}>
            Book Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
export default VruddhaCard;
