import { createSlice } from "@reduxjs/toolkit";

const utilitySlice = createSlice({
  name: "utility",
  initialState: {
    radioValue: '1',
    showList: false,
    showLeftMenu: false,
    scrollPositionKitchen: 0,
    scrollPositionBar: 0,
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
        state.showLeftMenu = payload;
      },
    },
    handleScrollPositionKitchen: { 
      reducer: (state, {payload}) => {
        state.scrollPositionKitchen = payload;
      },
    },
    handleScrollPositionBar: { 
      reducer: (state, {payload}) => {
        state.scrollPositionBar = payload;
      },
    },
  },
});

export const { changeList, toggleLeftMenu, handleScrollPositionKitchen, handleScrollPositionBar } = utilitySlice.actions;
export default utilitySlice.reducer;