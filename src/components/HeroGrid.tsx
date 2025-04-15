import { Box, Grid } from '@mui/material';
import { HeroCard } from './HeroCard';
import { Superhero } from '../types/superhero';

// Predefined set of 16 popular superheroes
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
  },
  {
    id: "720",
    name: "Wonder Woman",
    powerstats: { intelligence: "88", strength: "100", speed: "79", durability: "100", power: "100", combat: "100" },
    biography: {
      "full-name": "Diana Prince",
      "alter-egos": "No alter egos found.",
      "aliases": ["Princess Diana", "Princess of the Amazons", "Goddess of Truth"],
      "place-of-birth": "Themyscira",
      "first-appearance": "All-Star Comics #8 (December 1941)",
      "publisher": "DC Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Female",
      "race": "Amazon",
      "height": ["6'0", "183 cm"],
      "weight": ["130 lb", "59 kg"],
      "eye-color": "blue",
      "hair-color": "black"
    },
    work: {
      "occupation": "Adventurer, Emissary to the world of Man, Protector of Paradise Island",
      "base": "Themyscira"
    },
    connections: {
      "group-affiliation": "Justice League of America, Justice Society of America",
      "relatives": "Hippolyta (mother), Zeus (father)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/807.jpg" }
  },
  {
    id: "106",
    name: "Black Panther",
    powerstats: { intelligence: "88", strength: "16", speed: "30", durability: "60", power: "41", combat: "100" },
    biography: {
      "full-name": "T'Challa",
      "alter-egos": "No alter egos found.",
      "aliases": ["King of the Dead", "The Client"],
      "place-of-birth": "Wakanda, Africa",
      "first-appearance": "Fantastic Four Vol. 1 #52",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Human",
      "height": ["6'0", "183 cm"],
      "weight": ["200 lb", "91 kg"],
      "eye-color": "brown",
      "hair-color": "black"
    },
    work: {
      "occupation": "King and Chieftain of Wakanda",
      "base": "Wakanda, Africa"
    },
    connections: {
      "group-affiliation": "Avengers",
      "relatives": "T'Chaka (father, deceased), Ramonda (stepmother), Shuri (sister)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/247.jpg" }
  },
  {
    id: "332",
    name: "Hulk",
    powerstats: { intelligence: "88", strength: "100", speed: "63", durability: "100", power: "98", combat: "85" },
    biography: {
      "full-name": "Bruce Banner",
      "alter-egos": "No alter egos found.",
      "aliases": ["Annihilator", "Captain Universe", "Joe Fixit", "Mr. Fix-it", "Professor"],
      "place-of-birth": "Dayton, Ohio",
      "first-appearance": "Incredible Hulk #1 (1962)",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Human / Radiation",
      "height": ["8'0", "244 cm"],
      "weight": ["1400 lb", "635 kg"],
      "eye-color": "green",
      "hair-color": "green"
    },
    work: {
      "occupation": "Nuclear physicist, Agent of S.H.I.E.L.D.",
      "base": "(Banner) Hulkbuster Base, New Mexico"
    },
    connections: {
      "group-affiliation": "Avengers, Defenders, Fantastic Four",
      "relatives": "Betty Ross Talbot Banner (wife)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/83.jpg" }
  },
  {
    id: "717",
    name: "Wolverine",
    powerstats: { intelligence: "63", strength: "32", speed: "50", durability: "100", power: "89", combat: "100" },
    biography: {
      "full-name": "Logan",
      "alter-egos": "No alter egos found.",
      "aliases": ["Weapon X", "Patch", "James Howlett"],
      "place-of-birth": "Alberta, Canada",
      "first-appearance": "Incredible Hulk #180",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Mutant",
      "height": ["5'3", "160 cm"],
      "weight": ["300 lb", "136 kg"],
      "eye-color": "blue",
      "hair-color": "black"
    },
    work: {
      "occupation": "Adventurer, instructor, former bartender, bouncer, spy, government operative",
      "base": "Xavier Institute, Salem Center, Westchester County, New York"
    },
    connections: {
      "group-affiliation": "X-Men, Avengers",
      "relatives": "John Howlett Sr. (father, deceased), Elizabeth Howlett (mother, deceased)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/161.jpg" }
  },
  {
    id: "213",
    name: "Deadpool",
    powerstats: { intelligence: "69", strength: "32", speed: "50", durability: "100", power: "100", combat: "100" },
    biography: {
      "full-name": "Wade Wilson",
      "alter-egos": "Evil Deadpool",
      "aliases": ["Wade T. Wilson", "Merc with a Mouth", "Jack"],
      "place-of-birth": "Canada",
      "first-appearance": "New Mutants #98",
      "publisher": "Marvel Comics",
      "alignment": "neutral"
    },
    appearance: {
      "gender": "Male",
      "race": "Mutant",
      "height": ["6'2", "188 cm"],
      "weight": ["210 lb", "95 kg"],
      "eye-color": "brown",
      "hair-color": "No Hair"
    },
    work: {
      "occupation": "Mercenary",
      "base": "Mobile"
    },
    connections: {
      "group-affiliation": "X-Force, Deadpool Corps",
      "relatives": "Thomas Wilson (father, deceased), Hailey Wilson (mother, deceased)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/835.jpg" }
  },
  {
    id: "579",
    name: "Scarlet Witch",
    powerstats: { intelligence: "100", strength: "10", speed: "29", durability: "70", power: "100", combat: "80" },
    biography: {
      "full-name": "Wanda Maximoff",
      "alter-egos": "No alter egos found.",
      "aliases": ["Wanda Frank", "Wanda Magnus", "Ana Maximoff"],
      "place-of-birth": "Wundagore Mountain, Transia",
      "first-appearance": "X-Men #4 (March, 1964)",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Female",
      "race": "Mutant",
      "height": ["5'7", "170 cm"],
      "weight": ["132 lb", "60 kg"],
      "eye-color": "blue",
      "hair-color": "brown"
    },
    work: {
      "occupation": "Adventurer, formerly witchcraft tutor, housewife, mutant terrorist",
      "base": "Mobile"
    },
    connections: {
      "group-affiliation": "Avengers",
      "relatives": "Pietro Maximoff (Quicksilver, twin brother), Magnus (Magneto, father), Magda Lehnsherr (mother, deceased)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/444.jpg" }
  },
  {
    id: "234",
    name: "Doctor Strange",
    powerstats: { intelligence: "100", strength: "10", speed: "12", durability: "84", power: "100", combat: "60" },
    biography: {
      "full-name": "Stephen Strange",
      "alter-egos": "No alter egos found.",
      "aliases": ["Sorcerer Supreme", "Master of the Mystic Arts"],
      "place-of-birth": "Philadelphia, Pennsylvania",
      "first-appearance": "Strange Tales #110 (July, 1963)",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Human",
      "height": ["6'2", "188 cm"],
      "weight": ["180 lb", "81 kg"],
      "eye-color": "grey",
      "hair-color": "black"
    },
    work: {
      "occupation": "Sorcerer Supreme, retired neurosurgeon",
      "base": "Sanctum Sanctorum, Greenwich Village, New York City"
    },
    connections: {
      "group-affiliation": "Avengers, Defenders",
      "relatives": "Eugene Strange (father, deceased), Beverly Strange (mother, deceased)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/55.jpg" }
  },
  {
    id: "107",
    name: "Black Widow",
    powerstats: { intelligence: "75", strength: "13", speed: "33", durability: "30", power: "36", combat: "100" },
    biography: {
      "full-name": "Natasha Romanoff",
      "alter-egos": "No alter egos found.",
      "aliases": ["Natasha Romanoff", "Natalia Romanova", "Nat"],
      "place-of-birth": "Stalingrad, Russia",
      "first-appearance": "Tales of Suspense #52",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Female",
      "race": "Human",
      "height": ["5'7", "170 cm"],
      "weight": ["131 lb", "59 kg"],
      "eye-color": "green",
      "hair-color": "red"
    },
    work: {
      "occupation": "Spy, Agent of S.H.I.E.L.D.",
      "base": "Mobile"
    },
    connections: {
      "group-affiliation": "Avengers, S.H.I.E.L.D.",
      "relatives": "Unknown"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/248.jpg" }
  },
  {
    id: "655",
    name: "Thanos",
    powerstats: { intelligence: "100", strength: "100", speed: "33", durability: "100", power: "100", combat: "80" },
    biography: {
      "full-name": "Thanos",
      "alter-egos": "No alter egos found.",
      "aliases": ["The Mad Titan", "Masterlord"],
      "place-of-birth": "Titan",
      "first-appearance": "Iron Man #55",
      "publisher": "Marvel Comics",
      "alignment": "bad"
    },
    appearance: {
      "gender": "Male",
      "race": "Eternal",
      "height": ["6'7", "201 cm"],
      "weight": ["985 lb", "447 kg"],
      "eye-color": "red",
      "hair-color": "No Hair"
    },
    work: {
      "occupation": "Conqueror, worshiper of Death",
      "base": "Mobile"
    },
    connections: {
      "group-affiliation": "Infinity Watch",
      "relatives": "A'Lars (father), Sui-San (mother, deceased), Eros (brother)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/1305.jpg" }
  },
  {
    id: "275",
    name: "Ghost Rider",
    powerstats: { intelligence: "50", strength: "55", speed: "25", durability: "100", power: "100", combat: "60" },
    biography: {
      "full-name": "Johnny Blaze",
      "alter-egos": "No alter egos found.",
      "aliases": ["Spirit of Vengeance"],
      "place-of-birth": "Waukegan, Illinois",
      "first-appearance": "Marvel Spotlight #5 (August, 1972)",
      "publisher": "Marvel Comics",
      "alignment": "good"
    },
    appearance: {
      "gender": "Male",
      "race": "Demon",
      "height": ["6'2", "188 cm"],
      "weight": ["220 lb", "99 kg"],
      "eye-color": "red",
      "hair-color": "No Hair"
    },
    work: {
      "occupation": "Former stunt motorcyclist",
      "base": "Mobile"
    },
    connections: {
      "group-affiliation": "Champions of Los Angeles, Quentin Carnival",
      "relatives": "Barton Blaze (father, deceased), Naomi Blaze (mother, deceased)"
    },
    image: { url: "https://www.superherodb.com/pictures2/portraits/10/100/67.jpg" }
  }
];

export const HeroGrid: React.FC = () => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Grid container spacing={2}>
        {INITIAL_HEROES.map((hero) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={hero.id}>
            <HeroCard hero={hero} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 