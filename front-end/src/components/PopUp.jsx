import "../styles/PopUp.css";

const PopUp = ({ popUpText }) => {
  return (
    <>
      <div className="successPopup text-center">
        <p className="textPopup  fs-5">{popUpText}</p>
      </div>
    </>
  );
};

export default PopUp;
