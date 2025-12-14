import React, {useEffect} from 'react';
import {folder, useControls} from "leva";

const LevaDescription = ({onChange, initialIntensity}) => {

    const {desc, x, y, z} = useControls({
        [initialIntensity.descriptionName]: folder({
            desc: {value: initialIntensity.desc, label: "Описание", rows: 3},
            x: {value: initialIntensity.position[0], min: -5, max: 5, step: 0.001},
            y: {value: initialIntensity.position[1], min: -5, max: 5, step: 0.001},
            z: {value: initialIntensity.position[2], min: -5, max: 5, step: 0.001},
        }, {collapsed: true})
    });

    useEffect(() => {
        onChange({
            desc,
            position: [x, y, z]
        });
    }, [desc, x, y, z]);

    return null;
};

export default LevaDescription;