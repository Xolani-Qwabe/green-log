import React from 'react'

export const MyButton = ({ size, p, bgc, tcolor, border, text, handleSubmit }) => {
    const style = {
        minHeight: `${size}vh`,
        minWidth: `${size * 2}vh`,
        padding: `${p}em`,
        color: `${tcolor}`,
        backgroundColor: `${bgc}`,
        borderRadius: "50px",
        borderColor: `${tcolor}`,
        fontSize: `.8${size}rem`,
        fontWeight: "700",
        cursor:"pointer"
        
    }
    return (
        <button type="submit" style={style}>
                {text}
        </button >
    )
}

