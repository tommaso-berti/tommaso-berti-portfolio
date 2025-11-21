import * as Icons from "./index.js";

export const iconsMap = Object.fromEntries(
    Object.entries(Icons).map(([key, value]) => {
        const normalized = key
            .replace(/^Custom/, "")
            .replace(/Icon$/, "")
            .toLowerCase();
        return [normalized, value];
    })
);
