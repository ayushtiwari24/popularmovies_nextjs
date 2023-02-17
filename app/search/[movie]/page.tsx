'use client'
import Image from "next/image";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query'

type PageProps = {
        params :{
          movie:string;
        };
      
};

interface datatype{
    title:string;
    runtime:number;
    overview:string;
    backdrop_path:string;
}

const MovieDetail=({params}:PageProps)=>{
  //console.log(params);
    //const {movie} =params;
    const imagePath = "https://image.tmdb.org/t/p/original";
    const {isLoading,error,data} = useQuery({
        queryKey:['repoData'],
        queryFn:()=>fetch(`https://api.themoviedb.org/3/movie/${params.movie}?api_key=23165c6094a38a3560b03fce9a5664af`).then((res)=>res.json())
      })
      const ans:datatype = data;
      if (isLoading) return 'Loading...'

      if (error) return 'An error has occurred: '

      return(
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imagePath + ans.backdrop_path}
        title={ans.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Runtime: {ans.runtime} minutes
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {ans.overview}
        </Typography>
      </CardContent>
    </Card>
      )

}
export default MovieDetail;