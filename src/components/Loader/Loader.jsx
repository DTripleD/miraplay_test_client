import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={40}
      width={40}
      color="#afafaf"
      wrapperClass="loader"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#bfcfbf"
      strokeWidth={2}
      strokeWidthSecondary={2}
      wrapperStyle={{ justifyContent: "center" }}
    />
  );
};

export default Loader;
