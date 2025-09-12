import { useGuestStore } from "../../../global/hooks/useGuestStore";
import { sendOtp } from "../api/sendOtp.api";


export const handleSendOtp = async () => {
    const {mobile,name, setToken, setError, setOpenVerifyOtp} = useGuestStore.getState()
    if (!name) {
      setError("Please fill your Name");
      return;
    }
    if(!mobile) {
        setError("Please fill your Mobile Number")
    }

    try {
      const data = new FormData();
      data.append("mobile", String(mobile));
      const res = await sendOtp(data);
      if (res.responseTxt === "sent_otp") {
        setToken(res?.obj.token);
        setOpenVerifyOtp(true);
      }
    } catch (error) {
      console.log("Error Sending Otp: ", error);
    }
}