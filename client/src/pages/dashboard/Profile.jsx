import { useEffect, useState } from "react";
import { Mail, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getProfile } from "../../services/profile.service";

function Profile() {
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
    }catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  const name = profile.email
    .split("@")[0]
    .replace(/[._-]/g, " ");

  return (
    <div className="mx-auto max-w-xl">

      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

        <div className="flex flex-col items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">

            {name.charAt(0).toUpperCase()}

          </div>

          <h2 className="mt-5 text-3xl font-bold capitalize">
            {name}
          </h2>

          <p className="mt-1 text-slate-500">
            {profile.email}
          </p>

        </div>

        <div className="mt-10 space-y-6">

          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

            <Mail
              className="text-blue-600"
              size={22}
            />

            <div>

              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="font-medium">
                {profile.email}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">

            <Calendar
              className="text-blue-600"
              size={22}
            />

            <div>

              <p className="text-sm text-slate-500">
                Member Since
              </p>

              <p className="font-medium">
                {new Date(
                  profile.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

            </div>

          </div>

        </div>

        <button
          onClick={logout}
          className="mt-10 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;