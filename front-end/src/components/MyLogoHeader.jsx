const MyLogoHeader = () => {
  return (
    <div className="container-fluid logo-header text-center">
      <div className="logo-container">
        <div className="logo-icon">
          <img src="/GOJO-GAMES-logo.png" alt="" width={350} height={200} style={{ objectFit: "cover" }} />
        </div>
        <div className="logo-text"></div>
      </div>
    </div>
  );
};

export default MyLogoHeader;
