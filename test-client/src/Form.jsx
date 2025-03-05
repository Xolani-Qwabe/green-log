import { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";

function Form() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        const formdata = { email: email, password: password }
        console.log("Form Submitted!", formdata)
    }

    const handleEmailChange = (e) => {
        console.log(`${e.target.value}`)
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        console.log(`${e.target.value}`)
        setPassword(e.target.value)
    }

    return (
        <div >
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#ffe",
                    padding: "2rem",
                    gap: "0.8rem"
                }}
                action=""
                onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    style={{
                        borderRadius: "24px",
                        padding: "1rem"
                    }}
                    id="email"
                    value={email}
                    type="text"
                    placeholder='Email'
                    onChange={handleEmailChange}
                />
                <label htmlFor="password">Password</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                        style={{
                            borderRadius: "24px",
                            padding: "1rem",
                            width: "100%",
                            
                        }}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Eye Icon Button */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            background: "none",
                            border: "none",
                            borderRadius:'24px',
                            cursor: "pointer"
                        }}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <button
                    style={{
                        borderRadius: "24px",
                        padding: "1rem"
                    }}
                    type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Form