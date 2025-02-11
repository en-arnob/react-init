import Navbar from "../components/Navbar";

// eslint-disable-next-line react/prop-types
const BaseL = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default BaseL;
