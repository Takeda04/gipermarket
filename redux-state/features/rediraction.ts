import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Prop {
  loginPaths?:string;
  userPhone:string;
  userCode:string;
  userSpecialOrder?:boolean
}

const initialState:Prop = {
  loginPaths:"",
  userPhone:"",
  userCode:"",
  userSpecialOrder:false,
}

const rediractionSlice =  createSlice({
  name:"rediraction",
  initialState,
  reducers:{
    setLoginpath:(state,action:PayloadAction<Prop>)=> {

      state.loginPaths = action.payload.loginPaths;
    },
    setPhone:(state,action:PayloadAction<Prop>)=> {
      state.userPhone = action.payload.userPhone;
    },
    setCode:(state,action:PayloadAction<Prop>)=> {
      state.userCode = action.payload.userCode;
    },
    setSpecialOrder:(state,action:PayloadAction<Prop>)=> {
      state.userSpecialOrder = action.payload.userSpecialOrder;
    },
  }
})

export const {setLoginpath,setPhone,setCode,setSpecialOrder} = rediractionSlice.actions;

export default rediractionSlice.reducer;