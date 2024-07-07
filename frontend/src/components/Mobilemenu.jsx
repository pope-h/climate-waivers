import Menu from "./Menu";
import Communityselector from "./Communityselector";
import PropTypes from "prop-types";
import { IoCloseSharp } from 'react-icons/io5'

const Mobilemenu = ({ setIsOpen }) => {
  return (
    <div
      className="bg-dark backdrop-blur-2xl bg-opacity-50 absolute top-0 left-0 w-[100vw] h-[100vh] z-10  max-h-screen "
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative top-0 left-0 h-[100vh] focus:bg-bgGradient w-[70%] border-r-[1px] border-gray-700"
      >
        <span
          className="absolute top-2 right-2 hover:cursor-pointer "
          onClick={() => setIsOpen(false)}
        >
          <IoCloseSharp size={32} />
        </span>

        <Menu />
        <Communityselector />
      </div>
    </div>
  );
};

Mobilemenu.propTypes = {
  setIsOpen: PropTypes.bool,
};
export default Mobilemenu;
