import React from 'react';
import {Html} from "@react-three/drei";

const Description = ({item, setArr}) => {

    const onClickDescription = (nic) => {

        setArr(prev =>
            prev.map(item => {
                // const itemName = item.name.replace(/[^a-zA-Z]/g, "");
                if (item.fullName === nic) {
                    return {
                        ...item,
                        clickDescription: !item.clickDescription
                    };
                }
                return item;
            })
        );
    };

    return (
        <>
            <Html position={[item.position[0], item.position[1], item.position[2]]} occlude distanceFactor={10}>
                <div
                    className="cursor-pointer inline-block w-2 h-2"
                    onClick={() => onClickDescription(item.fullName)}
                >
                    {item.clickDescription ? (
                        <div className="bg-gray-300 bg-opacity-20 p-2 rounded-xl text-[4px] w-12">
                            {item.description}
                        </div>
                    ) : (
                        <img
                            src="/img/logoi.png"
                            alt="logo"
                            className="border-gray-400 border-opacity-0 border-2 rounded-2xl hover:border-opacity-40"
                        />
                    )}
                </div>
            </Html>
        </>
    );
};

export default Description;