import { Component, OnInit, Inject } from '@angular/core';
import { FirestoreService, Todo, TodoId } from '../firebase/firestore.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(
  	private db: FirestoreService,
  	public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

 	newTodo(): void {
    const dialogRef = this.dialog.open(TodoEditor, {
    	width: '300px',
    	data: {title: null, duration: null, due: null, completed: false}
    });

    dialogRef.afterClosed().subscribe(result => {
    	if (result) {
    		console.log("Save");
    		this.db.addTodo(result);
    	} else {
    		console.log("Cancel");
    	}
    });
  }

  editTodo(todo: TodoId): void {
  	const dialogRef = this.dialog.open(TodoEditor, {
    	width: '300px',
    	data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
    	if (result) {
    		console.log("Save");
    		this.db.editTodo(result);
    	} else {
    		console.log("Cancel");
    	}
    });
  }

}

@Component({
  selector: 'todo-editor',
  templateUrl: 'todo-editor.component.html',
  styleUrls: ['./todo-editor.component.css']
})
export class TodoEditor {

  constructor(
    public dialogRef: MatDialogRef<TodoEditor>,
    @Inject(MAT_DIALOG_DATA) public data: Todo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}