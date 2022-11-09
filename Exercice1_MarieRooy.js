function Image(props){

    return <img style={{width:"25%", height:"25%"}} src={props.imageLink} alt="image de profile d'amélie"/>
}

class Legend extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        const {name, age, job} = this.props.userProfile
        return <div>
        <p>{name}</p>
        <p>{age}</p>
        <p>{job}</p>
    </div>
    }
}

class LikesAndDislikeComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        event.preventDefault();
        this.setState((prevState)=>({count: prevState.count + 1}))
    }

    render(){
        return this.props.type === "like" ?
        <div>
        <button type="button" onClick={this.handleClick} style={{backgroundColor:"green"}}>addLike</button>
        <h3>Count: {this.state.count}</h3>
        </div>
        :
        <div>
        <button type="button" onClick={this.handleClick} style={{backgroundColor:"red"}}>addDislike</button>
        <h3>Count: {this.state.count}</h3>
        </div>
    }
}

class CommentaryForm extends React.Component {
    constructor(props){
        super(props)

        this.state= {
            username:"",
            comment:""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(e){
        e.preventDefault()

        const {username,comment} = this.state ;

        if(username !== "" && comment !== ""){
            this.props.addComment(this.state) ;
            this.setState({username:"",comment:""})
        }
            
    }


    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        return <form onSubmit={this.handleSubmit} >
            <div>
                <label htmlFor="username">Username :</label>
                <br/>
                <input 
                  type="text" 
                  name="username" 
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
            </div>
            <div>
                <label htmlFor="comment">Comment :</label>
                <br/>
                <textarea 
                  name="comment" 
                  id="comment"
                  value={this.state.comment}
                  onChange={this.handleChange}
                ></textarea>
            </div>
            <button type="submit" >Valider</button>
        </form>
    }
}


function CommentaryList( props ){

    console.log(props);
    const {commentaries} = props ;

    return <div>
        {
            commentaries.length > 0 &&
            commentaries.map( (commentary,index) => {
                //fournir un index en tant que unique key n'est pas fiable
                return <div key={index}>
                    <h3> {commentary.username} </h3>
                    <p> {commentary.comment} </p>
                </div>
            } )
        }
    </div>
}


class CommentaryModule extends React.Component {

    constructor(){
        super()
        this.state = {
            commentaries:[]
        }
        this.addComment = this.addComment.bind(this)
    }

    addComment(commentary){

        this.setState( (prevState) => {
            return {
                commentaries: [...prevState.commentaries,commentary]
            }
        } )

    }

    render(){
        return <div>
            <CommentaryForm addComment={this.addComment} />
            <CommentaryList commentaries={this.state.commentaries} />
        </div>
    }

}


class App extends React.Component {

    userProfile

    constructor(){
        super()
        this.userProfile = {
            imgLink: "./assets/photo2.jpeg",
            name: "Amélie Dupond",
            age: "22 ans",
            job: "Coiffeuse",
            nbLikes: 0,
            nbDislikes: 0
        }
    }
    

    render(){
        return <div>
        <Image imageLink={this.userProfile.imgLink} />
        <Legend userProfile = {this.userProfile}/>
        <div>
            <LikesAndDislikeComponent type="like"/>
            <LikesAndDislikeComponent type="dislike"/>
        </div>
        <CommentaryModule/>
    </div>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);