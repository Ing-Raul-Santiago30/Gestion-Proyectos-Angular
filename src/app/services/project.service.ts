import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProject(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(project => {
        if (!project.tasks) {
          project.tasks = []; 
        }
        return project;
      })
    );
  }
  
  addProject(project: any): Observable<any> {
    const newProject = { ...project, tasks: project.tasks ? project.tasks : [] };
    return this.http.post<any>(this.apiUrl, newProject);
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  addTaskToProject(projectId: string, task: any): Observable<any> {
    return this.getProject(projectId).pipe(
      map(project => {
        if (!project.tasks) {
          project.tasks = []; 
        }
  
        task.id = task.id || (project.tasks.length + 1).toString();  
  
        project.tasks.push(task);
  
        return this.http.put<any>(`${this.apiUrl}/${projectId}`, project).subscribe();
      })
    );
  }
  
  

  updateTask(projectId: string, taskId: string, updatedTask: any): Observable<any> {
    return this.getProject(projectId).pipe(
      map(project => {
        const index = project.tasks.findIndex((t: any) => t.id === taskId);
        if (index !== -1) {
          project.tasks[index] = updatedTask;  
          return this.updateProject(projectId, project);  
        }
        return null;  
      })
    );
  }
  

  deleteTask(projectId: string, taskId: string): Observable<any> {
    return this.getProject(projectId).pipe(
      map(project => {
        project.tasks = project.tasks.filter((t: any) => t.id !== taskId);  
        return this.updateProject(projectId, project);  
      })
    );
  }
  
}
