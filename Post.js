import React from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core'

function Post({username,caption,imageURL}) {
    return (
        <div className="post">
            <div className="post_header">
            <Avatar className="post_avatar" alt='Vivekanand'src="https://tse1.mm.bing.net/th/id/OIP.0XqScCLemTKPn9vV-CnMWAHaLH?w=186&h=279&c=7&r=0&o=5&dpr=1.25&pid=1.7" />
            <h3>{username}</h3>
            </div>
            <img className="post_img" src={imageURL} alt=""></img>
            <h4 className="post_text"><strong>{username} :</strong> {caption}</h4>
        </div>
    )
}

export default Post
