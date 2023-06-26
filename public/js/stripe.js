import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51NM5yOSD1Ml9QFR4oHaDlGYBQjEvwQ8NljJ7ZbsIrLRaMSaqv07SvyvubIE6NAVOKlt8l45iRYvM6eqQzlf0GE6i00UIHZH6hA"
);

export const bookTour = async (tourId) => {
  try {
    // 1] Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2] Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert("error", error);
  }
};
