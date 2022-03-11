


const express = require('express');//recebe o pacote express
const {uuid,isuuid} = require('uuidv4');

const App = express(); //app recebe as funcionalidades express
App.use(express.json())

const projects = []
function handlerForm (request,response,next){
  if(request.body.title && request.body.owner){
    return next();
  }
  return response.status(500).json({"message":"Dados invalidos"})
}

App.get("/projects",(request,response)=>{
  if(request.query.title){
   const {title} = request.query;
   const projectsFilter = projects.filter(project=>project.title==title)
   return response.json(projectsFilter);
  }
  return response.json(projects);
})  //envia um json para rota especificada

App.post("/projects",handlerForm,(request,response)=>{
  const {title,owner} = request.body;
  const project = {id:uuid(), title, owner};
  projects.push(project);
  return response.json(project);
});

App.put("/projects/:id",(request,response)=>{
  const {id} = request.params;
  const {title,owner} = request.body;
  const projectIndex = projects.findIndex(project=>project.id == id);
  if(projectIndex<0){
    return response.status(400).json({error:"project not found"})
  }
  const project={
    id,
    title,
    owner
  }
  projects[projectIndex] = project;
  return response.json(project)
})

App.delete("/projects/:id",(request,response)=>{
  const {id} = request.params;
  const projectIndex = projects.findIndex(project => project.id == id)
  projects.splice(projectIndex,1)
  return response.status(204).json({"message":"delete with sucess!!!"})
})
App.listen(3333,()=>{
  console.log("backend start!!!")
});//seta a porta em que vai ser executada no ambiente de desenvolvimento