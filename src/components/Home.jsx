import ItemListContainer from "./ItemListContainer/ItemListContainer"
import NewPost from "./NewPost/NewPost"
import "./scss/home.scss"

const Home = () => {
  return (
    <div className="home">
      <NewPost/>
      <ItemListContainer/>
    </div>
  )
}
export default Home