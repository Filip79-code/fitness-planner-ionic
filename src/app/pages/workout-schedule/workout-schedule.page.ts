import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { ModalController } from '@ionic/angular';
import { EditWorkoutPage } from '../edit-workout/edit-workout.page';


interface Exercise {
  id: number;
  name: string;
}

interface Workout {
  id?: string;       // Firebase ID
  name: string;
  day: string;
  duration: number;
  dateCreated: string;
  exercises: Exercise[];
}

@Component({
  selector: 'app-workout-schedule',
  templateUrl: './workout-schedule.page.html',
  styleUrls: ['./workout-schedule.page.scss'],
  standalone: false
})
export class WorkoutSchedulePage implements OnInit {

  isEditing: boolean = false;
  editingWorkoutId?: string;

  userId!: string;

  workouts: Workout[] = [];

  workoutName: string = '';
  selectedDay: string = 'Monday';
  duration: number | null = null;
  dateCreated: string = new Date().toISOString().split('T')[0];
  selectedExercises: Exercise[] = [];

  exercises: Exercise[] = [
    { id: 1, name: 'Push-ups' },
    { id: 2, name: 'Pull-ups' },
    { id: 3, name: 'Squats' },
    { id: 4, name: 'Lunges' },
    { id: 5, name: 'Plank' }
  ];

  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDayFilter: string = 'Monday';

  constructor(private firebaseService: FirebaseService, private authService: AuthService, private modalCtrl: ModalController) { }

  ngOnInit() {
    const user = this.authService.getUser();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    this.userId = user['id'];

    // Učitaj sve treninge za ovog korisnika
    this.firebaseService.getWorkouts(this.userId)
      .subscribe(data => {
        this.workouts = data ? Object.entries(data).map(([id, workout]: any) => ({ id, ...workout })) : [];
      });
  }

  addWorkout() {
    if (!this.workoutName || !this.selectedDay || !this.duration || this.selectedExercises.length === 0) {
      alert('Please fill in all fields and select at least one exercise.');
      return;
    }

    const newWorkout: Workout = {
      name: this.workoutName,
      day: this.selectedDay,
      duration: this.duration!,
      dateCreated: this.dateCreated,
      exercises: [...this.selectedExercises]
    };

    // Čuvanje u Firebase pod ID korisnika
    this.firebaseService.addWorkout(this.userId, newWorkout)
      .subscribe({
        next: (res: any) => {
          this.workouts.push({ id: res.name, ...newWorkout });
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert('Došlo je do greške prilikom čuvanja treninga.');
        }
      });
  }

  resetForm() {
    this.workoutName = '';
    this.selectedDay = 'Monday';
    this.duration = null;
    this.dateCreated = new Date().toISOString().split('T')[0];
    this.selectedExercises = [];
  }

  // Filter treninga po danu
  getWorkoutsForSelectedDay(): Workout[] {
    return this.workouts.filter(w => w.day === this.selectedDayFilter);
  }


  deleteWorkout(workout: Workout) {
  if (!workout.id) {
    return;
  }

  const confirmDelete = confirm(`Delete workout "${workout.name}"?`);
  if (!confirmDelete) {
    return;
  }

  this.firebaseService
    .deleteWorkout(this.userId, workout.id)
    .subscribe({
      next: () => {
        // ukloni lokalno bez reload-a
        this.workouts = this.workouts.filter(w => w.id !== workout.id);
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting workout.');
      }
    });
}


editWorkout(workout: Workout) {
  this.isEditing = true;
  this.editingWorkoutId = workout.id!;

  this.workoutName = workout.name;
  this.selectedDay = workout.day;
  this.duration = workout.duration;
  this.dateCreated = workout.dateCreated;
  this.selectedExercises = [...workout.exercises];
}


updateWorkout() {
  if (!this.editingWorkoutId) return;

  const updatedWorkout: Workout = {
    name: this.workoutName,
    day: this.selectedDay,
    duration: this.duration!,
    dateCreated: this.dateCreated,
    exercises: [...this.selectedExercises]
  };

  this.firebaseService
    .updateWorkout(this.userId, this.editingWorkoutId, updatedWorkout)
    .subscribe({
      next: () => {
        const index = this.workouts.findIndex(w => w.id === this.editingWorkoutId);
        if (index !== -1) {
          this.workouts[index] = {
            id: this.editingWorkoutId,
            ...updatedWorkout
          };
        }

        this.cancelEdit();
      },
      error: err => {
        console.error(err);
        alert('Error updating workout');
      }
    });
}


cancelEdit() {
  this.isEditing = false;
  this.editingWorkoutId = undefined;
  this.resetForm();
}


async openEditWorkout(workout: Workout) {
  const modal = await this.modalCtrl.create({
    component: EditWorkoutPage,
    componentProps: {
      userId: this.userId,
      workoutId: workout.id,
      workout: { ...workout } // klon objekta
    },
    breakpoints: [0, 0.9],
    initialBreakpoint: 0.9
  });

  modal.onDidDismiss().then(res => {
    if (res.data) {
      this.reloadWorkouts();
    }
  });

  await modal.present();
}


reloadWorkouts() {
  this.firebaseService.getWorkouts(this.userId).subscribe(data => {
    this.workouts = data
      ? Object.entries(data).map(([id, w]: any) => ({ id, ...w }))
      : [];
  });
}



  // Logout
  logout() {
    this.authService.logout();
  }
}
