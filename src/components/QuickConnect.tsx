import React from "react";
import Icon from "../assets/icons/quick-connect-icon.svg";

const QuickConnect = ({
  onClick = () => {},
  disabled = false,
  title = null,
}: {
  disabled?: boolean;
  onClick?: any;
  title?: string | null;
}) => {
  return (
    <button
      className="button primary gap-8"
      onClick={onClick}
      disabled={disabled}
    >
      <img src={Icon} alt="" />
      {title}
    </button>
  );
};

export default QuickConnect;
