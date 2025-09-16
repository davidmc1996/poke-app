import { useQuery } from "@tanstack/react-query"
import { LIMIT_FOR_PAGE } from "../helpers/constants";
import { fetchPokemonSpecies } from "../services/pokemonService"
import { Grid, Pagination, Typography } from "@mui/material"
import PokemonCard from "./PokemonCard"
import { useNavigate, useSearchParams } from "react-router";
import Loader from "./Loader";
import Error from "./Error";

export default function PokemonsList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 1;

  const offset = (page - 1) * LIMIT_FOR_PAGE;

  const { isPending, error, data } = useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () =>
      fetchPokemonSpecies(offset, LIMIT_FOR_PAGE)
  })

  if (isPending) return (
    <Loader />
  );

  if (error) return (
    <Error message={error.message} />
  );

  const totalPages = Math.ceil(data.count / LIMIT_FOR_PAGE);

  const handleChange = (event, value) => {
    navigate(`/?page=${value}`);
  };

  return (
    <Grid container spacing={4} maxWidth="md" margin="auto" padding={2}>
      <Grid size={12}>
        <Typography variant="h2" component="h1" align="center">
          POKEMONES
        </Typography>
      </Grid>
      {data.results?.map((pokemon) => {
        return (
          <Grid key={pokemon.name} size={{ xs: 12, sm: 6, lg: 4 }}>
            <PokemonCard pokemon={pokemon} currentPage={page} />
          </Grid>
        )
      })}
      
      {data.results?.length === 0 && (
        <Grid size={12}>
          <Typography variant="h4" component="h2" align="center">
            NO SE ENCONTRARON RESULTADOS!
          </Typography>
        </Grid>
      )}

      {data.results?.length > 0 && (
        <Grid size={12} alignContent={"center"} display="flex" justifyContent="center">
          <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
        </Grid>
      )}
    </Grid>
  )
}