import { useId } from "react";
import { Box, useTheme } from "@mui/material";

const monoFont = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

function Label({ x, y, children, anchor = "middle", size = 9, opacity = 1, letterSpacing }) {
    return <text x={x} y={y} textAnchor={anchor} fontFamily={monoFont} fontSize={size} fill="currentColor" opacity={opacity} letterSpacing={letterSpacing}>{children}</text>;
}

function SchematicFrame({ children, title, description, idSuffix }) {
    const theme = useTheme();
    const id = useId().replaceAll(":", "");
    const titleId = `method-schematic-title-${id}-${idSuffix}`;
    const descriptionId = `method-schematic-description-${id}-${idSuffix}`;

    return <Box sx={{ mt: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.default", overflow: "hidden" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, px: 1.25, py: 1, borderBottom: "1px solid", borderColor: "divider", fontFamily: (currentTheme) => currentTheme.typography.overline.fontFamily, fontSize: ".58rem", letterSpacing: ".13em", textTransform: "uppercase", color: "text.secondary" }}>
            <span>{title}</span><span aria-hidden="true">{description}</span>
        </Box>
        <Box sx={{ p: { xs: 1, sm: 1.5 }, color: "text.primary" }}>
            <svg viewBox="0 0 640 260" role="img" aria-labelledby={`${titleId} ${descriptionId}`} style={{ display: "block", width: "100%", height: "auto" }}>
                <title id={titleId}>{title}</title><desc id={descriptionId}>{title}</desc>
                <defs>
                    <pattern id={`method-grid-${id}`} width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="currentColor" strokeOpacity=".045" strokeWidth=".7" /></pattern>
                    <marker id={`method-arrow-${id}`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.4" markerHeight="5.4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="currentColor" opacity=".82" /></marker>
                    <marker id={`method-arrow-mid-${id}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5.2" markerHeight="5.2" markerUnits="strokeWidth" orient="auto"><path d="M0 0L10 5L0 10Z" fill="currentColor" opacity=".88" /></marker>
                </defs>
                <rect width="640" height="260" fill={theme.palette.background.default} /><rect width="640" height="260" fill={`url(#method-grid-${id})`} /><rect x="10.5" y="10.5" width="619" height="239" fill="none" stroke="currentColor" strokeOpacity=".15" vectorEffect="non-scaling-stroke" />
                {children({ arrow: `url(#method-arrow-${id})`, arrowMid: `url(#method-arrow-mid-${id})`, background: theme.palette.background.default })}
            </svg>
        </Box>
    </Box>;
}

const header = { size: 9, opacity: .7, letterSpacing: "1.25px" };
const small = { size: 8, opacity: .6 };
const extraSmall = { size: 7.2, opacity: .62, letterSpacing: ".45px" };

function FramingSchematic({ labels }) {
    return <SchematicFrame title={labels.title} description={labels.code} idSuffix="framing">{({ arrow, background }) => <>
        <Label x="28" y="30" anchor="start" {...header}>{labels.input}</Label><Label x="274" y="30" {...header}>{labels.core}</Label><Label x="612" y="30" anchor="end" {...header}>{labels.output}</Label>
        <g stroke="currentColor" strokeWidth="1.25" fill="none" vectorEffect="non-scaling-stroke">
            <rect fill={background} x="28.5" y="48.5" width="126" height="29" rx="2" /><rect fill={background} x="28.5" y="91.5" width="126" height="29" rx="2" /><rect fill={background} x="28.5" y="134.5" width="126" height="29" rx="2" /><rect fill={background} x="28.5" y="177.5" width="126" height="29" rx="2" />
            <path d="M154.5 63H194" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M154.5 106H194" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M154.5 149H194" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M154.5 192H194" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M204 54V201" strokeOpacity=".18" />
            <circle cx="274" cy="127" r="54" /><circle cx="274" cy="127" r="37" strokeOpacity=".18" /><path d="M220 127H328M274 73V181" strokeOpacity=".18" />
            <path d="M328 127H375" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M388 61V193" strokeOpacity=".18" />
            <rect fill={background} x="404.5" y="49.5" width="205" height="31" rx="2" /><rect fill={background} x="404.5" y="104.5" width="205" height="31" rx="2" /><rect fill={background} x="404.5" y="159.5" width="205" height="31" rx="2" /><path d="M388 65H404" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M388 120H404" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M388 175H404" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M28 216H609" strokeOpacity=".18" />
        </g>
        <Label x="91.5" y="66.5">{labels.objective}</Label><Label x="91.5" y="109.5">{labels.context}</Label><Label x="91.5" y="152.5">{labels.constraints}</Label><Label x="91.5" y="195.5">{labels.successSignal}</Label><Label x="274" y="130">{labels.real}</Label><Label x="351" y="119" {...small}>{labels.synth}</Label><Label x="507" y="68">{labels.scope}</Label><Label x="507" y="123">{labels.criteria}</Label><Label x="507" y="178" size={labels.path.length > 17 ? 8 : 9}>{labels.path}</Label>
        <Label x="103" y="229" {...extraSmall}>{labels.discover}</Label><Label x="286" y="229" {...extraSmall}>{labels.frame}</Label><Label x="551" y="229" {...extraSmall}>{labels.decide}</Label>
    </> }</SchematicFrame>;
}

function TradeoffSchematic({ labels }) {
    return <SchematicFrame title={labels.title} description={labels.code} idSuffix="tradeoff">{({ arrow, background }) => <>
        <Label x="28" y="30" anchor="start" {...header}>{labels.paths}</Label><Label x="316" y="30" {...header}>{labels.matrix}</Label><Label x="612" y="30" anchor="end" {...header}>{labels.delivery}</Label>
        <g stroke="currentColor" strokeWidth="1.25" fill="none" vectorEffect="non-scaling-stroke">
            <rect fill={background} x="28.5" y="58.5" width="120" height="32" rx="2" /><rect fill={background} x="28.5" y="113.5" width="120" height="32" rx="2" /><rect fill={background} x="28.5" y="168.5" width="120" height="32" rx="2" /><rect fill={background} x="188.5" y="49.5" width="280" height="160" rx="2" /><path d="M188.5 99.5H468.5M188.5 154.5H468.5M246.5 49.5V209.5M301.5 49.5V209.5M356.5 49.5V209.5M411.5 49.5V209.5" strokeOpacity=".18" /><path d="M148.5 74.5H188" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M148.5 129.5H188" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M148.5 184.5H188" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M468.5 129.5H500" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><rect fill={background} x="500.5" y="102.5" width="111" height="54" rx="2" /><path d="M28 216H611" strokeOpacity=".18" />
        </g>
        <g fill="currentColor" opacity=".22"><rect x="420" y="87" width="40" height="3" rx="1.5" /><rect x="420" y="142" width="40" height="3" rx="1.5" /><rect x="420" y="197" width="40" height="3" rx="1.5" /></g><g fill="currentColor"><rect x="420" y="87" width="30" height="3" rx="1.5" /><rect x="420" y="142" width="35" height="3" rx="1.5" /><rect x="420" y="197" width="27" height="3" rx="1.5" /></g>
        <Label x="88.5" y="74.5">{labels.optionA}</Label><Label x="88.5" y="129.5">{labels.optionB}</Label><Label x="88.5" y="184.5">{labels.optionC}</Label><Label x="219" y="62" {...extraSmall}>{labels.time}</Label><Label x="274" y="62" {...extraSmall}>{labels.cost}</Label><Label x="329" y="62" {...extraSmall}>{labels.maintenance}</Label><Label x="384" y="62" {...extraSmall}>{labels.risk}</Label><Label x="440" y="62" {...extraSmall}>{labels.score}</Label>
        <Label x="219" y="80" {...extraSmall}>{labels.fast}</Label><Label x="274" y="80" {...extraSmall}>{labels.low}</Label><Label x="329" y="80" {...extraSmall}>{labels.mid}</Label><Label x="384" y="80" {...extraSmall}>{labels.mid}</Label><Label x="440" y="82">76</Label><Label x="219" y="135" {...extraSmall}>{labels.mid}</Label><Label x="274" y="135" {...extraSmall}>{labels.mid}</Label><Label x="329" y="135" {...extraSmall}>{labels.high}</Label><Label x="384" y="135" {...extraSmall}>{labels.low}</Label><Label x="440" y="137">88</Label><Label x="219" y="190" {...extraSmall}>{labels.slow}</Label><Label x="274" y="190" {...extraSmall}>{labels.high}</Label><Label x="329" y="190" {...extraSmall}>{labels.high}</Label><Label x="384" y="190" {...extraSmall}>{labels.mid}</Label><Label x="440" y="192">69</Label>
        <Label x="556" y="118" {...small}>{labels.selected}</Label><Label x="556" y="135">{labels.optionB}</Label><Label x="556" y="148" {...extraSmall}>{labels.usefulProgress}</Label><Label x="88" y="229" {...extraSmall}>{labels.candidates}</Label><Label x="328" y="229" {...extraSmall}>{labels.tradeoffs}</Label><Label x="555" y="229" {...extraSmall}>{labels.deliveryShort}</Label>
    </> }</SchematicFrame>;
}

function IterationSchematic({ labels }) {
    return <SchematicFrame title={labels.title} description={labels.code} idSuffix="iteration">{({ arrow, arrowMid, background }) => <>
        <Label x="28" y="30" anchor="start" {...header}>{labels.loop}</Label><Label x="487" y="30" anchor="start" {...header}>{labels.check}</Label>
        <g fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" markerMid={arrowMid}>
            <path d="M178 60A68 68 0 0 1 226.083 79.917A68 68 0 0 1 246 128" /><path d="M246 128A68 68 0 0 1 226.083 176.083A68 68 0 0 1 178 196" /><path d="M178 196A68 68 0 0 1 129.917 176.083A68 68 0 0 1 110 128" /><path d="M110 128A68 68 0 0 1 129.917 79.917A68 68 0 0 1 178 60" /><rect fill={background} x="150" y="49" width="56" height="22" rx="2" /><rect fill={background} x="232" y="117" width="66" height="22" rx="2" /><rect fill={background} x="148" y="185" width="60" height="22" rx="2" /><rect fill={background} x="61" y="117" width="63" height="22" rx="2" /><path d="M298 128H338" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M338 76V180" strokeOpacity=".18" /><path d="M338 76H386" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M338 128H386" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><path d="M338 180H386" strokeWidth="1.2" strokeDasharray="5 5" markerEnd={arrow} /><rect fill={background} x="386.5" y="58.5" width="224" height="34" rx="2" /><rect fill={background} x="386.5" y="110.5" width="224" height="34" rx="2" /><rect fill={background} x="386.5" y="162.5" width="224" height="34" rx="2" /><path d="M28 216H610" strokeOpacity=".18" />
        </g>
        <Label x="178" y="60">{labels.ship}</Label><Label x="265" y="128">{labels.observe}</Label><Label x="178" y="196">{labels.learn}</Label><Label x="92.5" y="128">{labels.refine}</Label><Label x="111" y="76" {...extraSmall}>{labels.validate}</Label><Label x="245" y="76" {...extraSmall}>{labels.release}</Label><Label x="111" y="186" {...extraSmall}>{labels.prioritize}</Label><Label x="245" y="186" {...extraSmall}>{labels.measure}</Label>
        <Label x="498.5" y="75.5">{labels.feedback}</Label><Label x="498.5" y="127.5">{labels.friction}</Label><Label x="498.5" y="179.5" size={labels.plan.length > 18 ? 8 : 9}>{labels.plan}</Label><Label x="347" y="72" anchor="start" {...extraSmall}>{labels.collect}</Label><Label x="347" y="124" anchor="start" {...extraSmall}>{labels.audit}</Label><Label x="347" y="176" anchor="start" {...extraSmall}>{labels.planAction}</Label><Label x="319" y="229" {...extraSmall}>{labels.footer}</Label>
    </> }</SchematicFrame>;
}

export default function MethodSchematic({ type, labels }) {
    if (type === "tradeoff") return <TradeoffSchematic labels={labels} />;
    if (type === "iteration") return <IterationSchematic labels={labels} />;
    return <FramingSchematic labels={labels} />;
}
