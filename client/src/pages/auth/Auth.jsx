import { useSearchParams } from "react-router-dom";

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
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      <div
        className={`mx-auto flex min-h-[90vh] max-w-7xl overflow-hidden rounded-[40px] bg-white shadow-2xl transition-all duration-500 ${
          isLogin
            ? "flex-row"
            : "flex-row-reverse"
        }`}
      >

        {/* Form */}

        <div className="flex w-full items-center justify-center p-12 lg:w-1/2">

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