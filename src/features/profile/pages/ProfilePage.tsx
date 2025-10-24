import { usePageTracking } from "../../../hooks/usePageTracking";
import DesktopChildLayout from "../../../layouts/child-layout/components/DesktopChildLayout";
import { gtmEvents } from "../../../utils/gtm-events";
import ProfileContent from "../components/ProfileContent";

const ProfilePage = () => {
  usePageTracking(gtmEvents.profile_page_visit)
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

export default ProfilePage;
