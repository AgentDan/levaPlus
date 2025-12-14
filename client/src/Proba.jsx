import React, { useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls, button } from "leva";
import { Environment, OrbitControls } from "@react-three/drei";

// 🔹 Компонент для управления одним источником света
const LightControls = ({ light, index }) => {
    useControls(`Light ${index}`, {
        intensity: {
            value: light.intensity,
            min: 0,
            max: 10,
            step: 0.1,
            onChange: (v) => (light.intensity = v),
        },
        color: {
            value: `#${light.color.getHexString()}`,
            onChange: (v) => light.color.set(v),
        },
        position: {
            value: { x: light.position.x, y: light.position.y, z: light.position.z },
            step: 0.1,
            onChange: (v) => light.position.set(v.x, v.y, v.z),
        },
    });
    return null;
};

// 🔹 Основной контроллер сцены
const SceneController = () => {
    const { scene } = useThree();
    const [lights, setLights] = useState([]);
    const [meshes, setMeshes] = useState([]);
    const loader = useMemo(() => new GLTFLoader(), []);

    const clearScene = () => {
        meshes.forEach((m) => scene.remove(m));
        lights.forEach((l) => scene.remove(l));
        setMeshes([]);
        setLights([]);
    };

    const loadGLTF = (url) => {
        clearScene();
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

    useEffect(() => {
        // Загружаем первую сцену
        loadGLTF("/models/spavacaSoba.gltf");

        // Устанавливаем фон (чёрный)
        scene.background = new THREE.Color(0x000000);
    }, []);

    // 🔘 Кнопки Leva
    useControls({
        "Add Point Light": button(() => {
            const light = new THREE.PointLight(0xffffff, 1, 10);
            light.position.set(0, 3, 0);
            scene.add(light);
            setLights((prev) => [...prev, light]);
        }),
        "Load new model": button(() => loadGLTF("/models/mo.gltf")),
    });

    return (
        <>
            {lights.map((light, i) => (
                <LightControls key={i} light={light} index={i} />
            ))}
        </>
    );
};

// 🔹 Основной компонент Canvas
export default function Proba() {
    return (
        <div className="h-screen">
            <Canvas
                camera={{ position: [0, 5, 10], fov: 60 }}
                gl={{ toneMapping: THREE.NoToneMapping }}
            >
                {/*<color attach="background" args={["#000000"]} /> /!* тёмный фон *!/*/}
                <SceneController />
                <OrbitControls />
                <Environment
                    files="/img/skyTwo.exr"
                    background={false} // фон остаётся чёрным, но свет есть
                    intensity={0.8} // мягкий свет
                />
            </Canvas>
        </div>
    );
}
