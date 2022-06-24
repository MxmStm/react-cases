import './styles/App.css';
import {useState} from "react";
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {PostFilter} from "./components/PostFilter";
import {MyModal} from "./components/UI/MyModal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)

    //custom hook
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId))
    }

    return (
        <div className="App">
            <MyButton
                style={{marginTop: 20}}
                onClick={() => setModal(true)}
            >
                Create user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList
                posts={sortedAndSearchedPosts}
                title={'List of posts #1'}
                remove={removePost}
            />
        </div>
    );
}

export default App;
