// import useData from "./useData";
import { useQuery } from "@tanstack/react-query";
// import genres from "../data/genres";
import APIClient from "../services/api-client";
import genres from "../data/genres";
import ms from "ms";

export interface Genre {
    id: number;
    name: string;
    image_background: string;
}

const apiClient = new APIClient<Genre>("/genres");

// const useGenres = () => useData<Genre>("/genres");
const useGenres = () =>
    useQuery({
        queryKey: ["genres"],
        queryFn: () => apiClient.getAll(),
        staleTime: ms("24h"),
        initialData: { count: genres.length, next: null, results: genres },
    });

export default useGenres;
