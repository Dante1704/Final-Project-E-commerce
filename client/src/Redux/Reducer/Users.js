import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  adminUser: [],
  userId: {},
  loading: false,
  error: "",
};

export const getAllusers = createAsyncThunk(
  "getAllusers/getAllusers",
  async () => {
    return await fetch(`http://localhost:3001/user/allUsers`).then((response) =>
      response.json()
    );
  }
);

export const updateUser = createAsyncThunk(
  "updateUser/updateUser",
  async (id, input) => {
    console.log(id);
    return axios
      .put(`http://localhost:3001/user/update/${id}`, input)
      .then((response) => {
        const respuesta = response;
        console.log(`put user response => ${respuesta}`);
      });
  }
);
export const getByIdUser = createAsyncThunk(
  "getByIdUser/getByIdUser",
  async (id) => {
    console.log("id en reducer", id);
    return await fetch(`http://localhost:3001/user/${id}`).then((respuesta) =>
      respuesta.json()
    );
  }
);
export const deleteUserId = createAsyncThunk(
  "deleteUserId/deleteUserId",
  async (id) => {
    console.log("idreducer", id);
    return await axios.put(`http://localhost:3001/user/delete/${id}`);
  }
);

/* export const googleAuth = createAsyncThunk(
  "googleAuth/googleAuth",
  async (credentials) => {
    return await axios
      .post(`http://localhost:3001/logIn/googleLogin`, credentials)
      .then((response) => response.data);
  }
); */

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //!getbyid
    builder.addCase(getByIdUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userId = action.payload;
      state.error = "";
      console.log("userId", state.userId);
    });
    builder.addCase(getAllusers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllusers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
      state.error = "";
    });
    builder.addCase(getAllusers.rejected, (state, action) => {
      state.loading = false;
      state.allUsers = [];
      state.error = action.error.message;
    });
    /*  builder.addCase(googleAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
      state.error = "";
    });
    builder.addCase(googleAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }); */
  },
});

export default usersSlice.reducer;
