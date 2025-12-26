import { useControls, folder } from "leva";

const LevaBackground = ({ onChange, initialIntensity }) => {
    const { intensity } = useControls({
        [initialIntensity.name]: folder({
            intensity: {
                value: initialIntensity.intensity,
                min: 0,
                max: 1,
                step: 0.01,
                onChange: (v) => {
                    if (onChange) onChange({ intensity: v });
                }
            }
        }, { collapsed: true })
    });

    return null; // компонент не рендерит DOM
};

export default LevaBackground;
