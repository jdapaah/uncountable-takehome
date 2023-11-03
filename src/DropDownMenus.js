// import SelectDropdown from 'react-native-select-dropdown';

// import DropdownButton from 'react-bootstrap/DropdownButton';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';



// function DropDownMenus() {
//   return (
//     <FloatingLabel controlId="floatingSelect" label="Works with selects">
//       <Form.Select aria-label="Floating label select example">
//         <option>Open this select menu</option>
//         <option value="1">One</option>
//         <option value="2">Two</option>
//         <option value="3">Three</option>
//       </Form.Select>
//     </FloatingLabel>
//   );
// }
function DDM(props){
    return (
        <div>
            <label>{props.str}</label>
            <select id="dropdown-basic-button" title="Dropdown button"
            onChange={(event)=>{props.f(event.target.value)}}>
                <option value="">{props.str}</option>
                {props.options.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                ))}
            </select>
        </div>
    )
}
const DropDownMenus = (props) => {
    var keys = Object.keys(props.rawData);
    var exp = props.rawData[keys[0]];
    var Ioptions = Object.keys(exp['inputs']);
    var Ooptions = Object.keys(exp['outputs']);
    return (
        <>
        <DDM options={Ioptions} 
            str="Set first input"
            f={(v)=>{
                if(props.i2 === props.si1(v)){
                    props.si2('')
                }
            }}/>
        <DDM options={Ioptions} f={(v)=>{
            if(props.i1 === props.si2(v)){
                props.si1('')
            }
            }}
            str="Set second input"
            />
        <DDM options={Ooptions} f={props.so}
            str="Set output type"
         />
        </>
    )
}

export default DropDownMenus;