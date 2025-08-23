import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";
import ProfileContent from "../components/ProfileContent";

const ProfileSection = () => {
  return (
    <div>
      <h3 className="pb-5">My Profile</h3>
      <div>
        <DesktopChildLayout
          primaryContent={<ProfileContent />}
          isSecondaryHidden={true}
        />
      </div>
    </div>
  );
};

export default ProfileSection;
