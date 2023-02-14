import { useEffect, useState } from "react";
import { getPosts } from "../../services/firebase";
import ItemList from "./ItemList/ItemList";
import "../scss/itemListContainer.scss";

const ItemListContainer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
    });
  }, [posts]);

  return (
    <div className="item-list-wrapper">
      <ItemList posts={posts} />
    </div>
  );
};
export default ItemListContainer;
