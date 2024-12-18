import { ALERT_TYPES } from "@hooks/use-alerts";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import { START_LOADER, STOP_LOADER } from "@reducers/loader.reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCT_IDENTIFIER } from "@root/constants";
import paymentServices from "@services/payment.services";

export const dispatchPaymentLogin = createAsyncThunk(
  "PAYMENST/LOGIN",
  async (address, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      await paymentServices.setup();
      await paymentServices.login({ address });
      const response = await paymentServices.fetchProducts();
      if (response.identifier === PRODUCT_IDENTIFIER) {
        return fulfillWithValue(response.packages);
      }
      return fulfillWithValue([]);
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_products`,
          data: { error: e.message },
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchBuyProduct = createAsyncThunk(
  "PAYMENTS/BUY_PRODUCT",
  async (product, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        START_LOADER({
          message: `adding_balance`,
          description: "please_autorize_transaction",
        })
      );
      const response = await paymentServices.buyProduct(product);
      if (response.isCancelled) {
        return fulfillWithValue();
      }
      return fulfillWithValue({ transaction: response.transaction });
    } catch (e) {
      if (e.name === "AxiosError") {
        return rejectWithValue();
      }
      return rejectWithValue();
    } finally {
      dispatch(STOP_LOADER());
    }
  }
);
