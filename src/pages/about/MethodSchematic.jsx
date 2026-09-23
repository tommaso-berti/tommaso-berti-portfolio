import { Box, useTheme } from "@mui/material";

const monoFont = '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

function Label({ x, y, children, anchor = "middle", size = 8.5, opacity = 1 }) {
    return <text x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontFamily={monoFont} fontSize={size} fill="currentColor" opacity={opacity}>{children}</text>;
}

function SchematicFrame({ children, title, description }) {
    const theme = useTheme();
    const titleId = `method-schematic-${title.toLowerCase().replaceAll(" ", "-")}`;

    return <Box sx={{ mt: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.default", overflow: "hidden" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, px: 1.25, py: 1, borderBottom: "1px solid", borderColor: "divider", fontFamily: (theme) => theme.typography.overline.fontFamily, fontSize: ".58rem", letterSpacing: ".13em", textTransform: "uppercase", color: "text.secondary" }}>
            <span>{title}</span><span aria-hidden="true">{description}</span>
        </Box>
        <Box sx={{ p: { xs: 1, sm: 1.5 }, color: "text.primary" }}>
            <svg viewBox="0 0 420 190" role="img" aria-labelledby={titleId} style={{ display: "block", width: "100%", height: "auto" }}>
                <title id={titleId}>{title}</title>
                <defs>
                    <pattern id="method-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="currentColor" strokeOpacity=".12" vectorEffect="non-scaling-stroke" /></pattern>
                    <marker id="method-arrow" viewBox="0 0 10 10" refX="8.2" refY="5" markerWidth="5.4" markerHeight="5.4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="currentColor" opacity=".78" /></marker>
                </defs>
                <rect x="0" y="0" width="420" height="190" fill={theme.palette.background.default} />
                <rect x="0" y="0" width="420" height="190" fill="url(#method-grid)" />
                <rect x="8.5" y="8.5" width="403" height="173" fill="none" stroke="currentColor" strokeOpacity=".16" vectorEffect="non-scaling-stroke" />
                {children}
            </svg>
        </Box>
    </Box>;
}

function FramingSchematic({ labels }) {
    const theme = useTheme();

    return <SchematicFrame title={labels.title} description={labels.code}>
        <Label x="24" y="23" anchor="start" opacity=".7">{labels.input}</Label><Label x="210" y="23" opacity=".7">{labels.core}</Label><Label x="396" y="23" anchor="end" opacity=".7">{labels.output}</Label>
        <g stroke="currentColor" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke">
            <rect x="24.5" y="36.5" width="92" height="24" rx="2" /><rect x="24.5" y="80.5" width="92" height="24" rx="2" /><rect x="24.5" y="124.5" width="92" height="24" rx="2" />
            <path d="M116.5 48.5H166.5M116.5 92.5H166.5M116.5 136.5H166.5" strokeDasharray="4 4" markerEnd="url(#method-arrow)" />
            <circle cx="210.5" cy="92.5" r="34" /><circle cx="210.5" cy="92.5" r="18" />
            <path d="M244.5 82.5H306.5M244.5 102.5H306.5" strokeDasharray="4 4" markerEnd="url(#method-arrow)" />
            <rect x="306.5" y="50.5" width="92" height="24" rx="2" /><rect x="306.5" y="110.5" width="92" height="24" rx="2" />
            <path d="M146.5 38.5V148.5M274.5 38.5V148.5" strokeOpacity=".16" />
        </g>
        <rect x="186.5" y="80.5" width="48" height="24" fill={theme.palette.background.default} />
        <rect x="261" y="68" width="42" height="14" fill={theme.palette.background.default} /><rect x="261" y="96" width="42" height="14" fill={theme.palette.background.default} />
        <Label x="70" y="48.5">{labels.objective}</Label><Label x="70" y="92.5">{labels.context}</Label><Label x="70" y="136.5">{labels.constraints}</Label><Label x="210.5" y="87.5">{labels.real}</Label><Label x="210.5" y="99.5">{labels.problem}</Label><Label x="272" y="75" size={8} opacity=".58">{labels.synth}</Label><Label x="272" y="103" size={8} opacity=".58">{labels.define}</Label><Label x="352.5" y="62.5" size={labels.scope.length > 12 ? 7.6 : 8.5}>{labels.scope}</Label><Label x="352.5" y="122.5" size={labels.path.length > 15 ? 7.1 : 8.5}>{labels.path}</Label><Label x="24" y="168" anchor="start" size={8} opacity=".7">{labels.footer}</Label>
    </SchematicFrame>;
}

function TradeoffSchematic({ labels }) {
    const theme = useTheme();

    return <SchematicFrame title={labels.title} description={labels.code}>
        <Label x="24" y="23" anchor="start" opacity=".7">{labels.paths}</Label><Label x="220" y="23" opacity=".7">{labels.matrix}</Label><Label x="396" y="23" anchor="end" opacity=".7">{labels.delivery}</Label>
        <g stroke="currentColor" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke">
            <rect x="26.5" y="42.5" width="88" height="22" rx="2" /><rect x="26.5" y="84.5" width="88" height="22" rx="2" /><rect x="26.5" y="126.5" width="88" height="22" rx="2" />
            <path d="M114.5 53.5H160.5M114.5 95.5H160.5M114.5 137.5H160.5" strokeDasharray="4 4" markerEnd="url(#method-arrow)" /><rect x="160.5" y="36.5" width="116" height="118" rx="2" />
            <path d="M199.5 36.5V154.5M238.5 36.5V154.5M160.5 75.5H276.5M160.5 114.5H276.5" strokeOpacity=".24" /><circle cx="180" cy="55.5" r="4" /><circle cx="219" cy="94.5" r="4" /><circle cx="258" cy="133.5" r="4" /><circle cx="180" cy="133.5" r="4" opacity=".30" /><circle cx="258" cy="55.5" r="4" opacity=".30" /><path d="M276.5 95.5H314.5" strokeDasharray="4 4" markerEnd="url(#method-arrow)" /><rect x="314.5" y="76.5" width="82" height="38" rx="2" />
        </g>
        <Label x="70" y="53.5" size={labels.optionA.length > 9 ? 7.7 : 8.5}>{labels.optionA}</Label><Label x="70" y="95.5" size={labels.optionB.length > 9 ? 7.7 : 8.5}>{labels.optionB}</Label><Label x="70" y="137.5" size={labels.optionC.length > 9 ? 7.7 : 8.5}>{labels.optionC}</Label><Label x="180" y="51" size={8}>{labels.time}</Label><Label x="219" y="51" size={8}>{labels.cost}</Label><Label x="258" y="51" size={labels.maintenance.length > 5 ? 7.2 : 8}>{labels.maintenance}</Label><Label x="180" y="90" size={8}>{labels.low}</Label><Label x="219" y="90" size={8}>{labels.mid}</Label><Label x="258" y="90" size={8}>{labels.high}</Label><rect x="283" y="84" width="25" height="14" fill={theme.palette.background.default} /><Label x="295" y="88" size={8} opacity=".58">{labels.select}</Label><Label x="355.5" y="91.5" size={labels.useful.length > 8 ? 7.3 : 8.5}>{labels.useful}</Label><Label x="355.5" y="103.5" size={labels.progress.length > 8 ? 7.3 : 8.5}>{labels.progress}</Label><Label x="24" y="168" anchor="start" size={8} opacity=".7">{labels.footer}</Label>
    </SchematicFrame>;
}

function IterationSchematic({ labels }) {
    const theme = useTheme();

    return <SchematicFrame title={labels.title} description={labels.code}>
        <Label x="24" y="23" anchor="start" opacity=".7">{labels.loop}</Label><Label x="396" y="23" anchor="end" opacity=".7">{labels.check}</Label>
        <g stroke="currentColor" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke">
            <circle cx="132.5" cy="94.5" r="45" strokeOpacity=".35" /><path d="M132.5 49.5A45 45 0 0 1 177.5 94.5M177.5 94.5A45 45 0 0 1 132.5 139.5M132.5 139.5A45 45 0 0 1 87.5 94.5M87.5 94.5A45 45 0 0 1 132.5 49.5" markerEnd="url(#method-arrow)" />
            <circle cx="132.5" cy="49.5" r="3.2" /><circle cx="177.5" cy="94.5" r="3.2" /><circle cx="132.5" cy="139.5" r="3.2" /><circle cx="87.5" cy="94.5" r="3.2" /><path d="M177.5 94.5H244.5M244.5 53.5V135.5" strokeDasharray="4 4" /><path d="M244.5 53.5H282.5M244.5 94.5H282.5M244.5 135.5H282.5" strokeDasharray="4 4" markerEnd="url(#method-arrow)" /><rect x="282.5" y="41.5" width="110" height="24" rx="2" /><rect x="282.5" y="82.5" width="110" height="24" rx="2" /><rect x="282.5" y="123.5" width="110" height="24" rx="2" />
        </g>
        <rect x="113" y="42" width="39" height="14" fill={theme.palette.background.default} /><rect x="160" y="88" width="36" height="13" fill={theme.palette.background.default} /><rect x="109" y="134" width="47" height="14" fill={theme.palette.background.default} /><rect x="70" y="88" width="34" height="13" fill={theme.palette.background.default} /><rect x="250" y="45" width="26" height="12" fill={theme.palette.background.default} /><rect x="250" y="86" width="26" height="12" fill={theme.palette.background.default} /><rect x="250" y="127" width="26" height="12" fill={theme.palette.background.default} />
        <Label x="132.5" y="49.5">{labels.ship}</Label><Label x="178" y="94.5" size={8}>{labels.observe}</Label><Label x="132.5" y="139.5">{labels.refine}</Label><Label x="87.5" y="94.5" size={8}>{labels.learn}</Label><Label x="263" y="51" size={8} opacity=".58">{labels.collect}</Label><Label x="263" y="92" size={8} opacity=".58">{labels.audit}</Label><Label x="263" y="133" size={8} opacity=".58">{labels.planAction}</Label><Label x="337.5" y="53.5" size={labels.feedback.length > 14 ? 7.2 : 8.5}>{labels.feedback}</Label><Label x="337.5" y="94.5" size={labels.friction.length > 14 ? 7.2 : 8.5}>{labels.friction}</Label><Label x="337.5" y="135.5" size={labels.plan.length > 16 ? 6.8 : 8.5}>{labels.plan}</Label><Label x="24" y="168" anchor="start" size={8} opacity=".7">{labels.footer}</Label>
    </SchematicFrame>;
}

export default function MethodSchematic({ type, labels }) {
    if (type === "tradeoff") return <TradeoffSchematic labels={labels} />;
    if (type === "iteration") return <IterationSchematic labels={labels} />;
    return <FramingSchematic labels={labels} />;
}
