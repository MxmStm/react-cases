import React from 'react';
import {useEffect, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {postsApi} from "../api/posts-api";
import {getPageCount} from "../utils/pages";
import {MyButton} from "../components/UI/button/MyButton";
import {MyModal} from "../components/UI/MyModal/MyModal";
import {PostForm} from "../components/PostForm";
import {PostFilter} from "../components/PostFilter";
import {Loader} from "../components/UI/Loader/Loader";
import {PostList} from "../components/PostList";
import {Pagination} from "../components/UI/pagination/Pagination";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    //custom hooks
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await postsApi.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId))
    }
    const changePage = (page) => {
        setPage(page)
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
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
        </div>
    )
}

export default Posts;