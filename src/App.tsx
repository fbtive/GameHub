import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GamesGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
    genreId?: number;
    platformId?: number;
    sortOrder: string;
    searchText: string;
}

function App() {
    // const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    // const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

    const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "aside main"`,
            }}
            templateColumns={{
                base: "1fr",
                lg: "200px 1fr",
            }}
        >
            <GridItem area="nav">
                <NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} />
            </GridItem>
            <Show above="lg">
                <GridItem area="aside" paddingStart="12px">
                    <GenreList
                        selectedGenreId={gameQuery.genreId}
                        onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genreId: genre.id })}
                    />
                </GridItem>
            </Show>
            <GridItem area="main" padding="12px">
                <GameHeading gameQuery={gameQuery} />
                <HStack spacing={3}>
                    <PlatformSelector
                        selectedPlatformId={gameQuery.platformId}
                        onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platformId: platform.id })}
                    />
                    <SortSelector
                        sortOrder={gameQuery.sortOrder}
                        onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })}
                    />
                </HStack>
                <GamesGrid gameQuery={gameQuery} />
            </GridItem>
        </Grid>
    );
}

export default App;
