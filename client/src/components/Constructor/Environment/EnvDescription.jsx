import React from 'react';
import {Html} from "@react-three/drei";

const EnvDescription = ({item, clickDescript, handleClickDescription}) => {

    return (
        <Html
            position={[item.position[0], item.position[1], item.position[2]]}
            distanceFactor={1}
            zIndexRange={[0, 1]}
            pointerEvents="auto"
        >
            <div
                className="cursor-pointer inline-block w-[50px] h-[50px]"
                onClick={()=>handleClickDescription(item.name)}
            >
                {clickDescript ? (
                    <div className="bg-gray-700 text-white p-4 rounded-2xl w-48 h-auto break-words">
                        {item.desc}
                    </div>
                ) : (
                    <div>
                        <img src="/img/logoi.png" alt="logo" />
                    </div>
                )}
            </div>
        </Html>
    );
};

export default EnvDescription;