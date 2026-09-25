const GOLDEN_ANGLE = 137.507764;
const PALETTE = ["#347CB2", "#DF733D", "#D0AB3D", "#C94F4A", "#668A69"];
const PLANET_IMAGES = ["neptune.png", "mars.png", "mercury.png", "mars.png", "earth.png"];
const PLANET_IMAGE_BY_ACCENT = Object.fromEntries(PALETTE.map((accent, index) => [
    accent,
    `/assets/celestial-project-map/${PLANET_IMAGES[index]}`,
]));

export function getCelestialAccent(project, index = 0) {
    return project?.accent || PALETTE[index % PALETTE.length];
}

export function createOrbitConfig(project, index) {
    const orbit = project.orbit || {};
    const wave = Math.sin((index + 1) * 1.91);
    const accent = getCelestialAccent(project, index);
    return {
        radius: orbit.radius ?? 128 + index * 42,
        phase: orbit.phase ?? ((index * GOLDEN_ANGLE) * Math.PI) / 180,
        speed: orbit.speed ?? 0.000045 / (1 + index * 0.2),
        tiltX: orbit.tiltX ?? 22 + wave * 24,
        tiltY: orbit.tiltY ?? Math.cos((index + 1) * 1.37) * 16,
        tiltZ: orbit.tiltZ ?? ((index * 43) % 72) - 36,
        size: orbit.size ?? Math.max(9, 15 - index * 0.65),
        accent,
        bodyImage: PLANET_IMAGE_BY_ACCENT[accent.toUpperCase()] || PLANET_IMAGE_BY_ACCENT[PALETTE[index % PALETTE.length]],
    };
}

const rad = (value) => (value * Math.PI) / 180;
const rotateX = (p, angle) => ({ x: p.x, y: p.y * Math.cos(angle) - p.z * Math.sin(angle), z: p.y * Math.sin(angle) + p.z * Math.cos(angle) });
const rotateY = (p, angle) => ({ x: p.x * Math.cos(angle) + p.z * Math.sin(angle), y: p.y, z: -p.x * Math.sin(angle) + p.z * Math.cos(angle) });
const rotateZ = (p, angle) => ({ x: p.x * Math.cos(angle) - p.y * Math.sin(angle), y: p.x * Math.sin(angle) + p.y * Math.cos(angle), z: p.z });

export function getOrbitPoint(orbit, angle) {
    let point = { x: orbit.radius * Math.cos(angle), y: 0, z: orbit.radius * Math.sin(angle) };
    point = rotateX(point, rad(orbit.tiltX));
    point = rotateZ(point, rad(orbit.tiltZ));
    return rotateY(point, rad(orbit.tiltY));
}

export function projectPoint(point, yaw, pitch, center = { x: 460, y: 300 }) {
    let cameraPoint = rotateY(point, rad(yaw));
    cameraPoint = rotateX(cameraPoint, rad(pitch));
    const scale = 720 / Math.max(320, 780 - cameraPoint.z);
    return { x: center.x + cameraPoint.x * scale, y: center.y + cameraPoint.y * scale, z: cameraPoint.z, scale };
}

export const smoothstep = (min, max, value) => {
    const amount = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return amount * amount * (3 - 2 * amount);
};
