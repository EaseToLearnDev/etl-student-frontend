// React imports
import { useEffect, useState } from "react";
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
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ProfileInformationPopover from "./ProfileInformationPopover";

// Utils
import { gtmEvents } from "../../../utils/gtm-events";
import { pushToDataLayer } from "../../../utils/gtm";

/**
 * Renders the main profile content section for viewing and editing student profile details.
 */
const ProfileContent = () => {
  const studentData = useStudentStore((state) => state.studentData);
  const setStudentData = useStudentStore((state) => state.setStudentData);

  const editProfile = useProfileStore((state) => state.editProfile);
  const setEditProfile = useProfileStore((state) => state.setEditProfile);
  const setVerifiedFields = useProfileStore((state) => state.setVerifiedFields);
  const verifiedFields = useProfileStore((state) => state.verifiedFields);
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
  const [verifyType, setVerifyType] = useState<"Mobile" | "Email" | null>(null);
  const save_profile_button_id = "save_profile_button_id";

  if (!studentData) return null;

  const isPhoneChanged = phoneNo?.data?.trim() !== studentData?.phoneNo?.trim();
  const isEmailChanged = emailId?.data?.trim() !== studentData?.emailId?.trim();
  const isNameChanged =
    studentName?.data?.trim() !== studentData?.studentName?.trim();

  const openOtpModal = async (type: "Mobile" | "Email") => {
    try {
      setVerifyType(type);

      if (type === "Email") {
        setVerifiedFields({ ...verifiedFields, emailId: "pending" });
      } else {
        setVerifiedFields({ ...verifiedFields, phoneNo: "pending" });
      }

      const res = await handleStudentProfileUpdateDetails({
        newEmailId: type === "Email" ? emailId.data : undefined,
        newPhoneNo: type === "Mobile" ? phoneNo.data : undefined,
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
    setVerifiedFields({ phoneNo: "unchanged", emailId: "unchanged" });
  };

  const handleReset = () => {
    setStudentName({
      ...studentName,
      data: studentData?.studentName ?? "",
      error: "",
    });
    setPhoneNo({ ...phoneNo, data: studentData?.phoneNo ?? "", error: "" });
    setEmailId({ ...emailId, data: studentData?.emailId ?? "", error: "" });
    setEditProfile(false);
    setVerifiedFields({ phoneNo: "unchanged", emailId: "unchanged" });
  };

  const isSaveDisabled = () => {
    // nothing changed
    if (
      !isNameChanged &&
      verifiedFields.emailId === "unchanged" &&
      verifiedFields.phoneNo === "unchanged"
    )
      return true;

    // if any field is pending verification
    if (
      verifiedFields.emailId === "pending" ||
      verifiedFields.phoneNo === "pending"
    ) {
      return true;
    }

    // if only name is changed → allowed
    if (isNameChanged) return false;

    // if email is changed → must be verified
    if (isEmailChanged && verifiedFields.emailId !== "verified") {
      return true;
    }

    // if phone is changed → must be verified
    if (isPhoneChanged && verifiedFields.phoneNo !== "verified") {
      return true;
    }

    // otherwise, enable save
    return false;
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
            renderItem={() => (
              <ProfileInformationPopover type="mobile">
                <InformationCircleIcon
                  width={20}
                  height={20}
                  className="text-[var(--text-primary)] cursor-pointer"
                />
              </ProfileInformationPopover>
            )}
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
          {editProfile &&
            isPhoneChanged &&
            verifiedFields.phoneNo !== "verified" && (
              <Button
                style="primary"
                onClick={() => {
                  openOtpModal("Mobile");
                }}
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
            renderItem={() => (
              <ProfileInformationPopover type="email">
                <InformationCircleIcon
                  width={20}
                  height={20}
                  className="text-[var(--text-primary)] cursor-pointer"
                />
              </ProfileInformationPopover>
            )}
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
          {editProfile &&
            isEmailChanged &&
            verifiedFields.emailId !== "verified" && (
              <Button
                style="primary"
                onClick={() => {
                  openOtpModal("Email");
                }}
                disabled={!!emailId.error}
                className="w-min"
              >
                Verify
              </Button>
            )}
        </div>
      </form>

      {editProfile && (
        <div className="flex flex-row justify-end gap-3 mt-4 sm:mt-0">
          <Button
            id={save_profile_button_id}
            style="primary"
            onClick={() => {
              pushToDataLayer({
                event: gtmEvents.save_profile_button_click,
              });
              handleSave();
            }}
            disabled={isSaveDisabled()}
          >
            Save
          </Button>
          <Button style="secondary" onClick={handleReset}>
            Cancel
          </Button>
        </div>
      )}

      {showOtpModal && verifyType && (
        <Modal
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          size="md"
        >
          <VerifyOtpContent
            onCancel={() => setShowOtpModal(false)}
            onVerify={handleVerifyOtp}
            onResend={() => openOtpModal(verifyType)}
            type={verifyType}
            value={verifyType === "Email" ? emailId.data : phoneNo.data}
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
