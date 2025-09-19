
import { useState } from "react";
import { useGetPollinationText } from "../hooks/getResponseIA";


export default function TextComponent() {
    const [input, setInput] = useState('');
    const [prompt, setPrompt] = useState('');
    const { data, loading, error } = useGetPollinationText(prompt);

    const handleSubmit = () => {
        if (input.trim()) {
            setPrompt(input.trim());
        }
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Generador de Texto</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu prompt"
            />
            <button onClick={handleSubmit}>Generar</button>

            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {data && (
                <div>
                    <h2>Texto generado:</h2>
                    <pre>{data.input}</pre>
                </div>
            )}
        </div>
    );
}
