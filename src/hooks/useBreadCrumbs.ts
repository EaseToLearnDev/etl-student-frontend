import { useLocation, useNavigate } from "react-router"

interface BreadcrumbItem {
    name: string;
    path: string;
}

interface UseBreadcrumbsProps {
    append?: string;
    pop?: boolean;
}

/**
 * Custom hook for breadcrumb navigation
 * 
 * @param {UseBreadcrumbsProps} options - Hook options
 * @param {string} [options.append] - Optional string to add as the final breadcrumb
 * @param {boolean} [options.pop] - Optional boolean to remove the last breadcrumb
 * @returns {Object} Breadcrumb items and navigation handler
 */
export const useBreadcrumbs = ({ append, pop }: UseBreadcrumbsProps = {}) => {
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * Formats a URL segment into a human-readable display name
     * 
     * @param {string} segment - URL segment to format
     * @returns {string} Formatted display name
     */
    const formatSegmentName = (segment: string): string => {
        return segment
            .replace(/[-]/g, ' ')
            .replace(/(?<= )\d+$/, '')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Split the current path into segments, filtering out empty strings
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

    // Generate breadcrumb items from URL path segments
    let breadcrumbItems: BreadcrumbItem[] = pathSegments?.map((segment, index) => {
        // Build the cumulative path up to the current segment
        const path = "/" + pathSegments?.slice(0, index + 1).join("/");
        return {
            name: formatSegmentName(segment),
            path: path,
        }
    });

    // Remove the last breadcrumb if pop is true
    if (pop) {
        breadcrumbItems = breadcrumbItems?.slice(0, -1);
    }

    // Add append item if provided - this becomes the "current" page
    if (append) {
        breadcrumbItems?.push({
            name: formatSegmentName(append),
            path: location.pathname,
        });
    }

    /**
     * Handles breadcrumb click navigation
     * 
     * @param {string} path - Target path to navigate to
     */
    const handleBreadcrumbClick = (path: string) => {
        navigate(path);
    };

    return {
        breadcrumbItems,
        handleBreadcrumbClick,
    };
};