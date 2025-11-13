import { useEffect } from "react";
import { Spinner } from "../../../../components/Spinner";
import logout from "../../../../utils/logout";

const LogoutPage = () => {
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className="w-full h-screen grid place-items-center">
      <Spinner
        title="Logging out..."
        description="Please wait"
        spinnerClassName="size-20"
      />
    </div>
  );
};

export default LogoutPage;
