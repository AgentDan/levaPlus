import React, {useEffect} from 'react';
import {folder, useControls} from "leva";

const LevaEffectComposer = ({ initialIntensity, onChange }) => {

    const {focusDistance, focalLength, bokehScale} = useControls({[initialIntensity.name] : folder({
            focusDistance: {value: initialIntensity.focusDistance, min: 0, max: 1, step: 0.01},
            focalLength: {value: initialIntensity.focalLength, min: 0, max: 1, step: 0.01},
            bokehScale: {value: initialIntensity.bokehScale, min: 0, max: 5, step: 0.01},
        }, {collapsed: true})
    });

    useEffect(() => {
        if (onChange) {
            onChange({ focusDistance, focalLength, bokehScale });
        }
    }, [focusDistance, focalLength, bokehScale]);

    return null;
};

export default LevaEffectComposer;