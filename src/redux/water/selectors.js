// import { createSelector } from '@reduxjs/toolkit';
// import { selectNameFilter } from '../filters/selectors';

export const selectDailyWater = state => state.water.dailyWater;

export const selectMonthlyWater = state => state.water.monthlyWater;

export const selectWaterError = state => state.water.error;

export const selectWaterLoading = state => state.water.loading;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filter) =>
//     contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
// );
