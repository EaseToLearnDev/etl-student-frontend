// React
import { useState, type ChangeEvent } from "react";

// Types
import type { StudentData } from "../../shared/types";

// Icons
import { BiEdit } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

// Hooks
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";

// Services
import { LoadProfilePic } from "../services/LoadProfilePic";
import { removeProfilePic } from "../services/removeProfilePic";

// Components
import Button from "../../../components/Button";
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";
import cn from "../../../utils/classNames";
import useDarkModeStore from "../../../store/useDarkModeStore";

const ProfileHeader = () => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const { editProfile, setEditProfile } = useProfileStore.getState();
  const profilePic = useProfileStore((state) => state.profilePic);
  const setProfilePic = useProfileStore((state) => state.setProfilePic);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { studentData, setStudentData } = useStudentStore.getState();

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await LoadProfilePic({ file });
      const fileUrl = res.virtualUrlFile ?? "";
      setStudentData({
        ...(studentData as StudentData),
        profilePic: fileUrl,
      });
      setProfilePic(fileUrl);
      setIsPopoverOpen(false);
    }
  };

  const handleRemoveImage = async () => {
    const res = await removeProfilePic();
    if (res.responseTxt === "success") {
      setProfilePic(null);
      setStudentData({
        ...(studentData as StudentData),
        profilePic: "",
      });
      setIsPopoverOpen(false);
    }
  };

  return (
    <div className="w-full bg-[var(--surface-bg-primary)] rounded-lg">
      <div
        className={cn(
          "h-25 sm:h-40 relative rounded-t-xl",
          darkMode ? "bg-[var(--surface-bg-secondary)]" : "bg-gray-700"
        )}
      >
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <div className="size-24 aspect-square rounded-full p-1 border-4 border-[var(--sb-ocean-bg-active)] bg-[var(--surface-bg-secondary)] flex justify-center items-center overflow-hidden relative">
              <div className="w-full h-full aspect-square rounded-full overflow-hidden">
                {profilePic || studentData?.profilePic ? (
                  <img
                    src={profilePic || studentData?.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full bg-white object-cover border-2 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-end justify-center absolute inset-0">
                    <FaUser
                      size={70}
                      className="w-15 h-15 aspect-square text-[var(--text-tertiary)]"
                    />
                  </div>
                )}
              </div>
            </div>

            <Popover
              open={isPopoverOpen}
              setIsOpen={setIsPopoverOpen}
              shadow="sm"
              placement="bottom"
            >
              <PopoverTrigger>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-[var(--sb-ocean-bg-active)] text-white rounded-full p-2 shadow-md hover:bg-[var(--sb-ocean-bg-hover)]"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <BiEdit className="w-5 h-5 cursor-pointer" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="z-[9999] p-2 bg-[var(--surface-bg-secondary)] rounded-lg shadow-lg">
                <div className="flex flex-col gap-2 w-40">
                  <label className="relative cursor-pointer w-full">
                    <Button
                      style="secondary"
                      className="w-full border-none hover:text-white hover:bg-[var(--sb-ocean-bg-active)]"
                    >
                      Upload New
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                  </label>

                  <Button
                    style="secondary"
                    className="w-full border-none hover:bg-[var(--sb-valencia-bg-active)] hover:text-white"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Info & Actions */}
      <div className="mt-14 pb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold">
              {studentData?.studentName}
            </h3>
          </div>
          <p className="text-[var(--text-tertiary)]">
            Update your photo and personal details.
          </p>
        </div>

        {editProfile ? null : (
          <Button style="primary" className="mt-2 sm:mt-0" onClick={() => setEditProfile(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
