const themeSelector = ((currentTheme) =>{
        const themeLibrary ={
        dark :{
            primary:{
                backgroundColor:"black",
                color:"white",
            },
            labels:{
                color:"#40a0c0"
            },
        },    
        light : {
            primary:{
                backgroundColor: "white",
                color:"black",
            },
            labels:{
                color:"#40a0c0"
            },
        },    
        cherry : {
            labels:{
                color:"rgb(231, 178, 178);",
            }
        },
    };

    return themeLibrary[currentTheme]
});

export const progressStyle = {
    borderRadius: "5px",
    backgroundColor:"#a6c2dd",
    color:"#304558",
    position:"absolute",
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
    padding:"2%",
    margin:"10%"
}


//used for toggling crossing off items from list  ----------------
export const statusText ={
    completed:{
        textDecorationLine: "line-through",
    },
    uncompleted:{
        textDecorationLine: "none"
    }
}
export const checkStatus = (item) => {
    let text;
    if(item.finished === true){
        text = statusText.completed
    }else{
        text = statusText.uncompleted
    }
    return text;
}
//-----------------------------------------------------------------

export default themeSelector;