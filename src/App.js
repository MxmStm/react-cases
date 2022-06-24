import './App.css';
import {useMemo, useState} from "react";
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {PostFilter} from "./components/PostFilter";
import {MyModal} from "./components/UI/MyModal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body: 'fgfdgfdg'},
        {id: 2, title: 'React', body: 'gdfgdfgdfg'},
        {id: 3, title: 'TypeScript', body: 'aadfqwfv'},
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)


    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) =>
                a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [posts, filter.sort])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase().trim()))
    }, [filter.query, sortedPosts])


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    //получаем postId из дочернего элемента
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
