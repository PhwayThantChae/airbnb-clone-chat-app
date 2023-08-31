import { Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../pages/AddressLink";
import { UserContext } from "../UserContext";
import PlaceGallery from "../pages/PlaceGallery";
import BookingDates from "../pages/BookingDates";
import Header from "../Header";

export default function BookingPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState("");

  const messageOwner = async () => {
    console.log(booking, user);
    try {
      const res = await axios.post(`/api/conversations`, {
        senderId: user._id,
        receiverId: booking.place.owner,
      });
      console.log(res.data);
      setRedirect("/account/messages");
      // setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id && user) {
      if (user.userType === "admin") {
        axios.get("/a/bookings").then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      } else {
        axios.get("/bookings").then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      }
    }
  }, [id, user]);

  if (!booking) {
    return "";
  }

  function returnToBookings() {
    setRedirect("/account/bookings");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header />
      <div className="my-8">
        <div className="flex">
          <h1 className="text-2xl">{booking.place.title}</h1>
        </div>
        <div>
          <button
            onClick={returnToBookings}
            className="float-right px-4 py-2 text-white bg-primary w-fit rounded-2xl"
          >
            Go back
          </button>
        </div>

        <AddressLink className="block my-2">
          {booking.place.address}
        </AddressLink>
        <div className="flex flex-wrap justify-between p-6 my-6 bg-gray-200 rounded-2xl">
          <div className="mb-6">
            <h2 className="mb-4 text-2xl">Your booking information:</h2>
            <BookingDates booking={booking} />
            <div className="mt-4">
              <button
                onClick={messageOwner}
                className="flex items-center px-4 py-2 text-sm text-white rounded-lg bg-primary "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
                Message
              </button>
            </div>
          </div>
          <div className="self-center p-4 text-white bg-primary rounded-2xl">
            <div>Total price</div>
            <div className="text-3xl">${booking.price}</div>
          </div>
        </div>
        <PlaceGallery place={booking.place} />
      </div>
    </div>
  );
}
