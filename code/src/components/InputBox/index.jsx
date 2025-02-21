import React from "react";
import styles from "./input-box.module.scss";
import { Image, Text } from "..";
import useTranslation from "@hooks/use-translation";
import MagnifierIcon from "@svgs/magnifier-icon.svg";

const InputBox = ({
  type = "text",
  value = "",
  title = "",
  onChange = () => {},
  id = Math.random(),
  disabled = false,
  isLabel = true,
  isIcon = false,
  className = "",
  isPlaceHolder = true,
}) => {
  const { translate } = useTranslation();
  return (
    <div className={`${styles.root} ${className} mb-24`}>
      {isLabel && (
        <label htmlFor={`${id}`}>
          <Text text={title} className="text-dadada fs-12 fw-5" />
        </label>
      )}

      <section className={styles.box}>
        {isIcon && (
          <Image
            src={MagnifierIcon}
            className={`${styles["mag-icon"]} ml-6 mr-2`}
          />
        )}
        <input
          className={`${styles.input} fs-14 fw-5 px-8 mt-2 text-ffffff`}
          type={type}
          id={`${id}`}
          onChange={onChange}
          value={value}
          placeholder={isPlaceHolder ? translate(title) : ""}
          disabled={disabled}
        />
      </section>
    </div>
  );
};

export default InputBox;
