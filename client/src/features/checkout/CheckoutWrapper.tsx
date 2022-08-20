import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckoutPage"

const stripePromise = loadStripe('pk_test_51LYmgbJIUFu73EzOx546WRIfYeYf6hYHdPH8zDHW39Jrm9ggJ7QjGLUrlyM2ojKl6fsF8vXr1qip1rSLlcafXKPp00xihbHd6L');

function CheckoutWrapper() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent />

  return (
    <Elements stripe={stripePromise}>
        <CheckoutPage />
    </Elements>
  )
}

export default CheckoutWrapper