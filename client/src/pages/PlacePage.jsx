import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../pages/PlaceGallery";
import AddressLink from "./AddressLink";
import Header from "../Header";
import Perks from "./Perks";
import ReviewForm from "./review/ReviewForm";
import Review from './review/Review';
import {UserContext} from "../UserContext";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const {user} = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [perks, setPerks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get("/api/reviews/" + id);
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReviews();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
      setPerks(response.data.perks);
    });
  }, [id]);

  if (!place) {
    return "";
  }

  async function submitReview(content) {
    if(content) {
      try {
        const response = await axios.post("/api/reviews", {
          place: id,
          content: content
        });
        console.log(response.data);
        setReviews([...reviews, response.data]);
      } catch(err) {
        console.log(err);
      }
    }
  }

  function returnToIndex() {
    setRedirect("/");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header />
      <div className="mt-2">
        <button
          onClick={returnToIndex}
          className="float-right px-4 py-2 text-white bg-primary w-fit rounded-2xl"
        >
          Go back
        </button>
      </div>
      <div className="px-2 pt-2 ">
        <div className="">
          <h2 className="text-3xl border-b">{place.title}</h2>
        </div>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="mt-6">
          <Link
            className="px-4 py-2 text-white bg-primary rounded-2xl"
            to={"/profile/" + place.owner}
          >
            See more properties from this owner
          </Link>
        </div>

        <div className="mt-4 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="text-2xl font-semibold">Description</h2>
              {place.description}
            </div>
            <p className="pt-4 border-t">
              <span className="p-2 font-semibold">Check-in:</span>{" "}
              {place.checkIn}
              <span className="p-2 font-semibold ms-8">Check-out:</span>{" "}
              {place.checkOut}
              <br />
              <span className="p-2 font-semibold">
                Maximum Number of Guests:
              </span>{" "}
              {place.maxGuests}
            </p>
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t md:grid-cols-3">
              <Perks selected={perks} onChange={setPerks} />
            </div>
          </div>
          <div className="border-t">
            <div>
              <h2 className="mt-2 text-2xl font-semibold">Extra Info</h2>
            </div>
            <div className="mt-2 mb-4 text-sm leading-5 text-gray-700">
              {place.extraInfo}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="">
          <h2 className="mb-4 text-2xl font-semibold">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Review
                key={index}
                review={review}
              /> )
            )
          ) : (
            <span className="flex items-center justify-center p-10 font-medium text-center text-gray-400 border-2 rounded-lg shadow-sm ">No reviews yet.</span>
          )}

        </div>
        <div className="">
        {user && user.userType === 'user' && (
          <ReviewForm placeId={id} submitReview={submitReview} />
        )}
        </div>
      </div>
    </div>
  );
}
