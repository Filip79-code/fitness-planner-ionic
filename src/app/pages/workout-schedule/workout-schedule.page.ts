import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface Exercise {
  id: number;
  name: string;
}

interface Workout {
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

  workouts: Workout[] = [];

  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  selectedDayFilter: string = 'Monday';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


    addWorkout() {
    if (!this.workoutName || !this.selectedDay || !this.duration || this.selectedExercises.length === 0) {
      alert('Please fill in all fields and select at least one exercise.');
      return;
    }

    const newWorkout: Workout = {
      name: this.workoutName,
      day: this.selectedDay,
      duration: this.duration,
      dateCreated: this.dateCreated,
      exercises: [...this.selectedExercises]
    };

    this.workouts.push(newWorkout);

    // Reset form
    this.workoutName = '';
    this.selectedDay = 'Monday';
    this.duration = null;
    this.dateCreated = new Date().toISOString().split('T')[0];
    this.selectedExercises = [];
  }

  // Filter workouts by day
  getWorkoutsForSelectedDay(): Workout[] {
    return this.workouts.filter(w => w.day === this.selectedDayFilter);
  }

  logout() {
    this.authService.logout();
  }

}
