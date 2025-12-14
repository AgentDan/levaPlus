import {Environment} from "@react-three/drei";

const Background = ({background}) => {

    return (
        <Environment
            files={background.file}
            background={true}
            environmentIntensity={background.intensity}
        />
    )

};

export default Background;
