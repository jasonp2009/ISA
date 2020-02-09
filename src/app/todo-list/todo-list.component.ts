import { Component, OnInit, Inject } from '@angular/core';
import { FirestoreService, Todo } from '../firebase/firestore.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


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
    	data: {title: null, duration: null, due: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}

@Component({
  selector: 'todo-editor',
  templateUrl: 'todo-editor.html',
})
export class TodoEditor {

  constructor(
    public dialogRef: MatDialogRef<TodoEditor>,
    @Inject(MAT_DIALOG_DATA) public data: Todo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}