import {useEffect,useState} from 'react';
import {
    AppBar,
    Typography,
    //Button,
    Toolbar,
   // IconButton,
    makeStyles,
    Grid,
    CardContent,
    Card,
    InputBase,
    //Box,
    //Hidden,
   // alpha,
    CardMedia,
    Chip
    
    
} from '@material-ui/core';
//import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
//import { grey } from '@material-ui/core/colors';
const useStyles = makeStyles((theme)=>({
    logo: {
      maxWidth: 60,
      borderWidth:40
    },
    appbar:{
        
        background:'white',
        borderRadius:8,
        marginBottom:20,
    },
    items:{
        justifyContent:'center',
        alignItems:'center',
    },
    input: {
        marginLeft: 1,
        flex: 1,
      },
      grid:{
        direction:"row",
        justifyContent:"center",
        alignItems:"center"
      },
      cardBeforeSearch:{
         padding:10
      },inputBase:{
        backgroundColor:'#DFDFDF',
        borderRadius:4,
        
        padding:4
      },
      card:{
        marginBottom:10
      },
      chip:{
        margin:2
      },




      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'grey',
        '&:hover': {
          backgroundColor: 'grey',
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
      
    

  }));
const Navbar = () => {
const classes=useStyles();
const [result,Setresult]=useState(null);
const [search,SetSearch]=useState(0);
const [loaded,Setloaded]=useState(false);
const [error,Seterror]=useState(false);

const getResult=async ()=>{
  
    if(search.length>0){
      Setresult([]);
axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`).then((res)=>{

  Setresult(res.data);
  //console.log(res.data);
  Setloaded(true);
  Seterror(false);

}).catch((e)=>{
  //console.log(e);
  Seterror(true);
  


})
    }

}

useEffect(()=>{

getResult();

},[search])
    
if(error){
return (
<>
<div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar>
            <img src="img.jpg" alt="logo" className={classes.logo} />
              <Typography className={classes.title} style={{color:'black',fontFamily:' Allison, cursive',fontSize:40}} variant="h6" noWrap>
                <b>Dictionary</b>
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e)=>{SetSearch(e.target.value)}}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container className={classes.grid}>


        <Grid item sm={4} md={4} xs={12} lg={4} >
              <Card className={classes.card} >


             <CardContent>
             
              <Typography style={{fontSize:45}}>NOT FOUND</Typography>
              <p>TIPS:-</p>
              <Typography style={{marginBottom:6}}>Don't use special characters (eg:#,@,$!.%^*&)</Typography>
              <Typography>Enter specific word </Typography>


               </CardContent>
               <CardMedia
                  component="img"
                  alt="Poster NOT AVAILABLE"
                  height="150"
                  
                   src="e.jpg"

                  title="poster"
                />
                
               </Card>
               </Grid>

        </Grid>

  
  </>
);


}
   else if(search.length>0 &&loaded){

        return (
           <>
          <div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar>
            <img src="img.jpg" alt="logo" className={classes.logo} />
              <Typography className={classes.title} style={{color:'black',fontFamily:' Allison, cursive',
                     fontSize:40}} variant="h6" noWrap>
                <b>Dictionary</b>
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e)=>{SetSearch(e.target.value)}}
                  value={search}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container className={classes.grid}>
     
          {result.map((c,index)=>(
            <Grid item sm={8} md={8} xs={12} lg={8} key={index}>
              <Card className={classes.card} >
             <CardContent>
            <Typography style={{color:'#8d92a8',marginBottom:5,fontSize:45}} >
              WORD:{c.word}
              </Typography>
              <Typography style={{color:'#8d92a8',marginBottom:5}} >
              Phonetic:{c.phonetic}
              </Typography>
              
              
              {c.phonetics.map((d,index)=>(
                 <div key={index}>
                <Typography style={{color:'#8d92a8',marginBottom:10}}>Text:{d.text}</Typography>
                <Typography style={{color:'#8d92a8',marginBottom:10}}>Audio:</Typography>
                <audio controls style={{marginBottom:10}}>
                  <source src={d.audio} />
                </audio>
                </div>
              ))}
              <Typography style={{marginBottom:10,fontSize:35}}>MEANINGS</Typography>
              {c.meanings.map((g,index)=>(
                 <div key={index}>
                <Typography style={{color:'#8d92a8',marginBottom:10,fontSize:30}}>Part of Speech:{g.partOfSpeech}</Typography>
                <Typography style={{color:'#8d92a8',marginBottom:10,fontSize:30}}>Definitions</Typography>
                    {
                      g.definitions.map((h,index)=>(
                        <div key={index}>
                          <Typography><b>{index+1}) Definition:</b>{h.definition}</Typography>
                          
                          <hr/>
                          <Typography><p><b>EXAMPLE:</b></p> {h.example}</Typography>
                          
                          <hr/>
                          <Typography style={{textTransform:'capitalize'}}>
                            <p style={{}}><b>SYNONYMS:</b> </p>{h.synonyms.map((i,index)=>(
                            <Chip label={i} className={classes.chip} onClick={()=>{
                              SetSearch(i)
                            }}/>
                            
                            
                        ))}</Typography>
                          
                          <hr/>
                          </div>
                      ))
                    }
                </div>
              ))}
              
              
          </CardContent>
      
         <Grid></Grid>
        
        
        
        </Card>
        </Grid>
          )
         
          )}
         
      
    </Grid>
        </>
        );
    } else{
    return (
      <>
      <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
        <img src="img.jpg" alt="logo" className={classes.logo} />
          <Typography className={classes.title} style={{color:'black',fontFamily:' Allison, cursive',fontSize:40}} variant="h6" noWrap>
            <b>Dictionary</b>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>{SetSearch(e.target.value)}}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
    <Grid container className={classes.grid}>
      <Card className={classes.cardBeforeSearch}>
        <CardContent>
          <Typography style={{color:'#8d92a8',marginBottom:5}}>Search Words in Search Bar</Typography>
          <Typography style={{color:'#8d92a8'}}>Eg:Hello,Milk,cat etc..</Typography>
          </CardContent>
      
      <CardMedia
                  component="img"
                  alt="Poster NOT AVAILABLE"
                  height="300"
                   src="img3.jpg"

                  title="poster"
                />
        
        
        
        </Card>
      
    </Grid>
    </>
    );
    }
}
 
export default Navbar;  