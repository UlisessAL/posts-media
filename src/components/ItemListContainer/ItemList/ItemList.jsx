import Item from "./Item/Item";

const ItemList = (props) => {
  return (
    <div className="post-wrapper">
      {props.posts.map((post) => (
        <Item post={post} key={post.content} />
      ))}
    </div>
  );
};
export default ItemList;
