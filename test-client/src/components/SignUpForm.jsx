import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    // Handle form submission for local signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/local",
                { email, password },
                { withCredentials: true }
            );

            console.log("Signup Successful!", response.data);

            // Redirect to home after successful signup
            if (response.status === 201) {
                navigate("/home");
            }
        } catch (err) {
            setError("Signup failed. Please try again.");
            console.error("Signup Failed:", err.response?.data || err.message);
        }
    };

    // Redirect to Google OAuth
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/api/auth/google";
    };

    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffe",
                padding: "2rem",
                gap: "0.8rem",
                maxWidth: "300px"
            }}
            onSubmit={handleSubmit}
        >
            <label htmlFor="email">Email</label>
            <input
                style={{
                    borderRadius: "24px",
                    padding: "1rem",
                }}
                id="email"
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                    style={{
                        borderRadius: "24px",
                        padding: "1rem",
                        width: "100%"
                    }}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: "absolute",
                        right: "10px",
                        background: "none",
                        border: "none",
                        borderRadius: "24px",
                        cursor: "pointer",
                    }}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            <button
                style={{
                    borderRadius: "24px",
                    padding: "1rem",
                }}
                type="submit"
            >
                Signup
            </button>

            {/* Google Signup Button */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                style={{
                    borderRadius: "24px",
                    padding: "1rem",
                    backgroundColor: "#DB4437",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "10px",
                }}
            >
                SignUp with Google
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

export default SignUpForm;
