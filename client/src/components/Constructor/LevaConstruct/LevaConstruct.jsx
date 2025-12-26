import React, { useRef, useEffect } from "react";
import axios from "axios";
import LevaBackground from "./LevaBackground.jsx";
import LevaButton from "./LevaButton.jsx";
import LevaLight from "./LevaLight.jsx";
import LevaFog from "./LevaFog.jsx";
import LevaToneMapping from "./LevaToneMapping.jsx";
import LevaShadows from "./LevaShadows.jsx";
import LevaEffectComposer from "./LevaEffectComposer.jsx";
import LevaDescription from "./LevaDescription.jsx";
import LevaOrbitcontrols from "./LevaOrbitcontrols.jsx";
import LevaCamera from "./LevaCamera.jsx";

const LevaConstruct = ({ envLeva, setEnvLeva, modelPathLeva }) => {

    const envRef = useRef(envLeva);

    useEffect(() => {
        envRef.current = envLeva;
    }, [envLeva]);

    const handleChange = (key, value) => {
        setEnvLeva(prev =>
            prev.map(item => (item.name === key ? { ...item, ...value } : item))
        );
    };

    const handleSave = async () => {
        try {
            await axios.post("/api/file/save", {
                env: envRef.current,
                modelPathLeva
            });
            console.log("Сохранено успешно!");
        } catch (err) {
            console.error("Ошибка при сохранении:", err);
        }
    };

    return (
        <>
            {envLeva.map(item => {
                switch (item.type) {
                    case "background":
                        return <LevaBackground key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "spotlight":
                        return <LevaLight key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "fog":
                        return <LevaFog key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "toneMapping":
                        return <LevaToneMapping key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "shadows":
                        return <LevaShadows key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "effectComposer":
                        return <LevaEffectComposer key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "description":
                        return <LevaDescription key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "orbitcontrols":
                        return <LevaOrbitcontrols key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    case "camera":
                        return <LevaCamera key={item.name} initialIntensity={item} onChange={v => handleChange(item.name, v)} />;
                    default:
                        return null;
                }
            })}
            <LevaButton handleSave={handleSave} />
        </>
    );
};

export default LevaConstruct;
