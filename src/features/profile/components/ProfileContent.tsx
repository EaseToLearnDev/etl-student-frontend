// React imports
import { useEffect } from "react";
// Hooks
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";

// Services
import { handleStudentProfileUpdateDetails } from "../services/handleStudentProfileUpdateDetails";
import { handleVerifyOtp } from "../services/handleVerifyOtp";
import { validateField } from "../services/validateField";

// Components
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import { Modal } from "../../../components/Modal";
import AccountRemovalSection from "./AccountRemovalSection";
import ProfileHeader from "./ProfileHeader";
import VerifyOtpContent from "./VerifyOtpContent";

/**
 * Renders the main profile content section for viewing and editing student profile details.
 */
const ProfileContent = () => {
  const studentData = useStudentStore((state) => state.studentData);
  const setStudentData = useStudentStore((state) => state.setStudentData);

  const editProfile = useProfileStore((state) => state.editProfile);
  const setEditProfile = useProfileStore((state) => state.setEditProfile);
  const isVerified = useProfileStore((state) => state.isVerified);
  const setIsVerified = useProfileStore((state) => state.setIsVerified);
  const showOtpModal = useProfileStore((state) => state.showOtpModal);
  const setShowOtpModal = useProfileStore((state) => state.setShowOtpModal);
  const setOtpType = useProfileStore((state) => state.setOtpType);
  const otpError = useProfileStore((state) => state.otpError);
  const setResToken = useProfileStore((state) => state.setResToken);
  const setTokenIdentify = useProfileStore((state) => state.setTokenIdentify);
  const studentName = useProfileStore((state) => state.studentName);
  const setStudentName = useProfileStore((state) => state.setStudentName);
  const emailId = useProfileStore((state) => state.emailId);
  const setEmailId = useProfileStore((state) => state.setEmailId);
  const phoneNo = useProfileStore((state) => state.phoneNo);
  const setPhoneNo = useProfileStore((state) => state.setPhoneNo);

  if (!studentData) return null;

  const isPhoneChanged = phoneNo.data !== studentData.phoneNo;
  const isEmailChanged = emailId.data !== studentData.emailId;
  const isNameChanged = studentName.data !== studentData.studentName;
  const hasChanges = isPhoneChanged || isEmailChanged || isNameChanged;

  const openOtpModal = async (type: "mobile" | "email") => {
    try {
      const res = await handleStudentProfileUpdateDetails({
        newEmailId: emailId.data,
        newPhoneNo: phoneNo.data,
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

  const handleSave = () => {
    setStudentData({
      ...studentData,
      studentName: studentName.data,
      phoneNo: phoneNo.data,
      emailId: emailId.data,
    });
    setEditProfile(false);
    setIsVerified(false);
  };

  const handleReset = () => {
    setStudentName({
      ...studentName,
      data: studentData?.studentName ?? "N/A",
      error: "",
    });
    setPhoneNo({ ...phoneNo, data: studentData?.phoneNo ?? "N/A", error: "" });
    setEmailId({ ...emailId, data: studentData?.emailId ?? "N/A", error: "" });
    setEditProfile(false);
    setIsVerified(false);
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div>
      <ProfileHeader />

      {/* Profile Info */}
      <form className="grid sm:grid-cols-1 lg:grid-cols-2 gap-3">
        <InputField
          label="Student Name"
          value={studentName.data}
          disabled={!editProfile}
          info={{ msg: studentName.error, type: "error" }}
          placeholder="Enter Student Name"
          onChange={(e) =>
            setStudentName({ ...studentName, data: e.target.value })
          }
        />
        <div className="flex flex-col gap-2">
          <InputField
            label="Mobile Number"
            value={phoneNo.data}
            disabled={!editProfile}
            onChange={(e) => {
              const inputValue = e.target.value.trim();

              if (isNaN(Number(inputValue))) return;

              const newPhoneNo = { ...phoneNo, data: inputValue };

              setPhoneNo(newPhoneNo);
              validateField(newPhoneNo, setPhoneNo, "mobile");
            }}
            info={{ msg: phoneNo.error, type: "error" }}
            type="text"
            placeholder="Enter Your Mobile"
          />
          {editProfile && isPhoneChanged && (
            <Button
              style="primary"
              onClick={() => openOtpModal("mobile")}
              disabled={!!phoneNo.error}
              className="w-min"
            >
              Verify
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            label="Email Address"
            type="email"
            value={emailId.data}
            disabled={!editProfile}
            onChange={(e) => {
              const newEmailId = { ...emailId, data: e.target.value.trim() };

              setEmailId(newEmailId);
              validateField(newEmailId, setEmailId, "email");
            }}
            info={{ msg: emailId.error, type: "error" }}
            placeholder="Enter Your Email Id"
          />
          {editProfile && isEmailChanged && (
            <Button
              style="primary"
              onClick={() => openOtpModal("email")}
              disabled={!!emailId.error}
              className="w-min"
            >
              Verify
            </Button>
          )}
        </div>
      </form>

      {editProfile && (
        <div className="flex flex-row justify-end gap-3">
          <Button
            style="primary"
            onClick={handleSave}
            disabled={
              !hasChanges || ((isPhoneChanged || isEmailChanged) && !isVerified)
            }
          >
            Save
          </Button>
          <Button style="secondary" onClick={handleReset}>
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

      {/* Account Removal Section */}
      <AccountRemovalSection />
    </div>
  );
};

export default ProfileContent;
