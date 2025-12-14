import React, {useEffect, useState} from 'react'
import {folder, useControls} from 'leva'
import {Html} from '@react-three/drei'

const LevaDescription = ({onChange, initialIntensity}) => {
    const [clickDesc, setClickDesc] = useState(initialIntensity.clickDescription);

    const {desc, x, y, z} = useControls({
        [initialIntensity.descriptionName]: folder({
            desc: {value: initialIntensity.desc, label: 'Описание', rows: 3},
            x: {value: initialIntensity.position[0], min: -5, max: 5, step: 0.001},
            y: {value: initialIntensity.position[1], min: -5, max: 5, step: 0.001},
            z: {value: initialIntensity.position[2], min: -5, max: 5, step: 0.001},
        }, {collapsed: true})
    })

    const onClickDescription = (clickDesc) => {
        setClickDesc(!clickDesc)
    }

    useEffect(() => {
        onChange({
            desc,
            position: [x, y, z],
            onClickDescription
        })
    }, [desc, x, y, z, clickDesc])

    return (
        <Html
            position={[x, y, z]}
            distanceFactor={1}
        >
            <div
                onClick={() => onClickDescription(clickDesc)}
                className="cursor-pointer inline-block w-[50px] h-[50px]"
            >
                {clickDesc ? (
                    <div className="bg-gray-700 text-white p-4 rounded-2xl w-48 h-auto break-words">
                        {desc}
                    </div>
                ) : (
                    <div>
                        <img
                            src="/img/logoi.png"
                            alt="logo"
                        />
                    </div>
                )}
            </div>
        </Html>
    )
}

export default LevaDescription
