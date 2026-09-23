export const METHOD_PROCESS_IDS = ["clarity", "pragmatism", "iteration"];

export const METHOD_PROCESS_META = {
    clarity: { accent: "space.blue", signalPosition: "16%", schematic: "framing" },
    pragmatism: { accent: "space.yellow", signalPosition: "50%", schematic: "tradeoff" },
    iteration: { accent: "space.orange", signalPosition: "84%", schematic: "iteration" },
};

export function getMethodProcessId(index) {
    return METHOD_PROCESS_IDS[index] || METHOD_PROCESS_IDS[0];
}
