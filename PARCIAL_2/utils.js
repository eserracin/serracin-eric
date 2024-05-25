// utils.js
(() => {
    const utils = {
        hashCode(str) {
            let hash = 0;
            for (let i = 0, len = str.length; i < len; i++) {
                let chr = str.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }
    };

    // Attach the utils object to the global window object
    window.Util = utils;
})();
