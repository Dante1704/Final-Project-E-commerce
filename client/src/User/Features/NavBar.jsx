import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
// import MenuContainer from "../../Admin/container/MenuCotainer";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../Redux/Reducer/authSlice";
import { clearCart } from "../../Redux/Reducer/cartSlice";
import { ContainerLogIn } from "./ContainerLogIn";

export default function NavBar() {
  const cart = useSelector((state) => state.cart.quantity);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const auth = useSelector((state) => state.auth.auth);
  const admin = auth.isAdmin;

  return (
    <nav className="w-full bg-gray-900 flex flex-row justify-between gap-4 px-2">
      {auth.isAdmin === true ? (
        <>
          <div className="flex flex-row gap-4">
            {/* <MenuContainer /> */}
            <Link to="/home">
              <HomeIcon
                sx={{ fontSize: 45 }}
                className=" h-10 no-underline box-border bg-slate-900 text-slate-50 rounded flex p-2 justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900"
              ></HomeIcon>
            </Link>
            <SearchBar />
          </div>
          <div className="flex flex-row justify-end">
            <ContainerLogIn />
            <Link
              to="/cart"
              className="flex flex-row justify-center items-center"
            >
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cart} color="secondary">
                  <ShoppingCartIcon color="primary" />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* <MenuContainer /> */}
          <div className="flex flex-row gap-4">
            <Link to="/home">
              <HomeIcon
                sx={{ fontSize: 45 }}
                className=" h-10 no-underline box-border bg-slate-900 text-slate-50 rounded flex p-2 justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900"
              ></HomeIcon>
            </Link>
            <SearchBar />
          </div>

          {/* <button className=" h-10 no-underline box-border bg-slate-900 text-slate-50 rounded flex p-2 justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900">
            <Link to="/formRegister">Register</Link>
          </button> */}
          {/* <button className=" h-10 no-underline box-border bg-slate-900 text-slate-50 rounded flex p-2 justify-center items-center transition hover:bg-slate-50 hover:text-slate-900 hover:border-2 hover:border-slate-900">
            <Link to="/login">
              <LoginIcon /> Log In
            </Link>
          </button> */}
          <div className="flex flex-row justify-end mr-8">
            <ContainerLogIn />
            <Link to="/cart">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cart} color="secondary">
                  <ShoppingCartIcon color="primary" />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
