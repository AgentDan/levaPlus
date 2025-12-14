import React, {useEffect, useState} from 'react';
import Buttons from "./Buttons/Buttons.jsx";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, useGLTF} from "@react-three/drei";
import {v1} from "uuid";
import * as THREE from "three";
import Env from "./Environment/Env.jsx";
import {Meshes} from "./Meshes.jsx";
import LevaConstruct from "./LevaConstruct/LevaConstruct.jsx";

const Constructor = ({openelements, setOpenelements, nameFile, arr, setArr}) => {

    const user = JSON.parse(localStorage.getItem("userData"));
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const modelPath = `${baseUrl}/uploads/${user.username}/${nameFile}`;
    const modelPathLeva = `./uploads/${user.username}/${nameFile}`;

    const {nodes, materials, scenes, parser} = useGLTF(modelPath);

    const extras = scenes?.[0]?.extras ?? scenes?.[0]?.userData?.extras ?? parser?.json?.scenes?.[0]?.extras;

    const [envLeva, setEnvLeva] = useState(() => extras?.env ?? []);

    useEffect(() => {
        if (!nodes) return;
        const meshes = Object.values(nodes || {}).filter((node) => node.isMesh);

        const arrModel = meshes.map(item => {
                    const found = envLeva.find(a => a.descriptionName === item.name);

                    return {
                        id: v1(),
                        name: item.name.replace(/[0-9_]/g, ""),
                        fullName: item.name,
                        check: item.name[1] === "0",
                        group: Number(
                            isNaN(Number(item.name.slice(0, 1))) === false
                                ? item.name.slice(0, 1)
                                : NaN
                        ),
                        description: found?.desc ?? null,
                        position: [
                            found?.position[0] ?? null,
                            found?.position[1]  ?? null,
                            found?.position[2]  ?? null,
                        ],
                        clickDescription: found?.clickDescription ?? null
                    }
                }
            )
        ;

        setArr(arrModel);
    }, [nameFile, nodes]);

    return (
        <div className="h-screen">
            <Canvas
                camera={{fov: 50, position: [0, 0, 0.1]}}
                shadows={{type: THREE.PCFSoftShadowMap}}
            >
                <Meshes arr={arr} setArr={setArr} materials={materials} nodes={nodes} envLeva={envLeva}/>
                <Env env={envLeva}/>
                <OrbitControls

                    makeDefault

                    minAzimuthAngle={-Math.PI * 0.35} // влевоa
                    maxAzimuthAngle={Math.PI * 0.35} // вправо
                    minPolarAngle={Math.PI * 0.25}   // нижний предел
                    maxPolarAngle={Math.PI * 0.6}   // верхний предел
                    enableZoom={false}

                />
            </Canvas>
            <LevaConstruct
                nodes={nodes}
                envLeva={envLeva}
                setEnvLeva={setEnvLeva}
                modelPathLeva={modelPathLeva}
            />
            <Buttons
                arr={arr}
                setArr={setArr}
                openelements={openelements}
                setOpenelements={setOpenelements}
            />
        </div>
    );
};

export default Constructor;
