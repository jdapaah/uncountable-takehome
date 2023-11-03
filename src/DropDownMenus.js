// type DDMProps  = {
// data: Object,
// i1: String,
// si1: void
// i2: String,
// si2: void
// o: String,
// so: void
// }

const DropDownMenus = (props) => {
    // return <h1> {props.i1}</h1>
    // console.log(props)
    return (
        <>
        <input name='i1val' type="text"></input>
        <input name='i2val' type="text"></input>
        <input name='oval' type=""></input>
        <input type="button" onClick={()=>{
            props.si1(document.getElementsByName('i1val')[0].value) 
            props.si2(document.getElementsByName("i2val")[0].value) 
            props.so(document.getElementsByName('oval')[0].value) 
        }}></input>
        </>
    )
}

export default DropDownMenus;