import { Button, HStack, Heading, Image, List, ListItem } from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import GenreCardSkeleton from "./GenreCardSkeleton";

interface Props {
    selectedGenreId?: number;
    onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ selectedGenreId, onSelectGenre }: Props) => {
    const { data, isLoading } = useGenres();
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // if (isLoading) return <Spinner />;

    return (
        <>
            <Heading fontSize="2xl" marginBottom={3}>
                Genres
            </Heading>
            <List>
                {isLoading &&
                    skeletons.map((it) => (
                        <ListItem key={it} paddingY="6px">
                            <GenreCardSkeleton />
                        </ListItem>
                    ))}
                {data?.results.map((genre) => (
                    <ListItem key={genre.id} paddingY="6px">
                        <HStack>
                            <Image
                                boxSize="32px"
                                borderRadius={8}
                                objectFit="cover"
                                src={getCroppedImageUrl(genre.image_background)}
                            />

                            <Button
                                fontWeight={genre.id == selectedGenreId ? "bold" : "normal"}
                                onClick={() => onSelectGenre(genre)}
                                fontSize="lg"
                                variant="link"
                                textAlign="start"
                                wordBreak="break-word"
                                whiteSpace="wrap"
                            >
                                {genre.name}
                            </Button>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default GenreList;
