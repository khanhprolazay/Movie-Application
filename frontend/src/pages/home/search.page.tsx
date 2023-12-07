import AppContainer from "@/components/AppContainer";
import { Link, useSearchParams } from "react-router-dom";
import { FC, useEffect } from "react";
import { Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import moviesActions from "@/actions/movie.action";
import MovieAside from "./components/MovieAside";
import { LazyLoadImage } from "react-lazy-load-image-component";
import urlUtils from "@/utils/urlUtils";
import stringUtils from "@/utils/stringUtils";
import { Genre } from "@/type";
import SkeletonCard from "@/components/SkeletonCard";
import Empty from "@/components/Empty";
import List from "./components/List";
import { useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const SearchPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, total, loading } = useAppSelector((state) => state.movie.search);
  const year = stringUtils.cParseInt(searchParams.get("year"), 10);
  const keyword = searchParams.get("keyword");
  const genre = searchParams.get("genre");
  const page = parseInt(searchParams.get("page") || "")
  // const page = parseInt(page, 10);
  // const [page, setpage] = useState(1);

  const genres: Array<Genre> = [];
  if (genre !== null) {
    genres.push({
      name: genre,
    });
  }

  const maxPage = total % 30 !== 0 ? Math.floor(total / 30) + 1 : Math.floor(total / 30);

  const next = () => {
    if (page === maxPage) return;
    searchParams.set("page", `${page + 1}`)
    setSearchParams(searchParams)
  };

  const prev = () => {
    if (page === 1) return;
    searchParams.set("page", `${page - 1}`)
    setSearchParams(searchParams)
  };

  let linkTo = '';
  if (year) {
    linkTo = `year=${year}`;
  } else if (genre) {
    linkTo = `genre=${genre}`;
  } else if (keyword) {
    linkTo = `keyword=${keyword}`;
  }

  const prevLink = page === 1 ? `page=${1}` : `page=${page - 1}`;
  const nextLink = page === maxPage ? `page=${maxPage}` : `page=${page + 1}`;

  useEffect(() => {
    if (year) dispatch(moviesActions.getMovieByYear(year, 30 * (page - 1), 30));
    else if (keyword) dispatch(moviesActions.getMovieByKeyword(keyword, 30 * (page - 1), 30));
    else if (genres) dispatch(moviesActions.getMovieByGenres(genres, 30 * (page - 1), 30));
  }, [year, keyword, genre, page]);

  const getContent = () => {
    if (loading) {
      return (
        <List>
          {Array.from({ length: 50 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </List>
      );
    }

    if (data.length === 0) {
      return <Empty />;
    }

    return (
      <List>
        {data.map((item, index) => (
          <Card
            key={`like-${index}`}
            className={`items-center rounded-none bg-transparent shadow-none`}
            onClick={() => navigate(urlUtils.getDetailUrl(item.id))}
          >
            <CardBody className="w-[105px] transform p-0 duration-300 ease-in-out hover:scale-95 hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:w-[125px]">
              <LazyLoadImage
                effect="blur"
                src={urlUtils.getImageUrl(item)}
                wrapperClassName="h-[170px] w-full md:h-[200px]"
                className="border-2 border-slate-700"
              />
              {item.rating !== null && (
                <div className="absolute right-1 top-1 flex cursor-pointer items-center rounded-lg bg-black px-2 py-0.5 text-sm text-white">
                  {stringUtils.formatRating(item.rating)}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-0.5 h-4 w-4 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="mt-1 line-clamp-1">
                <Typography
                  variant="h5"
                  className="font-manrope text-sm font-extrabold capitalize text-slate-200"
                >
                  {item.title}
                </Typography>
              </div>
              <div className="line-clamp-1">
                <Typography className="font-manrope text-xs capitalize text-slate-300/70">
                  {item.release}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </List>
    );
  };

  return (
    <AppContainer>
      {/* --------------------------------Body----------------------------------- */}
      <div className="grid grid-cols-3 bg-cblack-100">
        {/* Content  */}

        <div className="col-span-full border-r border-r-divider px-4 pb-5 lg:col-span-2">
          <hr className="full-width-underline mb-1 mt-20 border-2 border-gray-500" />
          <div className="-mb-6 -mt-16 flex justify-center font-manrope text-4xl font-extrabold text-slate-200 ">
            {keyword || year || genre}
          </div>

          <div className="mb-5 mt-[52px] font-manrope text-xl font-semibold text-slate-200">
            Search Results
          </div>

          <div className="relative h-auto w-full items-end lg:grid-cols-[1fr_5px]">
            {getContent()}
          </div>
          {maxPage > 1 && (
            <div className="flex items-center gap-5 mt-10 mb-5 justify-center">
              <Link to={`/search?${linkTo}&${prevLink}`}>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={prev}
                  disabled={page === 1}
                  className="bg-slate-300"
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
              </Link>

              <Typography color="gray" className="text-gray-400 font-bold">
                Page <strong className="text-white">{page}</strong> of{' '}
                <strong className="text-white">{maxPage}</strong>
              </Typography>

              <Link to={`/search?${linkTo}&${nextLink}`}>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={next}
                  disabled={page === maxPage}
                  className="bg-slate-300"
                >
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
              </Link>
            </div>
          )}

        </div>



        <MovieAside />
      </div>
    </AppContainer>
  );
};

export default SearchPage;
