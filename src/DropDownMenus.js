// import SelectDropdown from 'react-native-select-dropdown';

// import DropdownButton from 'react-bootstrap/DropdownButton';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';

function DDM(props) {
    return (
        <div>
            <label>{props.str}</label>
            <select id={props.id} title="Dropdown button"
                onChange={(event) => { props.f(event.target.value) }}>
                <option value="">{props.str}</option>
                {props.options.map((option) => (
                    <option key={option} id={`${props.id}-${option}`} value={option}>
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
            <DDM options={Ioptions} id={'i1-select'}
                f={(v) => {
                    props.si1(v)
                    if (props.i2 === v) {
                        document.getElementById('i2-select').value = ''
                        props.si2('')
                    }
                }}
                str="Set first input"
            />
            <DDM options={Ioptions} id={'i2-select'}
                f={(v) => {
                    props.si2(v)
                    if (props.i1 === v) {
                        document.getElementById('i1-select').value = ''
                        props.si1('')
                    }
                }}
                str="Set second input"
            />
            <DDM options={Ooptions}
                f={props.so}
                str="Set output type"
            />
        </>
    )
}

export default DropDownMenus;