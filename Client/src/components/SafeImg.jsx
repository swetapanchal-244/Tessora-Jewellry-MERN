import { useState } from "react";

export default function SafeImg({ src, alt, className = "" }) {
    const [failed, setFailed] = useState(false);

    if (failed)
        return (
            <div className={`flex items-center justify-center text-softgold text-5xl ${className}`}>
                ✦
            </div>
        );

    return (
        <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
    );
}