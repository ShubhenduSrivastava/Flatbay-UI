    
import { createSlice } from '@reduxjs/toolkit';

import security from "../assets/security.png";
import ac from "../assets/ac.png";
import exercise from "../assets/exercise.png";
import fence from "../assets/fence.png";
import cylinder from "../assets/cylinder.png";
import nightlife from "../assets/nightlife.png";


const initialState = {
  personalDetails: {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
  },
  pricing: {
    deposit: '',
    rentPerMonth: '',
  },
  schedule: {
    availability: 'Weekend',
    scheduleFrom: '',
    scheduleTo: '',
    availableAllDay: false,
  },
  amenities: {
    security: { selected: false, uri: security },
    gym: { selected: false, uri: exercise },
    ac: { selected: false, uri: ac },
    playground: { selected: false, uri: fence },
    club: { selected: false, uri: nightlife },
    gas: { selected: false, uri: cylinder },
  },
  roommatePreferences: {
    gender: 'Other',
    maritalStatus: 'Any',
    occupation: 'Any',
    food: 'Any',
    pets: "Don't mind",
    smoking: "Don't mind",
    drinking: "Don't mind",
    partying: "Don't mind",
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updatePersonalDetails(state, action) {
      state.personalDetails = { ...state.personalDetails, ...action.payload };
    },
    updatePricing(state, action) {
      state.pricing = { ...state.pricing, ...action.payload };
    },
    updateSchedule(state, action) {
      state.schedule = { ...state.schedule, ...action.payload };
    },
    updateAmenities(state, action) {
      state.amenities = { ...state.amenities, ...action.payload };
    },
    updateRoommatePreferences(state, action) {
      state.roommatePreferences = { ...state.roommatePreferences, ...action.payload };
    },
  },
});

export const {
  updatePersonalDetails,
  updatePricing,
  updateSchedule,
  updateAmenities,
  updateRoommatePreferences,
} = formSlice.actions;

export default formSlice.reducer;
