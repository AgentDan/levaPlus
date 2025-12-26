import React, {useCallback, useEffect, useMemo, useState} from 'react';
import EnvLight from "./EnvLight.jsx";
import Background from "./Background.jsx";
import Fog from "./Fog.jsx";
import EnvToneMapping from "./EnvToneMapping.jsx";
import EnvShadows from "./EnvSchadows.jsx";
import EnvEffectComposer from "./EnvEffectComposer.jsx";
import EnvDescription from "./EnvDescription.jsx";

const Env = ({env}) => {

    const [clickDescript, setClickDescript] = useState(null);

    const handleClickDescription = useCallback((name) => {
        setClickDescript(prev =>
            prev === name ? null : name
        );
    }, []);

    return (
        <>
            {env.map((item) => {
                switch (item.type) {
                    case "background":
                        return <Background background={item}/>;
                    case "spotlight":
                        return <EnvLight lights={[item]}/>;
                    case "fog":
                        return <Fog fog={item}/>;
                    case "EnvToneMapping":
                        return <EnvToneMapping fog={item}/>;
                    case "EnvShadows":
                        return <EnvShadows fog={item}/>;
                    case "EnvEffectComposer":
                        return <EnvEffectComposer fog={item}/>;
                    case "description":
                        return <EnvDescription
                            item={item}
                            clickDescript={clickDescript === item.name}
                            handleClickDescription={handleClickDescription}
                        />;
                    default:
                        return null;
                }
            })}
        </>
    );

};

export default Env;