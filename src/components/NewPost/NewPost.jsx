import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { exportOnePost, storage } from "../../services/firebase";
import { useAuthContext } from "../context/authContext";
import Swal from "sweetalert2";

const NewPost = () => {
  const { currentUser } = useAuthContext();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [fileChange, setFileChange] = useState(false);

  const handleChangeFile = () => {
    setFileChange(true);
  };

  useEffect(() => {
    setDisplayName(currentUser.displayName);
    setPhotoURL(currentUser.photoURL);
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const content = e.target[1].value;

    try {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      setFileChange(false);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Post
            await exportOnePost({
              downloadURL,
              content,
              displayName,
              photoURL,
              date: new Date(),
            });

            Swal.fire({
              icon: "success",
              title: "Congratulations",
              text: "Your post has been pushed!",
            });

            console.log(downloadURL);
          } catch {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error has ocurred while pushing the post, try again later",
            });
          }
        });
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error has ocurred while pushing the post, try again later",
      });
    }
  };

  return (
    <div className="new-post-wrapper">
      <div className="new-post">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={handleChangeFile}
          />
          <label htmlFor="file">
            {!fileChange ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-file-upload"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <polyline points="9 14 12 11 15 14" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-file-check"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M9 15l2 2l4 -4" />
              </svg>
            )}
          </label>
          <textarea
            type="text"
            placeholder="What are you thinking about?"
            required
            style={{ overflow: "hidden" }}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-send"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="10" y1="14" x2="21" y2="3" />
              <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewPost;
