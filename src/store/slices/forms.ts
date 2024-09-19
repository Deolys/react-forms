import { countryNames } from '@/constants/countries';
import { UserSchema } from '@/models/user';
import { createSlice } from '@reduxjs/toolkit';

export type IForm = Omit<UserSchema, 'profileImage'> & {
  profileImage: string;
};

interface initialStateProps {
  countries: string[];
  forms: IForm[];
}

const initialState: initialStateProps = {
  countries: countryNames,
  forms: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action) => {
      state.forms.unshift(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;
export const { reducer: formsReducer } = formsSlice;
