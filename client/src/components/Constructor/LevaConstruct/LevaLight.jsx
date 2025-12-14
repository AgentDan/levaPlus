import { useControls, folder } from "leva";
import { useEffect } from "react";

const LevaLight = ({ initialIntensity, onChange }) => {
    const { intensity, onoff, visible, x, y, z, xTarget, yTarget, zTarget } = useControls({
        [initialIntensity.name]: folder(
            {
                intensity: { value: initialIntensity.intensity, min: 0, max: 20, step: 0.01 },
                onoff: { value: initialIntensity.onoff },
                visible: { value: initialIntensity.visible },
                x: { value: initialIntensity.position[0], min: -5, max: 5, step: 0.001 },
                y: { value: initialIntensity.position[1], min: -5, max: 5, step: 0.001 },
                z: { value: initialIntensity.position[2], min: -5, max: 5, step: 0.001 },
                xTarget: { value: initialIntensity.target[0], min: -5, max: 5, step: 0.001 },
                yTarget: { value: initialIntensity.target[1], min: -5, max: 5, step: 0.001 },
                zTarget: { value: initialIntensity.target[2], min: -5, max: 5, step: 0.001 },
            },
            { collapsed: true } // ✅ свёрнуто по умолчанию
        ),
    });

    useEffect(() => {
        onChange({
            intensity,
            onoff,
            visible,
            position: [x, y, z],
            target: [xTarget, yTarget, zTarget],
        });
    }, [intensity, onoff, visible, x, y, z, xTarget, yTarget, zTarget]);

    return null;
};

export default LevaLight;
