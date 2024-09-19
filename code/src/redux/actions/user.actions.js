import { getMobileOS } from "@helpers/getOSType";
import { filterPlan, filterSubscription } from "@helpers/parse.data";
import { isVersionGreater } from "@helpers/versionChecks";
import { ALERT_TYPES } from "@hooks/use-alerts";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import { CHANGE_MESSAGE, START_LOADER, STOP_LOADER } from "@reducers/loader.reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS_ACTIVE } from "@root/constants";
import settingsServices from "@services/settings.services";
import userServices from "@services/user.services";
import { getTxDetails } from "../helpers/getTxDetails";

export const dispatchFetchApplicationVersion = createAsyncThunk("USER/CHECK_APPLICATION_VERSION", async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    dispatch(
      CHANGE_MESSAGE({
        message: "checking_version",
        description: "may_take_upto_30_secs",
      })
    );
    const os = getMobileOS();
    const response = await userServices.fetchApplicationVersion();
    const resp = await userServices.fetchLatestAppVersion();

    const latestVersion = resp.data[os];
    const isLatestAvailable = isVersionGreater(response.version, latestVersion);
    return fulfillWithValue({
      version: response.version,
      latestVersion,
      isLatestAvailable,
    });
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_while_checking_version`,
      })
    );
    return rejectWithValue();
  }
});

export const dispatchFetchAvailablePlans = createAsyncThunk("USER/FETCH_AVAILABLE_PLANS", async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    const response = await userServices.fetchAvailablePlans();
    const plan = filterPlan(response);
    if (plan && plan.status === STATUS_ACTIVE) {
      return fulfillWithValue(plan);
    }
    return rejectWithValue();
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_fetching_plans`,
      })
    );
    return rejectWithValue();
  }
});

export const dispatchFetchAvailableSubscriptions = createAsyncThunk(
  "USER/FETCH_AVAILABLE_SUBSCRIPTIONS",
  async (walletAddress, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await userServices.fetchUserSubScriptions(walletAddress);
      const subscription = filterSubscription(response.planSubscriptions);
      return fulfillWithValue(subscription);
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_subscriptions`,
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchFetchCurrentRPC = createAsyncThunk("USER/FETCH_CURRENT_RPC", async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    const response = await settingsServices.fetchCurrnetRPC();
    return fulfillWithValue(response);
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_fetching_current_rpc`,
        data: { error: e.message },
      })
    );
    return rejectWithValue();
  }
});

export const dispatchFetchCurrentDNS = createAsyncThunk("USER/FETCH_CURRENT_DNS", async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    const response = await settingsServices.fetchCurrentDNS();
    return fulfillWithValue(response);
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_fetching_current_dns`,
        data: { error: e.message },
      })
    );
    return rejectWithValue();
  }
});

export const dispatchChangeCurrentRPC = createAsyncThunk("USER/FETCH_CURRENT_RPC", async ({ host, port }, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    dispatch(
      START_LOADER({
        message: `changing_rpc_loader`,
      })
    );
    await settingsServices.changeCurrnetRPC({ host, port });
    const response = await settingsServices.fetchCurrnetRPC();
    return fulfillWithValue(response);
  } catch (e) {
    console.log(e);
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_changing_current_rpc`,
        data: { error: e.message },
      })
    );
    return rejectWithValue();
  } finally {
    dispatch(STOP_LOADER());
  }
});

export const dispatchCreateNewSubscription = createAsyncThunk("USER/CREATE_NEW_SUBSCRIPTION", async (payload, { fulfillWithValue, rejectWithValue, dispatch, getState }) => {
  try {
    const feeGrantEnabled = getState().settings.feeGrantEnabled;
    const response = await userServices.createNewSubscription(payload, feeGrantEnabled);
    if (response.code) {
      if (["5", 5].includes(response.code)) {
        throw { reason: "failed_create_subscription_no_balance" };
      }
      if (!["0", 0].includes(response.code)) {
        throw {
          reason: "failed_create_subscription_for",
          data: { code: response.code },
        };
      }
    }
    const details = await getTxDetails(response.txhash);
    let code = details.code;
    if (code) {
      if (["5", 5].includes(code)) {
        throw { reason: "failed_create_subscription_no_balance" };
      }
      if (!["0", 0].includes(code)) {
        throw {
          reason: "failed_create_subscription_for",
          data: { code },
        };
      }
    }
    return fulfillWithValue(true);
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: e.reason || "failed_create_subscription",
        data: e.data || {},
      })
    );
    return rejectWithValue(false);
  }
});
