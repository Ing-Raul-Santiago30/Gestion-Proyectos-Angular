import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: any;
  newTask = { name: '', completed: false };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadProject(projectId);
  }

  loadProject(projectId: string): void {
    this.projectService.getProject(projectId).subscribe(updatedProject => {
      this.project = updatedProject; 
    });
  }
  

  addTask(): void {
    if (this.newTask.name.trim() !== '') {
      this.projectService.addTaskToProject(this.project.id, this.newTask).subscribe(() => {
        this.loadProject(this.project.id);  
        location.reload();
        this.newTask.name = '';  
      });
    }
  }  

  toggleTaskCompletion(task: any): void {
    task.completed = !task.completed;  
    this.projectService.updateTask(this.project.id, task.id, task).subscribe(() => {
      this.loadProject(this.project.id);  
    });
  }
  

  deleteTask(taskId: string): void {
    this.projectService.deleteTask(this.project.id, taskId).subscribe(() => {
      this.loadProject(this.project.id);  
    });
  }
  

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isEditor(): boolean {
    return this.authService.isEditor();
  }
}
