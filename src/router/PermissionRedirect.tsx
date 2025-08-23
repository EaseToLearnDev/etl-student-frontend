// React
import { Navigate } from "react-router-dom";

// Hooks
import { useStudentStore } from "../features/shared/hooks/useStudentStore";

// Utils
import { getFilteredSubMenuItems } from "../utils/menuFilter";


interface PermissionRedirectProps {
  to: string;
  parentId: string;
  parentPath: string;
}

/**
 * Redirects the user based on their permissions to the appropriate route.
 */
export const PermissionRedirect = ({
  to,
  parentId,
  parentPath,
}: PermissionRedirectProps) => {
  const activeCourse = useStudentStore((state) => state.activeCourse);
  const defaultPath = `/${parentPath}${to}`;

  // Get all enabled sub-items for this parent
  const enabledSubItems = getFilteredSubMenuItems(parentId, activeCourse);

  // If our default path is enabled, use it
  if (enabledSubItems.some((item) => item.href === to)) {
    return <Navigate to={defaultPath} replace />;
  }

  // Otherwise redirect to first available sub-item
  if (enabledSubItems.length > 0) {
    return <Navigate to={`/${parentPath}${enabledSubItems[0].href}`} replace />;
  }

  // If no sub-items are available, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};
