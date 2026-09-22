export const ABOUT_MODULES = ["identity", "technical", "certifications", "development", "method", "beyond"];
const HASH_MODULES = { bio: "identity", "tech-skills": "technical", certifications: "certifications", "study-and-experience": "development", hobbies: "beyond" };

export function getAboutModuleFromHash(hash) {
    return HASH_MODULES[String(hash || "").replace(/^#/, "")] || "identity";
}
