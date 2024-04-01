// import useData from "./useData";
import { useQuery } from "@tanstack/react-query";
// import genres from "../data/genres";
import apiClient from "../services/api-client";
import { Payload } from "./useData";
import genres from "../data/genres";

export interface Genre {
    id: number;
    name: string;
    image_background: string;
}

// const useGenres = () => useData<Genre>("/genres");
const useGenres = () =>
    useQuery({
        queryKey: ["genres"],
        queryFn: () => apiClient.get<Payload<Genre>>("/genres").then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000,
        initialData: { count: genres.length, results: genres },
    });

export default useGenres;
