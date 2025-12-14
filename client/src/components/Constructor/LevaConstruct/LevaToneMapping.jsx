import React, {useEffect} from 'react';
import {folder, useControls} from "leva";

const LevaToneMapping = ({ initialIntensity, onChange }) => {
    const {exposure} = useControls({[initialIntensity.name] : folder({
            exposure: {value: initialIntensity.exposure, min: 0, max: 10}
        }, {collapsed: true})
    });

    useEffect(() => {
        if (onChange) {
            onChange({ exposure });
        }
    }, [exposure, onChange]);

    return null;
};

export default LevaToneMapping;