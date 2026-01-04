import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { ModalController } from '@ionic/angular';
import { EditWorkoutPage } from '../edit-workout/edit-workout.page';


interface Exercise {
  id: number;
  name: string;
  category: string;
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
  // BASIC
  { id: 1, name: 'Push-ups', category: 'Chest' },
  { id: 2, name: 'Pull-ups', category: 'Back' },
  { id: 3, name: 'Squats', category: 'Legs' },
  { id: 4, name: 'Lunges', category: 'Legs' },
  { id: 5, name: 'Plank', category: 'Core' },

  // CHEST
  { id: 6, name: 'Chest Press', category: 'Chest' },
  { id: 7, name: 'Incline Push-ups', category: 'Chest' },
  { id: 8, name: 'Dumbbell Flyes', category: 'Chest' },
  { id: 9, name: 'Bench Press', category: 'Chest' },

  // BACK
  { id: 10, name: 'Deadlift', category: 'Back' },
  { id: 11, name: 'Bent-over Row', category: 'Back' },
  { id: 12, name: 'Lat Pulldown', category: 'Back' },
  { id: 13, name: 'Seated Row', category: 'Back' },

  // LEGS
  { id: 14, name: 'Leg Press', category: 'Legs' },
  { id: 15, name: 'Leg Curl', category: 'Legs' },
  { id: 16, name: 'Calf Raises', category: 'Legs' },
  { id: 17, name: 'Glute Bridge', category: 'Legs' },

  // SHOULDERS
  { id: 18, name: 'Shoulder Press', category: 'Shoulders' },
  { id: 19, name: 'Lateral Raise', category: 'Shoulders' },
  { id: 20, name: 'Front Raise', category: 'Shoulders' },
  { id: 21, name: 'Shrugs', category: 'Shoulders' },

  // CORE / ABS
  { id: 22, name: 'Crunches', category: 'Core' },
  { id: 23, name: 'Bicycle Crunches', category: 'Core' },
  { id: 24, name: 'Russian Twist', category: 'Core' },
  { id: 25, name: 'Leg Raises', category: 'Core' },
  { id: 26, name: 'Mountain Climbers', category: 'Core' },

  // CARDIO
  { id: 27, name: 'Jumping Jacks', category: 'Cardio' },
  { id: 28, name: 'Burpees', category: 'Cardio' },
  { id: 29, name: 'High Knees', category: 'Cardio' },
  { id: 30, name: 'Running', category: 'Cardio' },

  // PUSH-UP VARIATIONS
  { id: 31, name: 'Diamond Push-ups', category: 'Chest' },
  { id: 32, name: 'Wide Push-ups', category: 'Chest' },
  { id: 33, name: 'Decline Push-ups', category: 'Chest' },

  // PULL-UP VARIATIONS
  { id: 34, name: 'Chin-ups', category: 'Back' },
  { id: 35, name: 'Wide Grip Pull-ups', category: 'Back' },

  // YOGA / STRETCHING
  { id: 36, name: 'Yoga Sun Salutation', category: 'Stretching' },
  { id: 37, name: 'Cat-Cow Stretch', category: 'Stretching' },
  { id: 38, name: 'Child’s Pose', category: 'Stretching' },
  { id: 39, name: 'Hamstring Stretch', category: 'Stretching' },
  { id: 40, name: 'Quad Stretch', category: 'Stretching' }
];


  


categories: string[] = [
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Core',
  'Cardio',
  'Stretching'
];

currentCategory: string | null = null;
tempSelection: Exercise[] = []; // privremeni izbor u modal-u
showExerciseSelector: boolean = false;



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

      this.reloadWorkouts();
      
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


getExercisesForCurrentCategory() {
    if (!this.currentCategory) return [];
    return this.exercises.filter(e => e.category === this.currentCategory);
  }

  selectCategory(cat: string) {
    this.currentCategory = cat;
    this.tempSelection = this.selectedExercises.filter(e => e.category === cat);
  }

  toggleExercise(ex: Exercise) {
    const idx = this.tempSelection.findIndex(e => e.id === ex.id);
    if (idx > -1) this.tempSelection.splice(idx, 1);
    else this.tempSelection.push(ex);
  }

  cancelSelection() {
    this.currentCategory = null;
  }

  confirmSelection() {
    this.selectedExercises = [
      ...this.selectedExercises.filter(e => e.category !== this.currentCategory),
      ...this.tempSelection
    ];
    this.currentCategory = null;
    this.showExerciseSelector = false;
  }

  isExerciseSelected(ex: Exercise) {
    return this.tempSelection.some(e => e.id === ex.id);
  }

  get selectedExerciseNames(): string {
    return this.selectedExercises.map(e => e.name).join(', ');
  }


  // Logout
  logout() {
    this.authService.logout();
  }
}
