import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';


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

  constructor(private firebaseService: FirebaseService, private authService: AuthService) { }

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


  // Logout
  logout() {
    this.authService.logout();
  }
}
