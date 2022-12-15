import React, {useMemo, useState} from 'react';
import style from './LanguageSwitcher.module.scss'
import {LANGUAGES} from "../../../constants";
import i18n from '../../../i18n'
import {withTranslation} from "react-i18next";

const LanguageSwitcherSelector = ({handleChangeLanguage, lang}) => {

    const options = useMemo(() => {
        return LANGUAGES.map(language => {
            if (language.code !== lang) {
                return <li onClick={() => handleChangeLanguage(language.code)} key={language.code}>
                         < div value={language.code} className={style[language.code]}/>
                       </li>
            }
        });
    }, [lang])

    return (
        <div className={style.lang}>
            <div
                className={style[lang]}
            >
            </div>
            <ul className={style.dropdown}>
                {options}
            </ul>
        </div>
    );
};

const LanguageSwitcher = () => {
    const [lang, setLang] = useState('en')

    const changeLanguageHandler = (lang) => {
        console.log('yo', lang)
        setLang(lang)
        i18n.changeLanguage(lang);
    }
    return (
        <LanguageSwitcherSelector
            lang={lang}
            handleChangeLanguage={changeLanguageHandler}
        />
    )
}

export default withTranslation()(LanguageSwitcher);
