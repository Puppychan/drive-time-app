export function capitalizeAndSeparate(str: string) {
    // Split the string into words
    const words = str.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them with a space
    return words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}