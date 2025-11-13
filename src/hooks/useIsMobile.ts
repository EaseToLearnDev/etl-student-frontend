import { useEffect, useState } from "react";

// maximum width for mobile devices
const MOBILE_WIDTH = 768;

/**
 * returns true if current view is mobile, else returns false.
 */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_WIDTH);

    useEffect(() => {
        // handler to update the state on window resize
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_WIDTH);
        };

        // attach resize listener
        window.addEventListener('resize', handleResize);
        // clean up resize listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // return whether current view is mobile
    return isMobile;
};

export default useIsMobile;