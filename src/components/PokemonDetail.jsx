import { useLocation, useNavigate, useParams } from "react-router"
import { fetchEvolutionChain, fetchPokemonSpeciesById, fetchPokemonSpeciesDetail } from "../services/pokemonService";
import { useQuery } from "@tanstack/react-query";
import { Button, CardMedia, Chip, Grid, List, Typography } from "@mui/material";
import PokemonDetailLine from "./PokemonDetailLine";
import { getEvolutionChain } from "../helpers";
import HomeIcon from '@mui/icons-material/Home';
import Loader from "./Loader";
import Error from "./Error";

export default function PokemonDetail() {
  const { id } = useParams();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;

  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: specieData,
  } = useQuery({
    queryKey: ["pokemonDetail", id],
    queryFn: () => fetchPokemonSpeciesById(id),
  });

  const {
    isPending: isDetailPending,
    error: detailError,
    data: detailData,
  } = useQuery({
    queryKey: ["pokemonCard", specieData?.name],
    queryFn: () => fetchPokemonSpeciesDetail(specieData?.name),
    enabled: !!specieData?.name,
  });

  const {
    isPending: isChainPending,
    error: chainError,
    data: chainData,
  } = useQuery({
    queryKey: ["pokemonChain", specieData?.name],
    queryFn: () => fetchEvolutionChain(specieData?.evolution_chain?.url),
    enabled: !!specieData?.evolution_chain?.url,
  });

  if (isPending) {
    return (
      <Loader />
    );
  }

  if (error || detailError || chainError) {
    return (
      <Error message={(error || detailError || chainError).message} />
    );
  }

  const spriteImage = detailData?.sprites?.other['official-artwork'].front_default;

  const evolutions = getEvolutionChain(chainData?.chain);
  const currentIndex = evolutions.findIndex(obj => obj.name === specieData?.name);

  const isFirstEvolution = currentIndex === 0;
  const isLastEvolution = currentIndex === evolutions.length - 1;

  const handlePrevEvolution = (e) => {
    if (isFirstEvolution) return;
    const newIndex = currentIndex - 1;
    const prevEvolution = evolutions[newIndex];
    const id = prevEvolution.url.split("/").filter(Boolean).pop();
    navigate(`/pokemon/${id}`, { state: { fromPage } });
  }

  const handleNextEvolution = (e) => {
    if (isLastEvolution) return;
    const newIndex = currentIndex + 1;
    const nextEvolution = evolutions[newIndex];
    const id = nextEvolution.url.split("/").filter(Boolean).pop();
    navigate(`/pokemon/${id}`, { state: { fromPage } });
  }

  const goToHome = () => {
    navigate(`/?page=${fromPage}`);
  }

  const onlyTextSpanish =
    specieData?.flavor_text_entries?.filter(
      (item) => item.language.name === "es"
    ) || [];
  const distinctTexts = [
    ...new Set(onlyTextSpanish.map((item) => item.flavor_text)),
  ];

  return (
    <Grid container spacing={4} maxWidth="md" margin="auto" padding={2}>
      <Grid size={12} textAlign="left">
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={goToHome}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: 3,
            px: 2,
          }}
        >
          Volver
        </Button>
      </Grid>

      <Grid size={12}>
        <Typography variant="h2" component="h1" align="center">
          {specieData.name.toUpperCase()}
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <CardMedia
          sx={{
            height: { xs: 240, sm: 300, md: 340 },
            width: '100%',
            backgroundSize: 'contain'
          }}
          image={spriteImage}
          title={specieData.name}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <PokemonDetailLine property="Color" name={specieData.color.name} />
          <PokemonDetailLine property="Habitat" name={specieData.habitat.name} />
          <PokemonDetailLine property="Shape" name={specieData.shape.name} />
          <PokemonDetailLine property="Generation" name={specieData.generation.name} />
        </List>
      </Grid>

      <Grid size={12} textAlign="center">
        {distinctTexts.map((text, index) => (
          <Chip
            key={index}
            label={text}
            color="primary"
            variant="outlined"
            sx={{ m: 0.5 }}
          />
        ))}
      </Grid>

      {!isChainPending && (
        <Grid size={12} container justifyContent="space-between">
          <Button disabled={isFirstEvolution} onClick={handlePrevEvolution}>Previa Evolución</Button>
          <Button disabled={isLastEvolution} onClick={handleNextEvolution}>Siguiente Evolución</Button>
        </Grid>
      )}
    </Grid>
  );
}