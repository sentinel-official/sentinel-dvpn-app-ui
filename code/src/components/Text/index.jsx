import useTranslation from "@hooks/use-translation";
import React from "react";

const Text = ({ text, data, htmlFor, ...rest }) => {
  const { translate } = useTranslation();
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} {...rest}>
        {translate(text, data)}
      </label>
    );
  }
  return <span {...rest}>{translate(text, data)}</span>;
};

export default Text;
