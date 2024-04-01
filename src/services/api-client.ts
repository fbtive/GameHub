import axios from "axios";

export interface Payload<T> {
    count: number;
    results: T[];
}

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "25a34a679808426eacb2251ee80a6cab",
    },
});
