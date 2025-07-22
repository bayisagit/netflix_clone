import React,{useState,useEffect} from 'react'
import axios from '../../../utils/axios'
import './row.css'
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

export default function Row({title, fetchUrl, isLargeRow}) {
    const [movies,setMovie]=useState([])
    const baseUrl = 'https://image.tmdb.org/t/p/original';
    const [movieTrailerUrl, setMovieTrailerUrl] = useState('');
    useEffect(()=>{
        (async () => {
            try {
                const request = await axios.get(fetchUrl);
                setMovie(request.data.results);
                // console.log(request.data.results);
            } catch (error) {
                console.log("error",error)
            }
        })()
    },[fetchUrl])

//trailer 

const handleClick = (movie) => {
    if (movieTrailerUrl) {
        setMovieTrailerUrl('');
    } else {
        movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
            .then((url) => {
                if (url) {
                    // console.log("youtube url",url)
                    const urlParams = new URLSearchParams(new URL(url).search);
                    // console.log(urlParams)
                    const trailer = urlParams.get('v');
                    // console.log(trailer)
                    setMovieTrailerUrl(trailer);
                } else {
                    console.error('No trailer found for this movie');
                }
            })
            .catch((error) => console.error('Trailer fetching error:', error));
    }
};

const opts = {
    height: '390',
    width: '100%',
    playerVars: {
        autoplay: 1,
    },
};

  return (
      <div className='movie-container'>
          <h3>{title}</h3>
          <div className="row__posters">
              {movies?.map((movie) => {
                  const imageSrc = isLargeRow
                      ? movie.poster_path
                      : movie.backdrop_path;
                  return imageSrc ? (
                      <img
                            onClick={() => handleClick(movie)}
                          key={movie.id}
                          className={`row__poster ${
                              isLargeRow && 'row__posterLarge'
                          }`}
                          src={`${baseUrl}${imageSrc}`}
                          alt={
                              movie?.title ||
                              movie?.name ||
                              movie?.original_name
                          }
                      />
                  ) : null;
              })}
          </div>
          <div style={{ padding: '40px' }}>
              {movieTrailerUrl && <YouTube videoId={movieTrailerUrl} opts={opts} />
              }
          </div>
      </div>
  );
}