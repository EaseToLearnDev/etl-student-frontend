import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileInput from "./ProfileInput";
import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import VerifyOtpContent from "./VerifyOtpContent";
import { handleStudentProfileUpdateDetails } from "../services/handleStudentProfileUpdateDetails";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";
import ConfirmDeleteAccount from "./ConfirmDeleteAccount";
import DeleteAccountOtpVerifyModal from "./DeleteAccountOtpVerifyModal";
import AccountRemovalSection from "./AccountRemovalSection";
import { handleVerifyOtp } from "../services/handleVerifyOtp";

const ProfileContent = () => {
  const { studentData, setStudentData } = useStudentStore.getState();

  const {
    editProfile,
    setEditProfile,
    isVerified,
    setIsVerified,
    showOtpModal,
    setShowOtpModal,
    setOtpType,
    otpError,
    setResToken,
    setTokenIdentify,
    errors,
    setErrors,
  } = useProfileStore();

  if (!studentData) return null;

  const [formData, setFormData] = useState({
    studentName: studentData?.studentName ?? "N/A",
    phoneNo: studentData?.phoneNo ?? "N/A",
    emailId: studentData?.emailId ?? "N/A",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "emailId") setErrors({ ...errors, email: "" });
    if (name === "phoneNo") setErrors({ ...errors, phone: "" });
  };

  const isPhoneChanged = formData.phoneNo !== studentData.phoneNo;
  const isEmailChanged = formData.emailId !== studentData.emailId;
  const isNameChanged = formData.studentName !== studentData.studentName;
  const hasChanges = isPhoneChanged || isEmailChanged || isNameChanged;

  const openOtpModal = async (type: "mobile" | "email") => {
    if (type === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.emailId)) {
        setErrors({ ...errors, email: "Invalid email address" });
        return;
      }
    }
    if (type === "mobile") {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phoneNo)) {
        setErrors({ ...errors, phone: "Invalid phone number" });
        return;
      }
    }
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
      <ProfileHeader />

      {/* Profile Info */}
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
            <Button
              style="primary"
              onClick={() => openOtpModal("mobile")}
              disabled={!!errors.phone}
            >
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
            <Button
              style="primary"
              onClick={() => openOtpModal("email")}
              disabled={!!errors.email}
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

      {/* Account Removal Section */}
      <AccountRemovalSection />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteAccount />

      {/* OTP Verify Modal for Account Deletion */}
      <DeleteAccountOtpVerifyModal />
    </div>
  );
};

export default ProfileContent;
