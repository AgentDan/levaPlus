import React, {useEffect} from 'react';
import {folder, useControls} from "leva";

const LevaFog = ({ initialIntensity, onChange }) => {

    const {color, min, max} = useControls({
        [initialIntensity.name ]: folder({
            color: { value: initialIntensity.args[0] },
            min: { value: initialIntensity.args[1], min: -5, max: 20, step: 0.01  },
            max: { value: initialIntensity.args[2], min: -5, max: 20, step: 0.01  }
        }, {collapsed: true})
    });

    useEffect(() => {
        if (onChange) {
            onChange({ args: [color, min, max] });
        }
    }, [color, min, max]);

    return null;
};

export default LevaFog;