function Input(props){
   return <input className={props.className} type={props.type} ref={props.myRef} placeholder={props.placeholder} defaultChecked={props.defaultChecked} onClick={props.onClick} onChange={props.onChange}/>
}
export default Input
