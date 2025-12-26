import React, {useEffect} from 'react';
import {folder, useControls} from 'leva';

const LevaOrbitcontrols = ({onChange, initialIntensity}) => {

    const {minAzimuthAngle, maxAzimuthAngle, minPolarAngle, maxPolarAngle} = useControls({
        [initialIntensity.name]: folder(
            {
                minAzimuthAngle: {value: initialIntensity.minAzimuthAngle, min: -3.14, max: 0, step: 0.001},
                maxAzimuthAngle: {value: initialIntensity.maxAzimuthAngle, min: 0, max: 3.14, step: 0.001},
                minPolarAngle: {value: initialIntensity.minPolarAngle, min: 0, max: 3.14, step: 0.001},
                maxPolarAngle: {value: initialIntensity.maxPolarAngle, min: 0, max: 3.14, step: 0.001},
            },
            {collapsed: true}
        )
    });

    useEffect(() => {
        onChange({
            minAzimuthAngle,
            maxAzimuthAngle,
            minPolarAngle,
            maxPolarAngle,
        });
    }, [minAzimuthAngle, maxAzimuthAngle, minPolarAngle, maxPolarAngle]);


}

export default LevaOrbitcontrols;