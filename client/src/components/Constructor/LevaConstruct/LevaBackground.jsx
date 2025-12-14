import React, { useEffect } from "react";
import { useControls, folder } from "leva";

const LevaBackground = ({ onChange, initialIntensity }) => {
    const {intensity} = useControls({
        [initialIntensity.name] : folder({
            intensity: { value: initialIntensity.intensity, min: 0, max: 1, step: 0.01 }
        }, {collapsed: true})
    });

    useEffect(() => {
        if (onChange) {
            onChange({ intensity });
        }
    }, [intensity, onChange]);

    return null;
};

export default LevaBackground;
