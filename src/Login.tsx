import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import Dialog from "./Dialog";
import { supaClient } from "./supa-client";

export const setReturnPath = () => {
  localStorage.setItem("returnPath", window.location.pathname);
};

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");
  const { session } = useContext(UserContext);

  useEffect(() => {
    if (session?.user) {
      setShowModal(false);
    }
  }, [session]);

  return (
    <>
      <div className="flex m-4 place-items-center">
        <button
          className="rounded-3xl md:inline-block px-4 py-2 text-xl font-display text-black hover:text-white bg-white hover:bg-blue-400 drop-shadow-[6px_6px_0_black] hover:drop-shadow-[0_0_7px_rgba(168,85,247,0.5)] transition-all duration-300;"
          onClick={() => {
            setAuthMode("sign_in");
            setShowModal(true);
          }}
        >
          Login
        </button>{" "}
        <span className="p-2"> </span>{" "}
        <button
          className="rounded-3xl md:inline-block px-4 py-2 text-xl font-display text-black  hover:text-white bg-white hover:bg-blue-400 drop-shadow-[6px_6px_0_black] hover:drop-shadow-[0_0_7px_rgba(168,85,247,0.5)] transition-all duration-300;"
          onClick={() => {
            setAuthMode("sign_up");
            setShowModal(true);
            // window.prompt("Sorry, This is just a demo.");
          }}
        >
          Sign up
        </button>
      </div>
      <Dialog
        open={showModal}
        dialogStateChange={(open) => setShowModal(open)}
        contents={
          <>
            <Auth
              supabaseClient={supaClient}
              appearance={{
                theme: ThemeSupa,
              }}
              view={authMode}
              theme="dark"
            />
            <button onClick={() => setShowModal(false)}>Close</button>
          </>
        }
      />
    </>
  );
}
