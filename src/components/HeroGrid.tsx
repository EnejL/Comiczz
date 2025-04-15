import { Box, Grid } from '@mui/material';
import { HeroCard } from './HeroCard';
import { Superhero } from '../types/superhero';

// Predefined set of core superheroes
const INITIAL_HEROES: Superhero[] = [
  {
    id: "70",
    name: "Batman",
    powerstats: { intelligence: "100", strength: "26", speed: "27", durability: "50", power: "47", combat: "100" },
    biography: {
      "full-name": "Bruce Wayne",
      "alter-egos": "No alter egos found.",
      "aliases": ["Bat-Man", "The Dark Knight", "The Detective"],
      "place-of-birth": "Gotham City",
      "first-appearance": "Detective Comics #27",
      "publisher": "DC Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Human",
      "height": ["6'2", "188 cm"],
      "weight": ["210 lb", "95 kg"],
      "eye-color": "blue",
      "hair-color": "black"
    },
    work: {
      "occupation": "Businessman",
      "base": "Batcave, Stately Wayne Manor, Gotham City"
    },
    connections: {
      "group-affiliation": "Batman Family, Batman Incorporated, Justice League",
      "relatives": "Thomas Wayne (father), Martha Wayne (mother)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg" }
  },
  {
    id: "732",
    name: "Iron Man",
    powerstats: { intelligence: "100", strength: "85", speed: "58", durability: "85", power: "100", combat: "64" },
    biography: {
      "full-name": "Tony Stark",
      "alter-egos": "No alter egos found.",
      "aliases": ["Iron Knight", "Hogan Potts", "Spare Parts Man"],
      "place-of-birth": "Long Island, New York",
      "first-appearance": "Tales of Suspense #39",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Human",
      "height": ["6'6", "198 cm"],
      "weight": ["425 lb", "193 kg"],
      "eye-color": "blue",
      "hair-color": "black"
    },
    work: {
      "occupation": "Inventor, Industrialist; former CEO of Stark Industries",
      "base": "Stark Tower, New York City"
    },
    connections: {
      "group-affiliation": "Avengers",
      "relatives": "Howard Stark (father, deceased), Maria Stark (mother, deceased)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/85.jpg" }
  },
  {
    id: "644",
    name: "Superman",
    powerstats: { intelligence: "94", strength: "100", speed: "100", durability: "100", power: "100", combat: "85" },
    biography: {
      "full-name": "Clark Kent",
      "alter-egos": "Superman Prime One-Million",
      "aliases": ["Man of Steel", "Son of Krypton", "The Last Son of Krypton"],
      "place-of-birth": "Krypton",
      "first-appearance": "Action Comics #1",
      "publisher": "DC Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Kryptonian",
      "height": ["6'3", "191 cm"],
      "weight": ["225 lb", "102 kg"],
      "eye-color": "blue",
      "hair-color": "black"
    },
    work: {
      "occupation": "Reporter for the Daily Planet",
      "base": "Metropolis"
    },
    connections: {
      "group-affiliation": "Justice League of America, The Legion of Super-Heroes",
      "relatives": "Jor-El (father, deceased), Lara (mother, deceased), Jonathan Kent (adoptive father), Martha Kent (adoptive mother)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/791.jpg" }
  },
  {
    id: "346",
    name: "Spider-Man",
    powerstats: { intelligence: "90", strength: "55", speed: "67", durability: "75", power: "74", combat: "85" },
    biography: {
      "full-name": "Peter Parker",
      "alter-egos": "No alter egos found.",
      "aliases": ["Spidey", "Friendly Neighborhood Spider-Man", "Web-Slinger"],
      "place-of-birth": "Queens, New York City",
      "first-appearance": "Amazing Fantasy #15",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Human",
      "height": ["5'10", "178 cm"],
      "weight": ["165 lb", "75 kg"],
      "eye-color": "hazel",
      "hair-color": "brown"
    },
    work: {
      "occupation": "Freelance photographer, teacher",
      "base": "New York City"
    },
    connections: {
      "group-affiliation": "Avengers",
      "relatives": "Richard Parker (father, deceased), Mary Parker (mother, deceased), Benjamin Parker (uncle, deceased), May Parker (aunt)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/133.jpg" }
  },
  {
    id: "659",
    name: "Thor",
    powerstats: { intelligence: "69", strength: "100", speed: "83", durability: "100", power: "100", combat: "100" },
    biography: {
      "full-name": "Thor Odinson",
      "alter-egos": "Rune King Thor",
      "aliases": ["God of Thunder", "Donald Blake", "Odinson"],
      "place-of-birth": "Asgard",
      "first-appearance": "Journey into Mystery #83",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Asgardian",
      "height": ["6'6", "198 cm"],
      "weight": ["640 lb", "290 kg"],
      "eye-color": "blue",
      "hair-color": "blond"
    },
    work: {
      "occupation": "King of Asgard; formerly Doctor",
      "base": "Asgard, formerly New York City"
    },
    connections: {
      "group-affiliation": "Avengers",
      "relatives": "Odin (father), Gaea (mother), Loki (adopted brother)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/140.jpg" }
  }
];

export const HeroGrid: React.FC = () => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Grid container spacing={2}>
        {INITIAL_HEROES.map((hero) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={hero.id}>
            <HeroCard hero={hero} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 