import { createSlice } from "@reduxjs/toolkit";

const utilitySlice = createSlice({
  name: "utility",
  initialState: {
    radioValue: '1',
    showList: false,
  },
  reducers: {
    changeList: {
      reducer: (state, { payload }) => {
        state.radioValue = payload.value;
        state.showList = payload.showList;
      },
    },
  },
});

export const { changeList } = utilitySlice.actions;
export default utilitySlice.reducer;