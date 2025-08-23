import { useState, type ChangeEvent } from "react";
import { BiCamera, BiEdit, BiX } from "react-icons/bi";
import { useStudentStore } from "../../shared/store/useStudentStore";
import { handleDeleteStudentAccount } from "../services/handleDeleteStudentAccount";
import { Modal } from "../../../components/Modal";
import Button from "../../../components/Button";
import VerifyOtpContent from "./VerifyOtpContent";
import { LoadProfilePic } from "../services/LoadProfilePic";
import type { StudentDataType } from "../../shared/types";
import { removeProfilePic } from "../services/removeProfilePic";
import { handleVerifyOtpAccountDeleteRequest } from "../services/handleVerifyOtpACcountDeleteRequest";

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
        ...(studentData as StudentDataType),
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
        ...(studentData as StudentDataType),
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
        ...(studentData as StudentDataType),
        deleteFlag: 1,
      });
    } else {
      setError("Invalid OTP. Please Try Again");
    }
  };

  const defaultImage =
    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400";

  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profilePic || studentData?.profilePic || defaultImage}
            alt="Profile"
            className="w-30 h-30 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {isEditing && (
            <>
              <label className="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-blue-700">
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
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              >
                <BiX className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 space-x-2 mb-2">
            <h3>{studentData?.studentName}</h3>
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
      </div>

      <div className="flex flex-row gap-2">
        {editProfile ? null : (
          <Button style="primary" onClick={() => setEditProfile(true)}>
            Edit Profile
          </Button>
        )}

        {studentData?.deleteFlag ? (
          <p className="text-red-500">
            Your account deletion process is started. It would be deleted in
            next few hours automatically
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

      <Modal
        isOpen={!!deleteAccountToken}
        onClose={() => setDeleteAccountToken("")}
        size="md"
      >
        <VerifyOtpContent
          onVerify={handleVerifyOtp}
          onCancel={() => setDeleteAccountToken("")}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Modal>
    </div>
  );
};

export default ProfileHeader;
