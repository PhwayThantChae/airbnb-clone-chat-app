import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";
import Header from "../Header";
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const {setUser, user} = useContext(UserContext);
  const [userType, setUserType] = useState("user");

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post(`/login/${userType}`, {email, password});
      setUser(data);
      toast.success('Login Successful', {
        position: toast.POSITION.TOP_CENTER
      });
      setRedirect(true);
    } catch (e) {
      toast.error('Login Failed', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  if (user) {
    return <Navigate to={"/"}/>;
  }

  if (redirect) {
    return <Navigate to={"/"}/>;
  }

  return (
      <div className="flex flex-col min-h-screen px-8 py-4">
        <Header/>

        <div className="flex items-center justify-around mt-4 grow">
          <div className="mb-64">
            <h1 className="mb-4 text-4xl text-center">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  required
                  onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                  type="password"
                  placeholder="password"
                  value={password}
                  required
                  onChange={(ev) => setPassword(ev.target.value)}
              />
              <select onChange={(ev) => setUserType(ev.target.value)} required>
                <option value="user">User</option>
                <option value="business">Business Owner</option>
              </select>
              <button className="primary">Login</button>
              <div className="py-2 text-center text-gray-500">
                Don't have an account yet?{" "}
                <Link className="text-black underline" to={"/register"}>
                  Register now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
