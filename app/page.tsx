'use client'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useQuery } from '@tanstack/react-query'
import Movie from './UseCard'
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react'
import { LastPage } from '@mui/icons-material'

const inter = Inter({ subsets: ['latin'] })

interface IProps{
  results:{
      title:string;
      release_date:string;
      poster_path:string;
      id:number;
  }[]
  pages:number;
  total_pages:number;
  total_results:number;
}


// const Example=()=>{
//   const {isLoading,error,data} = useQuery({
//     queryKey:['repoData'],
//     queryFn:()=>fetch(`https://api.themoviedb.org/3/movie/popular?api_key=23165c6094a38a3560b03fce9a5664af`).then((res)=>res.json())
//   })
//   const ans:IProps=data;
//   if (isLoading) return 'Loading...'

//   if (error) return 'An error has occurred: ' 

//   return(
//     <main>
//       <div>
//         {ans.results.map((movie)=>(
//           <Movie key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} release_date={movie.release_date}/>
//         ))}
//       </div>
//     </main>
//   )

// }

// export default Example;
function Projects(){
  const fetchMovies = async({pageParam=1}) =>{
    const res = await (await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=23165c6094a38a3560b03fce9a5664af&page=`+pageParam)).json();
    const ans:IProps=res;
    return ans;
  }

  const{data,hasNextPage,fetchNextPage,isFetching,isFetchingNextPage,status,error} = useInfiniteQuery({
    queryKey:['movies'],
    queryFn:fetchMovies,
    getNextPageParam:(lastPage,allPages)=>{
      const maxPages = lastPage.total_results/20;
      const nextPage = allPages.length+1;
      return nextPage<=maxPages?nextPage:undefined;
    }
  })
  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error</p>
  ) : (
    <main>
      <div>
      {data.pages.map((res)=>(

        res.results.map((movie)=>(
          <Movie key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} release_date={movie.release_date}/>  
        ))
      ))}
      </div>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </main>
  )
}




export default Projects;

