import React, {useEffect} from 'react';
import {folder, useControls} from "leva";

const LevaCamera = ({initialIntensity, onChange}) => {
    const {x, y, z} = useControls({
        [initialIntensity.type]: folder(
            {
                x: {value: initialIntensity.position[0], min: -5, max: 5, step: 0.001},
                y: {value: initialIntensity.position[1], min: -5, max: 5, step: 0.001},
                z: {value: initialIntensity.position[2], min: -5, max: 5, step: 0.001},
            },
            { collapsed: true }
        ),
    });

    useEffect(() => {
        onChange({
            position: [x, y, z]
        });
    }, [x, y, z]);

    return null;
};

export default LevaCamera;