function Card(props) {
  const background = props.bgcolor ? ` bg-${props.bgcolor}` : ' bg-primary';
  const text = props.txtcolor ? ` text-${props.txtcolor}` : ' text-white'
  const cardHeaderClass = `card-header${background}${text}`;
  
  return(
    <div className="card" style={{maxWidth: "18rem"}}>
      <h5 className={cardHeaderClass}>{props.headerText}</h5>
      <br/>
      <img src="./_img/cluster.png" type="image/png" style={{padding: "20px"}} className="img-fluid left" alt="Responsive image" width="50%"/><br/>
      <div className="card-body">
        {props.body}
      </div>
    </div>
  );
}