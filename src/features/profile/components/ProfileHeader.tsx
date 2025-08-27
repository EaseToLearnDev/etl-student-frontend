// React
import { useState, type ChangeEvent } from "react";

// Types
import type { StudentData } from "../../shared/types";

// Icons
import { BiCamera, BiEdit, BiX } from "react-icons/bi";

// Hooks
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Services
import { handleDeleteStudentAccount } from "../services/handleDeleteStudentAccount";
import { handleVerifyOtpAccountDeleteRequest } from "../services/handleVerifyOtpAccountDeleteRequest";
import { LoadProfilePic } from "../services/LoadProfilePic";
import { removeProfilePic } from "../services/removeProfilePic";

// Components
import { Modal } from "../../../components/Modal";
import Button from "../../../components/Button";
import VerifyOtpContent from "./VerifyOtpContent";

interface ProfileHeaderProps {
  editProfile: boolean;
  setEditProfile: (val: boolean) => void;
}

const ProfileHeader = ({ editProfile, setEditProfile }: ProfileHeaderProps) => {
  const [deleteAccountProgress, setDeleteAccountProgress] = useState(false);
  const [deleteAccountToken, setDeleteAccountToken] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [profilePic, setprofilePic] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { studentData, setStudentData } = useStudentStore.getState();

  const handleDeleteRequest = async () => {
    try {
      setDeleteAccountProgress(true);
      const res = await handleDeleteStudentAccount();
      if (res.responseTxt === "success") {
        setDeleteAccountToken(res?.obj?.token);
      }
    } catch (error) {
      console.log("Delete Request Failed: ", error);
    } finally {
      setDeleteAccountProgress(false);
      setConfirmDeleteOpen(false);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await LoadProfilePic({ file });
      const fileUrl = res.virtualUrlFile ?? "";
      setStudentData({
        ...(studentData as StudentData),
        profilePic: fileUrl,
      });
      setprofilePic(fileUrl);
      setIsEditing(false);
    }
  };

  const handleRemoveImage = async () => {
    const res = await removeProfilePic();
    if (res.responseTxt === "success") {
      setprofilePic(null);
      setStudentData({
        ...(studentData as StudentData),
        profilePic: "",
      });
      setIsEditing(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    const res = handleVerifyOtpAccountDeleteRequest({
      deleteAccountToken,
      otp,
    });
    if (res) {
      setStudentData({
        ...(studentData as StudentData),
        deleteFlag: 1,
      });
    } else {
      setError("Invalid OTP. Please Try Again");
    }
  };

  const defaultImage =
    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400";

  // const bannerImage =
  //   "https://i.pinimg.com/1200x/35/65/59/356559c382e05f63ac1ce57d68b71a68.jpg";

  return (
    <div className="w-full bg-[var(--surface-bg-primary)] rounded-lg">

      <div
        className="h-40 bg-gray-700 relative rounded-t-xl"
        style={{
          // backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <img
              src={profilePic || studentData?.profilePic || defaultImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-lg"
            />
            {isEditing && (
              <>
                <label className="absolute bottom-1 right-1 bg-[var(--sb-ocean-bg-active)] text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-[var(--sb-ocean-bg-hover)]">
                  <BiCamera className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-[var(--sb-valencia-bg-active)] text-white rounded-full p-1 shadow-md hover:bg-[var(--sb-valencia-bg-hover)]"
                >
                  <BiX className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info & Actions */}
      <div className="mt-14 px-6 pb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">{studentData?.studentName}</h3>
            {isEditing ? (
              <Button style="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)}>
                <BiEdit className="w-5 h-5 cursor-pointer" />
              </button>
            )}
          </div>
          <p className="text-[var(--text-tertiary)]">
            Update your photo and personal details.
          </p>
        </div>

        <div className="flex flex-row gap-2 mt-4 md:mt-0">
          {editProfile ? null : (
            <Button style="primary" onClick={() => setEditProfile(true)}>
              Edit Profile
            </Button>
          )}

          {studentData?.deleteFlag ? (
            <p className="text-[var(--sb-valencia-bg-active)]">
              Your account deletion process has started. It will be deleted in a
              few hours automatically.
            </p>
          ) : (
            <Button
              onClick={() => setConfirmDeleteOpen(true)}
              style="secondary"
              className="hover:bg-[var(--sb-valencia-bg-active)] hover:text-white"
            >
              Delete Account
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        size="md"
        className="p-4"
      >
        <div className="text-center">
          <h5 className="text-lg font-semibold mb-5">
            Are you sure you want to delete your account?
          </h5>
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleDeleteRequest}
              style="primary"
              className="hover:bg-[var(--sb-valencia-bg-active)] hover:text-white"
            >
              {deleteAccountProgress ? "Loading..." : "Yes, Delete"}
            </Button>
            <Button
              onClick={() => setConfirmDeleteOpen(false)}
              style="secondary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* OTP Verify Modal */}
      <Modal
        isOpen={!!deleteAccountToken}
        onClose={() => setDeleteAccountToken("")}
        size="md"
      >
        <VerifyOtpContent
          onVerify={handleVerifyOtp}
          onCancel={() => setDeleteAccountToken("")}
        />
        {error && <p className="text-[var(--sb-valencia-bg-active)] mt-2">{error}</p>}
      </Modal>
    </div>
  );
};

export default ProfileHeader;
