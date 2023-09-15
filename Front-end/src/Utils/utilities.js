
export function getProjectsList (todos) {
    const projectsArray = todos.map((todo) =>{
        return [...todo.projects]
    })
    const flattenedProjects = projectsArray.flat()
    const projectList = [... new Set(flattenedProjects)];
    
    return projectList;
}
