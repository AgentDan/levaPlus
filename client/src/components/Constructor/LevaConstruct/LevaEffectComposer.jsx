import React, {useEffect} from 'react';
import {folder, useControls} from "leva";

const LevaShadows = ({ initialIntensity, onChange }) => {

    const {component} = useControls({[initialIntensity.name] : folder({
            component: {value: 1, min: 0, max: 10}
        }, {collapsed: true})
    });

    // useEffect(() => {
    //     if (onChange) {
    //         onChange({ component });
    //     }
    // }, [component, onChange]);

    return null;
};

export default LevaShadows;