import SkeletonCard from "@/components/SkeletonCard";
import PosterFilmRow from "@/pages/home/components/PosterFilmRow";
import { useAppSelector } from "@/redux/hooks";

export function ListPosterFilmRow() {
  const { data, loading } = useAppSelector((state) => state.movie.random);
  
  return (
    <div className="mt-2 flex flex-col gap-2">
      {loading
        ? Array.from([1, 2, 3, 4, 5], (index) => (
            <SkeletonCard
              imageClassname="!w-[82.22px] h-[110.22px]"
              bodyClassname=""
              key={index}
              direction="row"
            />
          ))
        : data.slice(0, 8).map((movie, index: number) => (
            <PosterFilmRow key={index} movie={movie} />
          ))}
    </div>
  );
}
