import { useEffect, useState } from 'react'
import Postcomponent from './Postcomponent'
import { watchCollection } from '../services/firebase.service'
import { DisaxPostCard } from './DisaxPostCard'

import "./styles/happeningnow.css"

const Happeningnow = () => {
  const [posts, setPosts ] = useState([])
  useEffect(()=>{
    const path = "Posts"
    watchCollection(path, (snapshot)=>{
      const data = snapshot.docs.map(d=>({...d.data(), remoteId: d.id}))
      console.log({data})
      setPosts(data)
    })
  }, [])
  return (
    <div className='text-xl text-center border-b-2   pt-1 md:pt-5 '>
        <h2 className='pb-1 md:pb-3 text-lg md:text-xl border-gray-500 border-b-2 font-semibold '>Happening Now</h2>
        <div className="disaster-posts-wrapper overflow-auto">
          {
            posts.map(p=>{
            return <DisaxPostCard key={p.remoteId} post={p} />
          })
          }
        </div>

    </div>
  )
}

export default Happeningnow