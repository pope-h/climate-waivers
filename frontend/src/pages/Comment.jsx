import Postcomponent from "../components/Postcomponent";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';

const Comment = ({type}) => {
  const { postId } = useParams();

  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <Postcomponent  type={type} postId={postId} />
    </div>
  );
};

Comment.propTypes = {
  type: PropTypes.string,
};

export default Comment;
