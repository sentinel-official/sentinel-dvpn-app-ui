import { TranslationContext } from "@root/TranslationsProvider";
import { useContext } from "react";

const useTranslation = () => useContext(TranslationContext);
export default useTranslation;
