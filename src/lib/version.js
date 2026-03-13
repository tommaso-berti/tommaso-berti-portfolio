import rawVersion from '../../VERSION?raw';

const envVersion = `${import.meta.env.VITE_APP_VERSION ?? ''}`.trim();
const fileVersion = `${rawVersion ?? ''}`.trim();

export const APP_VERSION = envVersion || fileVersion || '0.0.0';
