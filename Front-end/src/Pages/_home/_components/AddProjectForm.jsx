import { useDispatch } from 'react-redux';
import { addProject } from '../../../Redux/reducers/todos_reducer';

function AddProjectForm ({display}){
    const dispatch = useDispatch()

    const newProject = (e) =>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const projectName = formJson.project
        form.reset();
        dispatch(addProject(projectName))
    };

    return(
        <>
            <form className={display} onSubmit={newProject}>
                <input type="text" name="project" placeholder='new project name'></input>
                <button className ={"primaryButton"} type ="submit">+</button>
            </form>
            
        </>
    )
}
export default AddProjectForm;