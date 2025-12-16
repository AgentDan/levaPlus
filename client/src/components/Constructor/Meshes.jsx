import React from "react";

export function Meshes({arr, nodes, materials}) {

    return (
        <>
            {arr.map((item) => {
                const shouldRender =
                    (nodes[item.fullName] &&
                        nodes[item.fullName].geometry &&
                        item.check) ||
                    item.name === "default" ||
                    item.name === "default2" ||
                    item.name === "default1";

                if (!shouldRender) return null;

                return (
                    <mesh
                        key={item.id}
                        geometry={nodes[item.fullName].geometry}
                        castShadow
                        receiveShadow
                    >

                        {item.name.replace(/[0-9_]/g, "") !== "mirror"
                            ?
                            <meshStandardMaterial {...materials[item.fullName]} />
                            :
                            <meshPhysicalMaterial
                                transparent={true}
                                roughness={0}        // гладкая поверхность
                                metalness={0}
                                ior={1.2}            // стекло/пластик
                                thickness={2.2}      // толщина для преломления
                                opacity={0.9}
                                color="black"
                            />
                        }
                    </mesh>
                );
            })}
        </>
    );
}