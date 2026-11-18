import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <p className="font-display text-8xl text-softgold">404</p>
            <h1 className="font-display text-4xl text-wine mt-2">Page not found</h1>
            <p className="text-charcoal/70 mt-3">The page you are looking for doesn't exist.</p>
            <Link to="/" className="btn-gold mt-8 inline-block">Back to Home</Link>
        </div>
    );
}