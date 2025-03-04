import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';    
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,  
  imports: [CommonModule, FormsModule],  
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  newUser = { username: '', password: '', role: 'editor' };

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  addUser(): void {
    if (this.newUser.username && this.newUser.password) {
      this.userService.addUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.newUser = { username: '', password: '', role: 'editor' };
      });
    }
  }

  deleteUser(userId: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}

