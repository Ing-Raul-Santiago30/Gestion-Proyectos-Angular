import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';  
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,  
  imports: [CommonModule, RouterModule],  
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  deleteProject(id: string): void {
    if (this.isAdmin()) {
      if (confirm('¿Estás seguro de eliminar este proyecto?')) {
        this.projectService.deleteProject(id).subscribe(() => {
          this.loadProjects();
        });
      }
    } else {
      alert('No tienes permisos para eliminar proyectos.');
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isEditor(): boolean {
    return this.authService.isEditor();
  }
}
