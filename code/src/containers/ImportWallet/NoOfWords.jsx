import React from "react";
import styles from "./styles.module.scss";
import { BTN_VARIANTS, Button, Image, Text } from "@components/index";
import EyeIcon from '@svgs/eye.svg'
import EyeCrossIcon from '@svgs/eye-cross.svg'

const NoOfWords = ({ noOfWords = 24, changeNoOfWords = () => {}, isPasswordMode=true, onChangeIsPasswordMode=()=>{} }) => {
  return (
    <div className={`${styles["no-of-words"]} p-8`}>
      <Text
        className={`fs-14 fw-6 ${
          noOfWords === 24 ? "text-link" : "text - ffffff"
        }`}
        text={"no_of_words"}
        data={{ noOfWords: 24 }}
        onClick={() => {
          changeNoOfWords(24);
        }}
      />
      <Text
        className={`fs-14 fw-6 ${
          noOfWords === 12 ? "text-link" : "text - ffffff"
        }`}
        text={"no_of_words"}
        data={{ noOfWords: 12 }}
        onClick={() => {
          changeNoOfWords(12);
        }}
      />
      <Button variant={BTN_VARIANTS.TRANSPARENT} onClick={onChangeIsPasswordMode}>
        <Image src={isPasswordMode ? EyeIcon: EyeCrossIcon}/>
      </Button>
    </div>
  );
};

export default NoOfWords;
