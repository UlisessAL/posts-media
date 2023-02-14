import Swal from "sweetalert2";

const Item = (props) => {
  const { content, displayName, downloadURL, photoURL } = props.post;

  const handleClickImg = () => {
    return Swal.fire({
      imageUrl: downloadURL,
      imageWidth: "100%",
      imageHeight: "100%",
      imageAlt: downloadURL,
    });
  };

  return (
    <div className="post-container">
      <div className="header">
        <img src={photoURL} alt={photoURL} />
        <span>{displayName}</span>
      </div>
      <div className="content">
        <p>{content}</p>
        <div className="img-wrapper">
          <div className="img-post" onClick={handleClickImg}>
            <img src={downloadURL} alt={downloadURL} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Item;
