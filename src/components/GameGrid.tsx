import { Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
    gameQuery: GameQuery;
}

const GamesGrid = ({ gameQuery }: Props) => {
    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useGames(gameQuery);
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const fetchedGamesCount = data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

    return (
        <>
            {error && <Text>{error.message}</Text>}
            <InfiniteScroll
                dataLength={fetchedGamesCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<Spinner />}
            >
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6} marginTop="12px">
                    {isLoading &&
                        skeletons.map((it) => (
                            <GameCardContainer key={it}>
                                <GameCardSkeleton />
                            </GameCardContainer>
                        ))}
                    {data?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.results.map((game) => (
                                <GameCardContainer key={game.id}>
                                    <GameCard game={game} />
                                </GameCardContainer>
                            ))}
                        </React.Fragment>
                    ))}
                </SimpleGrid>
            </InfiniteScroll>
            {hasNextPage && (
                <Button marginY={5} onClick={() => fetchNextPage()}>
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
            )}
        </>
    );
};

export default GamesGrid;
