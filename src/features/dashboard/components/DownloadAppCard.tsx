// Icons
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { PiAndroidLogoFill, PiAppleLogoFill } from "react-icons/pi";

// Components
import QrPopover from "./QrPopover";
import useIsMobile from "../../../hooks/useIsMobile";
import { Link } from "react-router";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

const get_app_ios_button_id = "get_app_ios_button_id";
const get_app_android_button_id = "get_app_android_button_id";
interface DownloadAppCardProps {
  title?: string;
  subtitle?: string;
  androidUrl?: string;
  iosUrl?: string;
  className?: string;
  showQRCode?: boolean;
}

export default function DownloadAppCard({
  title = "Get the app",
  subtitle = "Download the mobile app for the best experience",
  className = "",
}: DownloadAppCardProps) {
  const isMobile = useIsMobile();
  return (
    <aside
      className={`w-full flex flex-col gap-4 ${className}`}
      aria-labelledby="download-card-title"
    >
      <div className="flex flex-col gap-1">
        <h5>{title}</h5>
        <p className="text-[var(--text-tertiary)]">{subtitle}</p>
      </div>

      {/* content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-3">
          {/* iOS button */}
          {isMobile ? (
            <Link

              to="https://apps.apple.com/in/app/easetolearn-learner/id6742306460"
              className="max-w-[300px] inline-flex items-center gap-3 justify-between px-4 py-2 rounded-lg border border-[var(--border-secondary)] shadow-sm hover:shadow focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
              aria-label="Download on the App Store"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center bg-[var(--surface-bg-secondary)] rounded-md p-2">
                  <PiAppleLogoFill className="w-5 h-5 text-[var(--text-primary)]" />
                </span>
                <div className="text-left">
                  <div className="text-xs text-[var(--text-tertiary)]">
                    Download on
                  </div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </div>
              <CloudArrowDownIcon className="size-5 aspect-square text-[var(--text-secondary)]" />
            </Link>
          ) : (
            <QrPopover qrCode="IOSQrCode.png">
              <button
                type="button"
                className="max-w-[300px] inline-flex items-center gap-3 justify-between px-4 py-2 rounded-lg border border-[var(--border-secondary)] shadow-sm hover:shadow focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors w-full"
             onClick={() => {
                pushToDataLayer({
                  event: gtmEvents.get_app_ios_button_click,
                  id : get_app_ios_button_id,
                });
              }} 
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center bg-[var(--surface-bg-secondary)] rounded-md p-2">
                    <PiAppleLogoFill className="w-5 h-5 text-[var(--text-primary)]" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs text-[var(--text-tertiary)]">
                      Download on
                    </div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </div>
                <CloudArrowDownIcon className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </QrPopover>
          )}

          {/* Android button */}
          {isMobile ? (
            <Link
              to="https://play.google.com/store/apps/details?id=com.easetolearn.indiaexampreparation"
              className="max-w-[300px] inline-flex items-center gap-3 justify-between px-4 py-2 rounded-lg border border-[var(--border-secondary)] shadow-sm hover:shadow focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
              aria-label="Get it on Google Play"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center bg-[var(--surface-bg-secondary)] rounded-md p-2">
                  <PiAndroidLogoFill className="w-5 h-5 text-[var(--text-primary)]" />
                </span>
                <div className="text-left">
                  <div className="text-xs text-[var(--text-tertiary)]">
                    Get it on
                  </div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </div>
              <CloudArrowDownIcon className="size-5 aspect-square text-[var(--text-secondary)]" />
            </Link>
          ) : (
            <QrPopover qrCode="AndroidQrcode.png" >
              <button
                type="button"
                className="max-w-[300px] inline-flex items-center gap-3 justify-between px-4 py-2 rounded-lg border border-[var(--border-secondary)] shadow-sm hover:shadow focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors w-full"
                onClick={() => {
                  pushToDataLayer({
                    event: gtmEvents.get_app_android_button_click,
                    id : get_app_android_button_id,
                  });
                }}  
                >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center bg-[var(--surface-bg-secondary)] rounded-md p-2">
                    <PiAndroidLogoFill className="w-5 h-5 text-[var(--text-primary)]" />
                  </span>
                  <div className="text-left">
                    <div className="text-xs text-[var(--text-tertiary)]">
                      Get it on
                    </div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </div>
                <CloudArrowDownIcon className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </QrPopover>
          )}
        </div>
      </div>
    </aside>
  );
}
