import { useControls, button } from "leva";

const LevaButton = ({ handleSave }) => {
    useControls({
        "Save": button(() => handleSave())
    });

    return null;
};

export default LevaButton;
