import {Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";
import Header from "../Header.jsx";
import { toast } from 'react-toastify';

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const {setUser, user} = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post(`/a/login`, {email, password});
      setUser(data);
      toast.success('Success Notification !', {
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
          <h1 className="mb-4 text-4xl text-center">Admin Login</h1>
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
            <button className="primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
