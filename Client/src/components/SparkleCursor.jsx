import { useEffect } from "react";

export default function SparkleCursor() {
    useEffect(() => {
        // touch devices par band
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let last = 0;
        const onMove = (e) => {
            const now = Date.now();
            if (now - last < 60) return;
            last = now;

            const s = document.createElement("span");
            s.textContent = Math.random() > 0.5 ? "✦" : "✧";
            const size = 8 + Math.random() * 12;
            const dx = (Math.random() - 0.5) * 40;
            s.style.cssText = `
        position:fixed; left:${e.clientX}px; top:${e.clientY}px;
        font-size:${size}px; color:#c19a4b; pointer-events:none; z-index:95;
        transform:translate(-50%,-50%); transition:all .8s ease-out; opacity:1;
      `;
            document.body.appendChild(s);

            requestAnimationFrame(() => {
                s.style.opacity = "0";
                s.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + 30px)) scale(.2) rotate(120deg)`;
            });
            setTimeout(() => s.remove(), 850);
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return null;
}