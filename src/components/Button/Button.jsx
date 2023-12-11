const Button = ({onClick, label, type, style}) =>{
    return (
        <button type={type} onClick={onClick} style={style}>{label}</button>
    )
}

export default Button;