import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
    id: number;
    name: string;
    background_image: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
}

export interface GamesPayload {
    count: number;
    results: Game[];
}

const useGames = () => {
    const [isLoading, setLoading] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<GamesPayload>("/games", { signal: controller.signal })
            .then((response) => {
                setGames(response.data.results);
                setLoading(false);
            })
            .catch((e) => {
                if (e instanceof CanceledError) return;
                setError(e.message);
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, []);

    return { games, error, isLoading };
};

export default useGames;
