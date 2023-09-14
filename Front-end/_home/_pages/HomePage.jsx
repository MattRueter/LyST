import { useState } from 'react';
import Navbar from "../_components/Navbar";
import Todolist from "../_components/Todolist";
import AddTodoForm from "../_components/AddTodoForm";
import Loading from '../_components/Loading';
import SnackBar from '../_components/Snackbar';

function HomePage (){
    const [addTodoFormDisplay, setAddTodoFormDisplay ] = useState("hidden");

    const toggleDisplay = () => {
        addTodoFormDisplay === "hidden" ? setAddTodoFormDisplay("showing") : setAddTodoFormDisplay("hidden");
    };
    
    return(
        <>
            <Navbar toggleDisplay={toggleDisplay}/>
            <main>
                <AddTodoForm display={addTodoFormDisplay} />
                <h1>LyST</h1>
                <h2>Hello Matt</h2>
                <Loading />
                <Todolist />
                <SnackBar />
            </main>
        </>
    )
}
export default HomePage;