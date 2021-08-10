import {Circle} from "better-react-spinkit"

function Loading() {
  return (
    
    <center style ={{display:"grid", placeItems: "center" , height : "100vh"}}>
    <div>
      <img 
      
       src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OJW0KUrh-3T2TBQt94N960-yusz__8TjkA&usqp=CAU"
       alt =""
       style = {{marginBottom:10}}
       height= {200}
      />

      <Circle color = "#3CBC28"  size ={60}/>
    </div>

    </center>
  )
}

export default Loading
