import { useEffect } from "react";
import { Spinner } from "../../../../components/Spinner";
import { loginDirect } from "../services/loginDirect";
import { useNavigate } from "react-router";

const LoginDirectPage = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  useEffect(() => {
    loginDirect(params, navigate);
  }, []);

  return (
    <div>
      <Spinner
        spinnerClassName="size-10"
        title="Signing you in"
        description="Please wait while we securely log you into your account..."
      />
    </div>
  );
};

export default LoginDirectPage;
