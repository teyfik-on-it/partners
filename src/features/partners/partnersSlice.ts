import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getOffice, getPartners, Office, Partner } from "./partnerAPI";

export enum Status {
  Initial,
  Pending,
  Error,
  Idle,
}

export interface PartnersState {
  status: Status;
  error?: string;
  items?: Partner[];
  office?: Office;
}

const initialState: PartnersState = {
  status: Status.Initial,
};

export const fetchPartnersData = createAsyncThunk("partners/data", () =>
  Promise.all([getOffice(), getPartners()]).then(([office, partners]) => ({
    office,
    partners,
  })),
);

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPartnersData.pending, (state) => {
        state.status = Status.Pending;
      })
      .addCase(fetchPartnersData.fulfilled, (state, action) => {
        state.status = Status.Idle;
        state.office = action.payload.office;
        state.items = action.payload.partners;
      })
      .addCase(fetchPartnersData.rejected, (state, action) => {
        state.status = Status.Error;
        state.error = action.error.message ?? String(action.error);
      }),
});

export const selectOffice = (state: RootState) => state.partners.office;

export const selectPartners = (state: RootState) => state.partners;

export default partnersSlice.reducer;
