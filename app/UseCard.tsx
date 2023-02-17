import Link from "next/link";
import Image from "next/image";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface data{
    results:{
        title:string;
        release_date:string;
        poster_path:string;
        id:number;
    }[]
}

const Movie=({title,release_date,poster_path,id}:results)=>{
    const imagePath = "https://image.tmdb.org/t/p/original"
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={imagePath+poster_path}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {release_date}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    );
}
export default Movie;