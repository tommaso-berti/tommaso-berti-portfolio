import { createContext, useContext, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { BREADCRUMB_CONTEXT_DEFINITIONS } from "../app/routing/appDefinitions.js";

const BreadCrumbContext = createContext(null);

export function BreadCrumbProvider({ children }) {
    const { t } = useTranslation();

    const breadcrumb = useMemo(
        () =>
            Object.fromEntries(
                Object.entries(BREADCRUMB_CONTEXT_DEFINITIONS).map(([contextId, definition]) => [
                    contextId,
                    {
                        type: definition.type,
                        items: definition.items.map((item) => ({
                            id: item.id,
                            title: t(
                                item.titleKey.startsWith("nav.")
                                    ? `common:${item.titleKey}`
                                    : `pages:${item.titleKey}`,
                                { defaultValue: item.fallback ?? item.id }
                            ),
                        })),
                    },
                ])
            ),
        [t]
    );

    const value = useMemo(() => ({ breadcrumb }), [breadcrumb]);

    return <BreadCrumbContext.Provider value={value}>{children}</BreadCrumbContext.Provider>;
}

export const useBreadcrumb = () => useContext(BreadCrumbContext);
