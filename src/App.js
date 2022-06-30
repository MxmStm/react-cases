import './styles/App.css';
import {useEffect, useState} from "react";
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {PostFilter} from "./components/PostFilter";
import {MyModal} from "./components/UI/MyModal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import {postsApi} from "./api/posts-api";
import {Loader} from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)

    //custom hooks
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await postsApi.getAll()
        setPosts(posts)
    })

    useEffect(() => {
        fetchPosts()
    }, [])

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
            {postError &&
                <h1>{postError}</h1>
            }
            {isPostsLoading
                ? <div style={{
                    display: "flex",
                    justifyContent: 'center',
                    marginTop: '50px'
                }}>
                    <Loader/>
                </div>
                : <PostList
                    posts={sortedAndSearchedPosts}
                    title={'List of posts #1'}
                    remove={removePost}
                />
            }
        </div>
    );
}

export default App;
