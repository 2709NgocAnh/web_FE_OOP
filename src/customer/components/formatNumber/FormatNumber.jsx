function FormatNumber({ price }) {
    return (
      <>
        {price?.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </>
    );
  }
  
  FormatNumber.propTypes = {};
  
  export default FormatNumber;
  