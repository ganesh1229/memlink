import {
  Link,
  useSearchParams,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import AuthSidePanel from "../../components/auth/AuthSidePanel";

function Auth() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const isLogin =
    searchParams.get("mode") !== "register";

  const switchMode = () => {
    setSearchParams({
      mode: isLogin ? "register" : "login",
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 px-4 py-6">

      {/* Back to Home */}

      <Link
        to="/"
        className="absolute left-8 top-8 z-10 flex items-center gap-2 rounded-xl px-4 py-2 text-slate-600 transition-all hover:bg-white hover:text-blue-600 hover:shadow-md"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">
          Memlink
        </span>
      </Link>

      <div
        className={`mx-auto flex min-h-[80vh] max-w-5xl overflow-hidden rounded-[40px] bg-white shadow-2xl transition-all duration-500 ${
          isLogin
            ? "flex-row"
            : "flex-row-reverse"
        }`}
      >

        {/* Form */}

        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          {isLogin ? (
            <LoginForm switchMode={switchMode} />
          ) : (
            <RegisterForm switchMode={switchMode} />
          )}
        </div>

        {/* Side Panel */}

        <div className="hidden lg:block lg:w-1/2">
          <AuthSidePanel />
        </div>

      </div>

    </div>
  );
}

export default Auth;