import './App.css';
import Post from './Post';
import React,{ useState , useEffect } from 'react';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import  Modal  from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle(){
  const top = 50;
  const left = 50;
  return{
    top:`${top}%`,
    left : `${left}%`,
    transform:`translate(-${top}%,-${left}%)`,
  };
}
const useStyles = makeStyles((theme)=>({
  paper:{
    position:'absolute',
    width:400,
    backgroundColor: theme.palette.background.paper,
    border : '2px solid #000',
    boxShadow:theme.shadows[5],
    padding:theme.spacing(2,4,3),
  },
}));
function App() {
  const classes = useStyles();
  const [modalStyle]=useState(getModalStyle);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [openSignIn,setopenSignIn] = useState(false);
  const [user,setUser] = useState(null);
  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
        // if(authUser.displayName){

        // }else{
        //   return authUser.updateProfile({
        //     displayName:username,
        //   });
        // }
      }else{
        setUser(null);
      }
    })
    return()=>{
      unsubscribe();
    }
  }, [user,username]);
  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
        post: doc.data()
      })));  
    })
  }, []);
  const signUp = (event)=>{
    event.preventDefault();
    alert(username);
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message));
    setOpen(false);
  }

  const signIn = (event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
      .catch((error)=>alert(error.message))
    setopenSignIn(false);
  }
  return (
    <div className="App">
      <Modal
        open={openSignIn}
        onClose={()=>setopenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
            <center >
              <img className="app_imgheader" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""></img>
            </center>
            <Input placeholder='username' type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <Input placeholder='email' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder='password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button type = "submit" Onclick={signIn}>SignIn</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
            <center >
              <img className="app_imgheader" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""></img>
            </center>
            <Input placeholder='username' type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <Input placeholder='email' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder='password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button type = "submit" Onclick={signUp}>Signup</Button>
          </form>
        </div>
        
      </Modal>


      <div className="app_header">
        <img className="app_imgheader" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""></img>
        { user ? (
          <Button onClick={()=>auth.signOut()}>Log out</Button>
        ):(
          <div className='app_logincontainer'>
            <Button onClick={()=>setopenSignIn(true)}>Sign in</Button>
            <Button onClick={()=>setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>
      {
        posts.map(({id,post})=>
          <Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL} />
        )
      }
    </div>
  );
}

export default App;
