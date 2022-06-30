function Home() {
  return(
    <Card
      bgcolor="light"
      txtcolor="dark"
      headerText="Welcome to Cluster Bank: Full-Stack 3 Tier"
      body={<>
      To Begin, press the button <a href="#Login" className="btnDeposit">Log In</a>.    
      </>}
    />
  );
}