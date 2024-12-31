import React, { useEffect, useRef, useState } from "react";
import styles from "./mnemonic-area.module.scss";

const MnemonicArea = ({
  inputValues = {},
  changeValues = () => {},
  disabled = false,
  show = true,
  isPasswordMode = false,
}) => {
  const noOfWords = Object.entries(inputValues).length;

  const [inputTypes, setInputTypes] = useState(isPasswordMode ? Array(noOfWords).fill("password") : Array(noOfWords).fill("text"));

  useEffect(() => {
    setInputTypes(isPasswordMode ? Array(noOfWords).fill("password") : Array(noOfWords).fill("text"))
  }, [isPasswordMode])

  const handleFocus = (index) => {
    setInputTypes((prevTypes) => {
      const newTypes = [...prevTypes];
      newTypes[index] = "text";
      return newTypes;
    });
  };

  const handleBlur = (index) => {
    if (isPasswordMode) {
      setInputTypes((prevTypes) => {
        const newTypes = [...prevTypes];
        newTypes[index] = "password";
        return newTypes;
      });
    }
  };


  return (
    <div className={`${styles["mnemonic-area"]} my-24`}>
      {Object.entries(inputValues).map(([_, value], index) => {
        return (
          <input
            disabled={disabled}
            key={`mnemonic-input-box-${index}`}
            className={`fs-16 m-4 py-4 ${styles["input-box"]} ${
              show ? "" : styles.blur
            }`}
            id={`mnemonic-input-box-${index}`}
            value={value}
            onChange={(event) => changeValues(event, index)}
            placeholder={`${index + 1}`}
            type={inputTypes[index]}
            onBlur={() => handleBlur(index)}
            onFocus={() => handleFocus(index)}
          />
        );
      })}
    </div>
  );
};

export default MnemonicArea;
