function InputField() {
    let value="test"
    return(
    <input value={value}onChange={e=>{value=e.target.value}}    />
    )
    }
    export default InputField
    