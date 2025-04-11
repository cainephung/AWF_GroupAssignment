import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            {/* Header section with logo and nav buttons*/}
            <header className="navbar">
                <div className="container navbar-content">
                    <div className="logo">Photo<span className="highlight">Hub</span></div>

                    {/* Naviagation buttons to login/register pages*/}
                    <div className="auth-buttons">
                        <Link to="/login" className="auth-btn">Login</Link>
                        <Link to="/register" className="auth-btn">Register</Link>
                    </div>
                </div>
            </header>

            <main className="container main-content">
                {/* Upload button */}
                <h1>Upload your photos today!</h1>
                <button className="upload-btn">Upload</button>
            </main>
        </>
    );
}
