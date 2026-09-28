import CelestialProjectMap from "@/features/mission-ui/CelestialProjectMap.jsx";

export default function IdentityVisualizer({ t, items }) {
    return <CelestialProjectMap items={items} labels={{ title: t("visual.title") }} decorative />;
}
