// React
import { useState, type ChangeEvent } from "react";

// Types
import type { StudentData } from "../../shared/types";

// Icons
import { BiEdit } from "react-icons/bi";

// Hooks
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Services
import { LoadProfilePic } from "../services/LoadProfilePic";
import { removeProfilePic } from "../services/removeProfilePic";

// Components
import Button from "../../../components/Button";
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";
import { useProfileStore } from "../hooks/useProfileStore";

const ProfileHeader = () => {
  const { editProfile, setEditProfile } = useProfileStore.getState();

  const [profilePic, setprofilePic] = useState<string | null>(null);
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
      setprofilePic(fileUrl);
      setIsPopoverOpen(false);
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
      setIsPopoverOpen(false);
    }
  };

  const defaultImage =
    "https://png.pngtree.com/png-vector/20231208/ourmid/pngtree-animated-3d-student-boy-with-empty-space-png-image_11095095.png";

  const bannerImage =
    "https://img.freepik.com/free-photo/nobody-exterior-wall-page-empty_1258-257.jpg";

  return (
    <div className="w-full bg-[var(--surface-bg-primary)] rounded-lg">
      <div
        className="h-40 bg-gray-700 relative rounded-t-xl"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <img
              src={profilePic || studentData?.profilePic || defaultImage}
              alt="Profile"
              className="w-24 h-24 rounded-full bg-white object-cover border-2 border-white shadow-lg"
            />

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
          <Button style="primary" onClick={() => setEditProfile(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
