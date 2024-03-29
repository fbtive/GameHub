import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface Payload<T> {
    count: number;
    results: T[];
}

const useData = <T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
    dependencies?: any[]
) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");

    useEffect(
        () => {
            console.log(dependencies);
            const controller = new AbortController();

            setLoading(true);
            apiClient
                .get<Payload<T>>(endpoint, {
                    signal: controller.signal,
                    ...requestConfig,
                })
                .then((response) => {
                    setData(response.data.results);
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
        },
        dependencies ? [...dependencies] : []
    );

    return { data, error, isLoading };
};

export default useData;
