import React from "react";
import styles from "./logout.module.scss";

import CheckIcon from "@svgs/checkbox-icon.svg";
import { BTN_VARIANTS, Button, Text } from "@components/index";
import useAuth from "@hooks/use-auth";
import useModal from "@hooks/use-modal";

const LogoutModal = () => {
  const { logout } = useAuth();
  const { hideModal } = useModal();
  const [isUserSavedKey, setIsUserSavedKey] = React.useState(false);

  return (
    <div className={`${styles.root} p-24`}>
      <Text
        text={"logout_title"}
        className="fs-22 fw-5 mb-24"
      />
      <Text
        text={"logout_desc"}
        className="fs-14 fw-4 text-9cabc9 mb-24"
      />
      <label className={`${styles.confirmation} text-9cabc9`}>
        <input
          type="checkbox"
          checked={isUserSavedKey}
          onChange={() => {
            setIsUserSavedKey(!isUserSavedKey);
          }}
        />
        <div className={`${styles["check-box"]}`}>
          {isUserSavedKey && (
            <img
              src={CheckIcon}
              alt=""
            />
          )}
        </div>
        <Text
          text={"logout_checkbox_label"}
          className="fs-14 fw-4 text-e0e4ea ml-8"
        />
      </label>
      <Button
        onClick={hideModal}
        className="mt-24 mb-14"
      >
        <Text
          text={"cancel"}
          className="py-12"
        />
      </Button>
      <Button
        onClick={logout}
        disabled={!isUserSavedKey}
        variant={BTN_VARIANTS.SECONDARY}
      >
        <Text
          text={"logout"}
          className="py-12 text-ff0000"
        />
      </Button>
    </div>
  );
};

export default LogoutModal;
