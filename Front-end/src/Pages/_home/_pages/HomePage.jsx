import { useState } from 'react';
import Navbar from "../_components/Navbar";
import Todolist from "../_components/Todolist";
import AddTodoForm from "../_components/AddTodoForm";
import Loading from '../_components/Loading';
import SnackBar from '../_components/Snackbar';
import AddProjectForm from '../_components/AddProjectForm';
import { useSelector } from 'react-redux';

function HomePage (){
    const user = useSelector((state) => state.userReducer.username)
    const [ addTodoFormDisplay, setAddTodoFormDisplay ] = useState("hidden");
    const [ addProjectDisplay, setAddProjectDisplay ] = useState("hidden");
    
    const toggleDisplay = () => {
        addTodoFormDisplay === "hidden" ? setAddTodoFormDisplay("showing") : setAddTodoFormDisplay("hidden");
    };

    const toggleNewProjectDisplay = () =>{
        addProjectDisplay === "hidden" ? setAddProjectDisplay("showing") : setAddProjectDisplay("hidden");
    };

    const closeAddTodoForm  = () => {
        if(addTodoFormDisplay === "showing"){
            setAddTodoFormDisplay("hidden")
        }
        if(addProjectDisplay === "showing"){
            setAddProjectDisplay("hidden")
        }
    };

    return(
        <>
            <Navbar
                toggleDisplay={toggleDisplay}
                toggleNewProjectDisplay={toggleNewProjectDisplay}
                display={addProjectDisplay}
            />
            <div id="formContainer">
                <AddTodoForm display={addTodoFormDisplay} />
                <AddProjectForm display={addProjectDisplay} />
            </div>
            <main onClick={closeAddTodoForm}>
                <h1>LyST</h1>
                <h2>Hello {user}</h2>
                <Loading />
                <Todolist />
                <SnackBar />
            </main>
        </>
    )
}
export default HomePage;