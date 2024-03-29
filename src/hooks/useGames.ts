import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
    id: number;
    name: string;
    background_image: string;
}

export interface GamesPayload {
    count: number;
    results: Game[];
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        apiClient
            .get<GamesPayload>("/games", { signal: controller.signal })
            .then((response) => {
                setGames(response.data.results);
            })
            .catch((e) => {
                if (e instanceof CanceledError) return;
                setError(e.message);
            });

        return () => {
            controller.abort();
        };
    }, []);

    return { games, error };
};

export default useGames;