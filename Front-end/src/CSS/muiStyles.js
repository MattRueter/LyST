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


export default themeSelector;