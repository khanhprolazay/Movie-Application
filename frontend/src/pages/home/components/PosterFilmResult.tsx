import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface PosterFilmProps {
  id: number,
  image: string;
  name: string;
  rating: number;
}

const PosterFilmResult = (props: PosterFilmProps) => {
  const navigate = useNavigate();
  const formattedRating = Number.isInteger(props.rating) ? `${props.rating}.0` : props.rating;

  return (
    <div
      className="relative mb-10 object-cover text-gray-300 transition-colors hover:text-slate-100 mx-auto mt-5"
      onClick={() => navigate(`/detail/${props.id}`)}
    >
      <LazyLoadImage
        alt="image 1"
        src={props.image}
        width={206}
        height={320}
        wrapperClassName="transform border object-cover duration-300 ease-in-out hover:opacity-40 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      />
      <div className="absolute left-28 top-1 flex cursor-pointer items-center rounded-lg bg-black px-1 py-0.5 text-sm text-white">
        {formattedRating}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-coral"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="line-clamp-1 w-full">
      <Typography
        variant="h2"
        className="text-md font-medium absolute -bottom-7 max-w-full overflow-hidden whitespace-nowrap font-manrope hover:text-gray-500 hover:cursor-pointer hover:transition-colors"
      >
        {props.name}
      </Typography>
      </div>
    </div>
  );
};

export default PosterFilmResult;
