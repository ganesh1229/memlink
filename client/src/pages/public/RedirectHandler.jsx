import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { resolveLink } from "../../services/link.service";

function RedirectHandler() {
  const { alias } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const response = await resolveLink(alias);

        const data = response.data;

        if (data.expired) {
          navigate("/expired");
          return;
        }

        if (data.passwordProtected) {
          navigate(`/password/${alias}`);
          return;
        }

        window.location.href = `http://localhost:5000/${alias}`;
      } catch (err) {
        console.error(err);

        navigate("/404");
      }
    };

    handleRedirect();
  }, [alias, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h2 className="text-xl font-semibold">
        Redirecting...
      </h2>
    </div>
  );
}

export default RedirectHandler;