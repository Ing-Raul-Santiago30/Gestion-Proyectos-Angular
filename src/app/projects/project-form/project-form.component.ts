import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './project-form.component.html'
})

export class ProjectFormComponent implements OnInit {
  project: any = { name: '', description: '' };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!; 
    if (id !== '0') { 
      this.projectService.getProject(id).subscribe(data => {
        this.project = data;
      });
    }
  }
  

  saveProject(): void {
    if (this.project.id) {
      this.projectService.updateProject(this.project.id, this.project).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.projectService.addProject(this.project).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
