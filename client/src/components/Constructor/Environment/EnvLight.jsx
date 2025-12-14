import React, {useEffect, useRef} from 'react';
import {useThree} from "@react-three/fiber";

const EnvLight = ({lights}) => {

    const spotRefs = useRef([])
    const targetRefs = useRef([])
    const {scene} = useThree()

    useEffect(() => {
        spotRefs.current.forEach((spot, i) => {
            if (spot && targetRefs.current[i]) {
                spot.target = targetRefs.current[i]
                scene.add(spot.target)
            }
        })
    }, [scene, lights])

    useEffect(() => {
        spotRefs.current.forEach((spot) => {
            if (spot && spot.shadow && spot.shadow.map) {
                spot.shadow.map.dispose(); // очищаем shadow map
                spot.shadow.map = null;
                spot.shadow.needsUpdate = true; // пересчет теней
            }
        });
    }, [lights]);

    return (
        <>
            {
                lights.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.type === "spotlight" &&
                            <>
                                <spotLight
                                    ref={el => (spotRefs.current[index] = el)}
                                    visible={item.onoff}
                                    castShadow
                                    position={item.position}
                                    angle={item.angle ? item.angle * Math.PI / 180 : 45 * Math.PI / 180}
                                    intensity={item.intensity}
                                    shadow-mapSize-width={1024}
                                    shadow-mapSize-height={1024}
                                    shadow-bias={-0.05}
                                    penumbra={1}
                                    shadow-radius={10}           // вот это размытие теней
                                />
                                <mesh
                                    position={item.position}
                                    visible={item.visible}
                                >
                                    <sphereGeometry args={[0.05, 16, 16]}/>
                                    <meshStandardMaterial color={item.color}/>
                                </mesh>
                                <mesh ref={el => (targetRefs.current[index] = el)}
                                      position={item.target}
                                      visible={item.visible}
                                >
                                    <boxGeometry args={[0.01, 0.01, 0.01]}/>
                                    <meshStandardMaterial color={item.color}/>
                                </mesh>
                            </>
                        }
                        {item.type === "ambient" &&
                            <>
                                <ambientLight intensity={item.intensity}/>
                            </>
                        }
                    </React.Fragment>
                ))
            }
        </>
    );
};

export default EnvLight;