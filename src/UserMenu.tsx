import { useContext } from "react";
import { UserContext } from "./App";
import { supaClient } from "./supa-client";

export default function UserMenu() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <div className="md:inline-block px-4 py-2 text-xl font-display text-black hover:text-white bg-white hover:bg-blue-400 drop-shadow-[6px_6px_0_black] hover:drop-shadow-[0_0_7px_rgba(168,85,247,0.5)] transition-all duration-300;">
        <h2>Welcome {profile?.username || "Nobody"}.</h2>
        <button onClick={() => supaClient.auth.signOut()}>Logout</button>
      </div>
    </>
  );
}
