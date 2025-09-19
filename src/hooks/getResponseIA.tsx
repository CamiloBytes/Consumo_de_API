import { useEffect, useState } from "react";
import type { IGetPollinationText } from '../types/GetResponse';
import { api } from "../service/api";

export const useGetPollinationText = (prompt: string | null ) => {
    const [data, setData] = useState<IGetPollinationText | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!prompt) return;

        let cancel = false;

        const fetchText = async () => {
            try {
                setLoading(true);
                const response = await api.get<IGetPollinationText>(`/${encodeURIComponent(prompt)}`, {
                    params: {
                        model: "openai",
                    }
                });
                
                console.log("Respuesta de la API:", response.data);

                if (!cancel) setData(response.data);
            } catch (error: any) {
                console.error("Error al hacer fetch:", error);
                if (!cancel) setError(error.message || "Error desconocido");
            } finally {
                if (!cancel) setLoading(false);
            }
        };

        fetchText();

        return () => {
            cancel = true;
        };
    }, [prompt]);

    return {
        data,
        loading,
        error
    };
};
