import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, folder, button } from "leva";

const SceneController = () => {
    const { scene } = useThree();
    const [lights, setLights] = useState([]);
    const [meshes, setMeshes] = useState([]);

    const loader = useMemo(() => new GLTFLoader(), []);

    // Функция для загрузки GLTF
    const loadGLTF = (url) => {
        loader.load(url, (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.isLight) {
                    setLights((prev) => [...prev, child]);
                    scene.add(child);
                }
                if (child.isMesh) {
                    setMeshes((prev) => [...prev, child]);
                    scene.add(child);
                }
            });
        });
    };

    // Первоначальная загрузка сцены
    useEffect(() => {
        loadGLTF("/models/mo.gltf"); // путь к твоему GLTF
    }, []);

    // Динамическое создание GUI для света
    const lightControls = useMemo(() => {
        const config = {};
        lights.forEach((light, i) => {
            config[`Light ${i}`] = folder({
                intensity: {
                    value: light.intensity,
                    min: 0,
                    max: 10,
                    step: 0.1,
                    onChange: (v) => (light.intensity = v),
                },
                color: {
                    value: light.color.getHex(),
                    onChange: (v) => light.color.setHex(v),
                },
                x: {
                    value: light.position.x,
                    min: -10,
                    max: 10,
                    step: 0.1,
                    onChange: (v) => (light.position.x = v),
                },
                y: {
                    value: light.position.y,
                    min: -10,
                    max: 10,
                    step: 0.1,
                    onChange: (v) => (light.position.y = v),
                },
                z: {
                    value: light.position.z,
                    min: -10,
                    max: 10,
                    step: 0.1,
                    onChange: (v) => (light.position.z = v),
                },
            });
        });
        return config;
    }, [lights]);

    // Кнопка для загрузки нового меша
    useControls({
        "Load new mesh": button(() => loadGLTF("/models/newMesh.glb")),
        ...lightControls,
    });

    return null;
};

export default function Proba() {
    return (
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
            <SceneController />
            <ambientLight intensity={0.2} />
        </Canvas>
    );
}
