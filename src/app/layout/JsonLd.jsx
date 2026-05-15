import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://www.tommasoberti.com";

export default function JsonLd() {
    const { i18n } = useTranslation();
    const language = i18n.language?.toLowerCase().startsWith("it") ? "it" : "en";

    const jsonLd = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": `${SITE_URL}/#website`,
                    url: SITE_URL,
                    name: "Tommaso Berti",
                    inLanguage: ["en", "it"],
                },
                {
                    "@type": "Person",
                    "@id": `${SITE_URL}/#person`,
                    name: "Tommaso Berti",
                    url: SITE_URL,
                    jobTitle: "Software Developer",
                    image: `${SITE_URL}/og-profile.jpeg`,
                    sameAs: [
                        "https://github.com/tommaso-berti",
                        "https://www.linkedin.com/in/tommasoberti/",
                    ],
                },
            ],
        }),
        []
    );

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            key={language}
        />
    );
}
