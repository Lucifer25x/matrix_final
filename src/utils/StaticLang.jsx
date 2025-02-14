import { useContext } from 'react';
import { LangContext } from '../context/LangContext';

// This component is used to display static text in the correct language
const StaticLang = ({ az, en }) => {
    const { lang } = useContext(LangContext);

    return (
        <>
            {lang === "AZ" ? az : en}
        </>
    )
}

export default StaticLang