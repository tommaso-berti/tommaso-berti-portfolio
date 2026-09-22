export function buildConnectorPaths(diagramElement, cardElements, dotElements, blueprint) {
    if (!diagramElement) return [];
    const diagramRect = diagramElement.getBoundingClientRect();
    return blueprint.nodes.flatMap((node) => {
        const card = cardElements.get(node.id);
        const dot = dotElements.get(node.id);
        if (!card || !dot) return [];
        const cardRect = card.getBoundingClientRect();
        const dotRect = dot.getBoundingClientRect();
        const startX = node.side === "left" ? cardRect.right : cardRect.left;
        const endX = dotRect.left + dotRect.width / 2;
        const startY = cardRect.top + cardRect.height / 2;
        const endY = dotRect.top + dotRect.height / 2;
        const x1 = startX - diagramRect.left;
        const x2 = endX - diagramRect.left;
        const y1 = startY - diagramRect.top;
        const y2 = endY - diagramRect.top;
        const bend = node.side === "left" ? x1 + 30 : x1 - 30;
        return [{ id: node.id, d: `M ${x1} ${y1} L ${bend} ${y1} L ${x2} ${y2}` }];
    });
}
