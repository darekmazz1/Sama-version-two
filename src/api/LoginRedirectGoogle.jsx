import { useEffect } from "react";
import { ULR_BACKEND } from "./ApiGetInformation";
import Loader from "../components/general/Loader";

export default function LoginRedirectGoogle() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("access_token");

    fetch(`${ULR_BACKEND}auth/google/callback?access_token=${accessToken}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("user", JSON.stringify(res.user));

        const user = res.user;
        const isNewUser = user.createdAt && (Date.now() - new Date(user.createdAt).getTime()) < 120000;

        if (isNewUser) {
          const parts = (user.username || "").trim().split(" ");
          const firstName = user.first_name || parts[0] || "";
          const lastName = user.last_name || parts.slice(1).join(" ") || "";

          fetch(`${ULR_BACKEND}neon-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email: user.email }),
          }).catch(() => {});
        }

        setTimeout(() => (window.location.href = "/"), 100);
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/login?error=this email is already used";
      });
  }, []);

  return (
    <div className='w-full min-h-screen bg-dark_blue'>
      <Loader />
    </div>
  );
}
