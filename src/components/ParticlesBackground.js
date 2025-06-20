import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        // We go back to a single, simple particle definition
        particles: {
            number: {
                value: 60, // A healthy number of particles on screen at all times
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: ["#ff5e00", "#ffb000", "#ffca3a", "#ffffff"],
            },
            shape: {
                type: "circle",
            },
            shadow: {
                enable: true,
                color: "#ff8c00",
                blur: 20,
            },
            opacity: {
                value: { min: 0.3, max: 1 },
                animation: {
                    enable: true,
                    speed: 0.8,
                    startValue: "random",
                    // IMPORTANT: We don't destroy particles based on opacity
                    destroy: "none",
                },
            },
            size: {
                value: { min: 1, max: 8 },
                animation: {
                    enable: true,
                    speed: 3,
                    startValue: "random", // Some start big, some start small
                    // --- THE SINGLE MOST IMPORTANT CHANGE ---
                    // By setting destroy to "none", particles will loop their animation
                    // instead of disappearing forever. This guarantees particles are always present.
                    destroy: "none",
                    sync: false,
                },
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    // This makes particles that go off-screen reappear on the other side.
                    // This also guarantees a constant number of particles.
                    default: "out",
                },
            },
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble",
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    duration: 2,
                    opacity: 1,
                    size: 12,
                },
            },
        },
        detectRetina: true,
    };

    return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticlesBackground;