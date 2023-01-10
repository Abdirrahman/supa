import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";
import Login from "./Login";
export default function MessageBoard() {
  const userProfile = useContext(UserContext);
  return (
    <div className="flex flex-col w-full place-content-center">
      <Link
        className="hover:scale-125 transition hover:drop-shadow-[0_0_9px_rgba(31,179,242,0.99)] "
        to="/1"
      >
        <h2 className="mb-1 text-5xl text-center">Message Board</h2>
      </Link>
      {userProfile.session ? (
        <></>
      ) : (
        <h2
          className="flex justify-center m-6 text-center place-items-center"
          data-e2e="message-board-login"
        >
          You have to log in first. <Login />
        </h2>
      )}
      <Outlet />
    </div>
  );
}
