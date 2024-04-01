import { useQuery } from "@tanstack/react-query";
import apiClient, { Payload } from "../services/api-client";

export interface Platform {
    id: number;
    name: string;
    background_image: string;
    slug: string;
}

const usePlatform = () =>
    useQuery({
        queryKey: ["platforms"],
        queryFn: () => apiClient.get<Payload<Platform>>("/platforms/lists/parents").then((res) => res.data),
        staleTime: 24 * 60 * 60 * 1000,
    });

export default usePlatform;
