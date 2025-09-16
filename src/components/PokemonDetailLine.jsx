import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TerrainIcon from '@mui/icons-material/Terrain';
import CategoryIcon from '@mui/icons-material/Category';
import TimelineIcon from '@mui/icons-material/Timeline';
import ImageIcon from '@mui/icons-material/Image';

const iconMap = {
  Color: <ColorLensIcon data-testid="ColorLensIcon" />,
  Habitat: <TerrainIcon data-testid="TerrainIcon" />,
  Shape: <CategoryIcon data-testid="CategoryIcon" />,
  Generation: <TimelineIcon data-testid="TimelineIcon" />,
};

export default function PokemonDetailLine({ property, name }) {
  const icon = iconMap[property] || <ImageIcon data-testid="ImageIcon" />;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={property}
        secondary={name}
        fontWeight="bold"
      />
    </ListItem>
  );
}