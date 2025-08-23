import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileInput from "./ProfileInput";
import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import VerifyOtpContent from "./VerifyOtpContent";
import { handleStudentProfileUpdateDetails } from "../services/handleStudentProfileUpdateDetails";
import { handleStudentProfileVerifyOtp } from "../services/handleStudentProfileVerifyOtp";
import { useStudentStore } from "../../shared/hooks/useStudentStore";

const ProfileContent = () => {
  const { studentData, setStudentData } = useStudentStore.getState();
  const [editProfile, setEditProfile] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpType, setOtpType] = useState<"email" | "mobile" | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resToken, setResToken] = useState<string | null>(null);
  const [tokenIdentify, setTokenIdentify] = useState<number | null>(null);
  const [errors, setErrors] = useState({ email: "", phone: "" });

  if (!studentData) return null;

  const [formData, setFormData] = useState({
    studentName: studentData?.studentName ?? "N/A",
    phoneNo: studentData?.phoneNo ?? "N/A",
    emailId: studentData?.emailId ?? "N/A",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "emailId") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Invalid email address",
      }));
    }

    if (name === "phoneNo") {
      const phoneRegex = /^[6-9]\d{9}$/;
      setErrors((prev) => ({
        ...prev,
        phone: phoneRegex.test(value) ? "" : "Invalid phone number",
      }));
    }
  };

  const isPhoneChanged = formData.phoneNo !== studentData.phoneNo;
  const isEmailChanged = formData.emailId !== studentData.emailId;

  const openOtpModal = async (type: "mobile" | "email") => {
    try {
      const res = await handleStudentProfileUpdateDetails({
        newEmailId: formData.emailId,
        newPhoneNo: formData.phoneNo,
      });

      if (res) {
        setResToken(res.resToken);
        setTokenIdentify(res.tokenIdentify);
        setOtpType(type);
        setShowOtpModal(true);
      }
    } catch (err) {
      console.error("Error requesting OTP:", err);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!resToken || !tokenIdentify) return;

    try {
      const verification = await handleStudentProfileVerifyOtp({
        otpForMobile: otpType === "mobile" ? Number(otp) : undefined,
        otpForEmail: otpType === "email" ? Number(otp) : undefined,
        resToken,
        tokenIdentify,
      });

      if (verification) {
        setIsVerified(true);
        setShowOtpModal(false);
        setOtpError(null);
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setOtpError("Something went wrong. Please try again later.");
    }
  };

  const handleSave = () => {
    setStudentData({
      ...studentData,
      studentName: formData.studentName,
      phoneNo: formData.phoneNo,
      emailId: formData.emailId,
    });
    setEditProfile(false);
    setIsVerified(false);
  };

  const handleCancel = () => {
    setFormData({
      studentName: studentData.studentName ?? "N/A",
      phoneNo: studentData.phoneNo ?? "N/A",
      emailId: studentData.emailId ?? "N/A",
    });
    setEditProfile(false);
    setErrors({ email: "", phone: "" });
    setIsVerified(false);
  };

  return (
    <div>
      <ProfileHeader
        editProfile={editProfile}
        setEditProfile={setEditProfile}
      />

      <form className="grid sm:grid-cols-1 lg:grid-cols-2 gap-3">
        <ProfileInput
          name="studentName"
          label="Student Name"
          value={formData.studentName}
          readOnly={!editProfile}
          onChange={handleChange}
        />
        <div>
          <ProfileInput
            name="phoneNo"
            label="Mobile Number"
            value={formData.phoneNo}
            readOnly={!editProfile}
            onChange={handleChange}
            error={errors.phone}
          />
          {editProfile && isPhoneChanged && (
            <Button style="primary" onClick={() => openOtpModal("mobile")}>
              Verify
            </Button>
          )}
        </div>
        <div>
          <ProfileInput
            name="emailId"
            label="Email Address"
            type="email"
            value={formData.emailId}
            readOnly={!editProfile}
            onChange={handleChange}
            error={errors.email}
          />
          {editProfile && isEmailChanged && (
            <Button style="primary" onClick={() => openOtpModal("email")}>
              Verify
            </Button>
          )}
        </div>
      </form>

      {editProfile && (
        <div className="flex flex-row justify-end gap-3">
          <Button style="primary" onClick={handleSave} disabled={!isVerified}>
            Save
          </Button>
          <Button style="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}

      {showOtpModal && (
        <Modal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          size="md"
        >
          <VerifyOtpContent
            onCancel={() => setShowOtpModal(false)}
            onVerify={handleVerifyOtp}
            error={otpError}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProfileContent;
