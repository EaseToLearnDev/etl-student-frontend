// Icons
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { PiAndroidLogoFill, PiAppleLogoFill } from "react-icons/pi";

// Components
import QrPopover from "./QrPopover";

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
        <div className="mt-4 flex flex-col gap-3">
          {/* iOS button */}
          <div
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
            <span className="text-[var(--text-tertiary)]">Coming Soon</span>

            {/* <CloudArrowDownIcon className="ml-2 w-5 h-5 text-[var(--text-secondary)]" /> */}
          </div>

          {/* Android button */}
          <div
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
            <QrPopover>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <CloudArrowDownIcon className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </QrPopover>
          </div>
        </div>
      </div>
    </aside>
  );
}
