import { FiChevronRight } from "react-icons/fi"
import { useBreadcrumbs } from "../../../hooks/useBreadCrumbs";

// Props interface for BreadCrumbs component
interface BreadCrumbsProps {
    append?: string;
    pop?: boolean;
}

/**
 * BreadCrumbs Component
 * 
 * Dynamically generates navigation breadcrumbs based on the current URL path.
 * Provides clickable navigation to parent routes and highlights the current page.
 * 
 * @param {BreadCrumbsProps} props - Component props
 * @returns {JSX.Element} Navigation breadcrumb component
 */
const BreadCrumbs = ({ append , pop }: BreadCrumbsProps) => {
    const { breadcrumbItems, handleBreadcrumbClick } = useBreadcrumbs({ append, pop });

    return (
        <nav className="flex items-center space-x-1 mb-4 ml-13 flex-wrap">
            {breadcrumbItems?.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;

                return (
                    <div key={index} className="flex items-center">
                        {/* Breadcrumb button */}
                        <button
                            onClick={() => handleBreadcrumbClick(item.path)}
                            className={`font-medium transition-colors duration-200 hover:opacity-80`}
                            disabled={isLast}
                            style={{
                                color: isLast ? 'var(--sb-ocean-bg-active)' : '',
                                cursor: isLast ? 'default' : 'pointer'
                            }}
                        >
                            {item.name}
                        </button>

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