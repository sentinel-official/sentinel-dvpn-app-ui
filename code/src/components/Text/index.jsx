import useTranslation from "@hooks/use-translation";
import React from "react";

const Text = ({ text, data, htmlFor, forceHTML=false, ...rest }) => {
  const { translate } = useTranslation();
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} {...rest}>
        {translate(text, data)}
      </label>
    );
  }
  if (forceHTML) {
    return <span
        {...rest}
        dangerouslySetInnerHTML={{ __html: translate(text, data) }}
      />
  }
  return <span {...rest}>{translate(text, data)}</span>;
};

export default Text;
