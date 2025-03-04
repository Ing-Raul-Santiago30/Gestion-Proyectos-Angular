import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  @Input() projectId!: string;
  @Input() tasks: any[] = [];
  newTask = { name: '', completed: false };

  constructor(private projectService: ProjectService, private authService: AuthService) {}

  addTask(): void {
    if (this.isAdmin() || this.isEditor()) {
      if (this.newTask.name.trim() !== '') {
        this.projectService.addTaskToProject(this.projectId, this.newTask).subscribe(() => {
          this.projectService.getProject(this.projectId).subscribe(updatedProject => {
            this.tasks = updatedProject.tasks;
          });
          this.newTask.name = '';
        });
      }
    } else {
      alert('No tienes permisos para agregar tareas.');
    }
  }  

  toggleTaskCompletion(task: any): void {
    if (this.isAdmin() || this.isEditor()) {
      task.completed = !task.completed;
      this.projectService.updateTask(this.projectId, task.id, task).subscribe();
    } else {
      alert('No tienes permisos para modificar tareas.');
    }
  }

  deleteTask(taskId: string): void {
    if (this.isAdmin()) {
      this.projectService.deleteTask(this.projectId, taskId).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      });
    } else {
      alert('No tienes permisos para eliminar tareas.');
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isEditor(): boolean {
    return this.authService.isEditor();
  }
}
