// Global state object for managing selected map, settings, and best times
// This object will be imported and used by all scenes
const GlobalState = {
    selectedMap: null,
    settings: {
        audio: { musicVolume: 1, sfxVolume: 1 },
        controls: { up: 'W', down: 'S', left: 'A', right: 'D', drift: 'SPACE' },
        graphics: { quality: 'high', fullscreen: false },
        gameplay: { ghostCar: false }
    },
    bestTimes: {}, // { mapId: bestTime }
    load() {
        // Load settings and best times from localStorage
        const settings = localStorage.getItem('carGameSettings');
        if (settings) this.settings = JSON.parse(settings);
        const bestTimes = localStorage.getItem('carGameBestTimes');
        if (bestTimes) this.bestTimes = JSON.parse(bestTimes);
    },
    save() {
        localStorage.setItem('carGameSettings', JSON.stringify(this.settings));
        localStorage.setItem('carGameBestTimes', JSON.stringify(this.bestTimes));
    }
};

// Make available globally
window.GlobalState = GlobalState;
