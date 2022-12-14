import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/reducers';

import { LandingState } from './types';

const initialState: LandingState = {
  isStartAnimation: true,
  activeNav: 0,
  isHover: false,
  landingMouseRef: undefined,
  cursorRef: undefined,
};

export const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    /** CLAIM **/
    setActiveNav: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        activeNav: action.payload,
      };
    },
    startAnimation: (state) => {
      return {
        ...state,
        isStartAnimation: true,
      };
    },
    // @ts-ignore
    setLandingMouseRefRef: (state, action: PayloadAction<HTMLElement>) => {
      return {
        ...state,
        landingMouseRef: action.payload,
      };
    },
    // @ts-ignore
    setCursorRef: (state, action: PayloadAction<HTMLElement>) => {
      return {
        ...state,
        cursorRef: action.payload,
      };
    },
    setSpeedFunction: (state, action: PayloadAction<(number, boolean) => void>) => {
      return {
        ...state,
        setSpeed: action.payload,
      };
    },
    clear: () => initialState,
  },
  extraReducers: {},
});

export const landingActions = {
  /** CLAIM ACTIONS **/
  ...landingSlice.actions,
};

export const landingSelectors = {
  /** CLAIM SELECTORS **/
  landing: (state: RootState): LandingState => state.landing,
};
