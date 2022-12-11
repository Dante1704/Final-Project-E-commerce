import React, { useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/Reducer/cartSlice";
import NavBar from "../User/Features/NavBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CheckoutStructure from "./CheckoutStructure";
import { Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAllusers, getByIdUser } from "../Redux/Reducer/Users";

export default function checkoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.auth.token);
  const auth = useSelector((state) => state.auth.auth);
  const user = useSelector((state) => state.users.userId);

  const totalCart = useSelector((state) => state.cart.total);
  console.log("array de productos", cart.products);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post(
        `http://localhost:3001/checkout/checkout`,
        {
          id,
          amount: totalCart * 100,
        }
      );
      //creando la orden en el back-end
      const products = cart.products;
      const products_quantity = cart.quantity;
      const total = cart.total;
      const status = cart.status;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          `http://localhost:3001/order/newOrder`,
          {
            products,
            products_quantity,
            total,
            status,
          },
          config
        )
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error.message));

      swal({
        title: "Payment succeful",
        text: "Thanks your for your bought!",
        icon: "success",
        button: "Ok",
      });
      navigate("/home");
    } else {
      return swal({
        title: "Payment denied!",
        text: "Please, check your credit card information!",
        icon: "warning",
        button: "Let me see",
      });
    }
    const idUser = auth.id;
    dispatch(clearCart(idUser));
  };

  useEffect(() => {
    dispatch(getAllusers());
    dispatch(getByIdUser(user.id));
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Link to="/cart">
        <div
          className="flex items-center text-gray-500 hover:text-gray-600 dark:text-black cursor-pointer"
          // onclick="checkoutHandler(false)"
        >
          <ArrowBackIcon />
          <p className="text-sm pl-2 leading-none dark:hover:text-gray-200">
            back to cart
          </p>
        </div>
      </Link>
      <Container className="border border-red-900">
        {/* <div className="col-span-3 items-center">
          <form onSubmit={handleSubmit}>
            <CardElement />
            <p> ${totalCart}</p>
            
          </form>
        </div> */}
        <Stack spacing={3}>
          <CheckoutStructure
            first_name={user.first_name}
            address={user.address}
            phoneNumber={user.phoneNumber}
            profileImage={user.profileImage}
            last_name={user.last_name}
            email={user.email}
          />
          <form onSubmit={handleSubmit} className="text-center">
            <CardElement />
            <Button type="submit" variant="contained">
              To buy
            </Button>
          </form>
        </Stack>
      </Container>
    </div>
  );
}
