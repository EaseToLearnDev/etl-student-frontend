import { useLocation, useNavigate } from "react-router"
import { FiChevronRight } from "react-icons/fi"

// Props interface for BreadCrumbs component
interface BreadCrumbsProps {
    append?: string;
}

/**
 * BreadCrumbs Component
 * 
 * Dynamically generates navigation breadcrumbs based on the current URL path.
 * Provides clickable navigation to parent routes and highlights the current page.
 * 
 * @param {BreadCrumbsProps} props - Component props
 * @param {string} [props.append] - Optional string to add as the final breadcrumb
 * @returns {JSX.Element} Navigation breadcrumb component
 */
const BreadCrumbs = ({ append }: BreadCrumbsProps) => {
    // Hooks for navigation and location access
    const location = useLocation();
    const navigate = useNavigate();

    // Split the current path into segments, filtering out empty strings
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

    // Formats a URL segment into a human-readable display name
    const formatSegmentName = (segment: string): string => {
        return segment
            .replace(/[-]/g, ' ')
            .replace(/(?<= )\d+$/, '')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Generate breadcrumb items from URL path segments
    const breadcrumbItems = pathSegments?.map((segment, index) => {
        // Build the cumulative path up to the current segment
        const path = "/" + pathSegments?.slice(0, index + 1).join("/");
        return {
            name: formatSegmentName(segment),
            path: path,
        }
    });

    // Add append item if provided - this becomes the "current" page
    if (append) {
        breadcrumbItems.push({
            name: formatSegmentName(append),
            path: location.pathname,
        });
    }

    //   Handles breadcrumb click navigation
    const handleBreadcrumbClick = (path: string) => {
        navigate(path);
    };

    return (
        <nav className="flex items-center space-x-1 mb-4 ml-13 flex-wrap">
            {breadcrumbItems?.map((item, index) => {
                // Determine if this is the last (current) breadcrumb
                const isLast = index === breadcrumbItems.length - 1;

                return (
                    <div key={index} className="flex items-center">
                        {/* Breadcrumb button */}
                        <button
                            onClick={() => handleBreadcrumbClick(item.path)}
                            className={`font-medium transition-colors duration-200 hover:opacity-80`}
                            disabled={isLast} // Disable click for current page
                            style={{
                                color: isLast ? 'var(--sb-ocean-bg-active)' : '',
                                cursor: isLast ? 'default' : 'pointer'
                            }}
                        >
                            {item.name}
                        </button>

                        {/* Chevron separator - only show between items, not after last */}
                        {!isLast ? (
                            <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        ) : <></>}
                    </div>
                );
            })}
        </nav>
    )
}

export default BreadCrumbs;