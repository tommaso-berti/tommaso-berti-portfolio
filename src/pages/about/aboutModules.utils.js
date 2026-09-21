export const ABOUT_MODULES = ["identity", "method", "development", "beyond"];
const HASH_MODULES = { bio: "identity", "tech-skills": "identity", certifications: "identity", "study-and-experience": "development", hobbies: "beyond" };

export function getAboutModuleFromHash(hash) {
    return HASH_MODULES[String(hash || "").replace(/^#/, "")] || "identity";
}
