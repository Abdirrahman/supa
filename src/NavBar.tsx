import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import Login from "./Login";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { session } = useContext(UserContext);

  return (
    <>
      <nav className="flex justify-between w-full p-6 px-3 mx-auto max-w-screen-2xl md:px-8 md:p-8 text-gray1 ">
        <Link
          className="flex items-center justify-center invisible text-center md:visible"
          to="/"
        >
          {/* <img
            id="logo"
            className=" hover:scale-125 transition hover:drop-shadow-[0_0_9px_rgba(34,197,94,0.9)] w-0 md:w-64 mt-4"
            src="https://supaship.io/supaship_logo_with_text.svg"
            alt="logo"
          /> */}
          <h1 className="text-2xl hover:scale-125 transition hover:drop-shadow-[0_0_9px_rgba(31,179,242,0.99)] w-0 md:w-64 mt-4">
            {" "}
            Home
          </h1>
        </Link>

        <ul className="flex items-center justify-center ">
          <li className="mx-2 transition-transform md:mx-4 hover:scale-105"></li>
          <li className="">{session?.user ? <UserMenu /> : <Login />}</li>
        </ul>
      </nav>
    </>
  );
}
