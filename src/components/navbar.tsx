import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <main className="p-4 space-x-2 bg-pink-500 flex flex-row items-end justify-end">
        <div className="px-20 space-x-5">
          <Link to="/">Home</Link>
          {!user ? (
            <Link to="/login">Sign In</Link>
          ) : (
            <Link to="/createpost">Create Post</Link>
          )}
        </div>

        {user && (
          <>
            <div className="flex flex-row">
              <img
                className="rounded-full h-10 "
                src={user?.photoURL || ""}
                alt=""
              />
              <div className="flex flex-col ">
                <p className="h-10">{user?.displayName}</p>
                <button
                  className="border-3 border-black bg-purple-950 p-1 rounded border-solid"
                  onClick={signUserOut}
                >
                  Log Out
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
