
import { useState } from "react";
import { useGetPollinationText } from "../hooks/getResponseIA";
import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function TextComponent() {
    const [input, setInput] = useState('');
    const [prompt, setPrompt] = useState('');
    const { data, error } = useGetPollinationText(prompt);

    const handleSubmit = () => {
        if (input.trim()) {
            setPrompt(input.trim());
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-2.5">
            <h1 className="font-bold text-4xl mt-1" >Generador de Texto</h1>
            
            <div className="card flex justify-content-center">
                <InputText value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="card flex flex-wrap justify-content-center gap-3">
                <Button label="Submit" icon="pi pi-check"  onClick={handleSubmit} />
            </div>
            


            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {data && (
                <Card title="Respuesta">
                    <p>{data}</p>
                </Card>
        
                
            )}
        </div>
    );
}
