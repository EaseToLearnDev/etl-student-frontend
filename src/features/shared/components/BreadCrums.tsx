import { useLocation } from "react-router"
import { FiChevronRight } from "react-icons/fi"

const BreadCrums = () => {
    const location = useLocation();

    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

    // Simple and effective formatting function
    const formatSegmentName = (segment: string): string => {
        return segment
            // Replace hyphens, underscores, and dots with spaces
            .replace(/[-]/g, ' ')
            // Capitalize each word
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Generate breadcrumb items dynamically
    const breadcrumbItems = pathSegments?.map((segment) => {
        return formatSegmentName(segment);
    });

    return (
        <nav className="flex items-center space-x-1 text- mb-4 flex-wrap">

            {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center">
                    <span className="font-medium">
                        {item}
                    </span>
                    <FiChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                </div>
            ))}
        </nav>
    )
}

export default BreadCrums;