import { createSlice } from "@reduxjs/toolkit";

const utilitySlice = createSlice({
  name: "utility",
  initialState: {
    radioValue: '1',
    showList: false,
    showLeftMenu: false
  },
  reducers: {
    changeList: {
      reducer: (state, { payload }) => {
        state.radioValue = payload.value;
        state.showList = payload.showList;
      },
    },
    toggleLeftMenu: { 
      reducer: (state, {payload}) => {
        console.log(payload);
        state.showLeftMenu = payload;
      },
    },
  },
});

export const { changeList, toggleLeftMenu } = utilitySlice.actions;
export default utilitySlice.reducer;