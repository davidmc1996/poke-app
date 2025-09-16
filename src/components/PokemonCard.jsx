import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonSpeciesDetail } from '../services/pokemonService';
import { CardActionArea, Skeleton } from '@mui/material';
import { Link } from 'react-router';

export default function PokemonCard({ pokemon, currentPage }) {
  const { isPending, error, data } = useQuery({
    queryKey: ['pokemonCard', pokemon.name],
    queryFn: () =>
      fetchPokemonSpeciesDetail(pokemon.name)
  })

  if (isPending) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <Skeleton variant="rectangular" height={240} animation="wave" />
        <CardContent>
          <Skeleton variant="text" height={30} width="60%" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ maxWidth: 345, border: '1px solid', borderColor: 'error.main' }}>
        <CardContent>
          <Typography variant="h6" color="error" textAlign="center" gutterBottom>
            Error al cargar
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {pokemon.name.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/pokemon/${data.id}`} state={{ fromPage: currentPage }} >
        <CardMedia
          sx={{ height: 240, backgroundSize: 'contain' }}
          image={data.sprites.other['official-artwork'].front_default}
          title={pokemon.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {pokemon.name.toUpperCase()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}