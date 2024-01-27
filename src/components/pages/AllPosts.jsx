import React, {useState, useEffect} from 'react'
import appwriteService from '../../appwrite/config'
import { PostCard, Container } from '../index'

function AllPosts() {
  const [post, setpost] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if(posts){
          setpost(posts.documents)
      }
  })
  }, [])
    
  return (
    <div className='py-8 w-full'>
      <Container>
        <div className='flex flex-wrap'>
        {post.map((item) => (
            <div key={item.$id} className='p-2 w-1/4'>
            <PostCard  {...item} />
            </div>
        ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
