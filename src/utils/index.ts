/**
 * Capitalizes the first letter of each word in the given text.
 *
 * @param {string} text - The input string to capitalize.
 * @returns {string} The input string with each word capitalized.
 */
export const capitalizeWords = (text: string) => {
    if (!text) return "";
    return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
