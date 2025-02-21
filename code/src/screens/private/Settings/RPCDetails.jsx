import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./rpc-details.module.scss";
import { BTN_VARIANTS, Button, InputBox, Text } from "@components/index";
import { useUserSelector } from "@hooks/use-selector";
import { dispatchChangeCurrentRPC } from "@actions/user.actions";
import { useNavigate } from "react-router-dom";
import useRefetch from "@hooks/use-refetch";
import useOpenWindow from "@hooks/use-open-window";
import { links } from "@root/constants";

const RPCDetails = () => {
  const { openWindow } = useOpenWindow();
  const dispatch = useDispatch();
  const { rpc } = useUserSelector();
  const navigate = useNavigate();
  const [state, setState] = React.useState({ host: rpc.host, port: rpc.port });
  const refetch = useRefetch();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "rpc_details",
        canGoBack: true,
      })
    );
  }, []);

  React.useEffect(() => {
    setState({ host: rpc.host, port: rpc.port });
  }, [rpc.host, rpc.port]);

  const handleOnChange = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleChangeRPC = async () => {
    try {
      await dispatch(dispatchChangeCurrentRPC({ host: state.host, port: state.port }));
      const response = await refetch(true);
      if (response) {
        navigate(-2, { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <InputBox
          title="host"
          value={state.host}
          onChange={(event) => {
            handleOnChange("host", event.target.value || "");
          }}
        />
        <InputBox
          type="number"
          title="port"
          value={state.port}
          onChange={(event) => {
            handleOnChange("port", Number.parseInt(event.target.value) || "");
          }}
        />
        <section>
          <Text
            text={"rpc_list_link"}
            className="text-link"
            onClick={() => openWindow({ url: links.RPC_LIST_LINK })}
          />
        </section>
      </section>
      <section className={`${styles.btns} mb-36`}>
        <Button
          onClick={handleChangeRPC}
          className="mr-6"
          disabled={String(state.host).trim().length === 0 || String(state.port).trim().length === 0 || `${rpc.host}${rpc.port}` === `${state.host}${state.port}`}
        >
          <Text
            text={"save"}
            className="py-8"
          />
        </Button>
        <Button
          variant={BTN_VARIANTS.SECONDARY}
          className="ml-6"
          onClick={() => {
            setState({ host: rpc.host, port: rpc.port });
          }}
        >
          <Text
            text={"reset"}
            className="py-8"
          />
        </Button>
      </section>
    </div>
  );
};

export default RPCDetails;
