import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
    id: number;
    name: string;
}

interface GenreResponse {
    count: number;
    results: Genre[];
}

const useGenres = () => {
    const [isLoading, setLoading] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<GenreResponse>("/genres", { signal: controller.signal })
            .then((response) => {
                setGenres(response.data.results);
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

    return { genres, error, isLoading };
};

export default useGenres;
