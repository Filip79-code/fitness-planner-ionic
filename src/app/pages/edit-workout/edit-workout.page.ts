import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';

interface Exercise {
  id: number;
  name: string;
  category: string;
}

interface Workout {
  name: string;
  day: string;
  duration: number;
  dateCreated: string;
  exercises: Exercise[];
}

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.page.html',
  styleUrls: ['./edit-workout.page.scss'],
  standalone: false
})
export class EditWorkoutPage {

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  allExercises: Exercise[] = [
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
  @Input() userId!: string;
  @Input() workoutId!: string;
  @Input() workout!: Workout;

  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FirebaseService
  ) {}

  updateWorkout() {
    this.firebaseService
      .updateWorkout(this.userId, this.workoutId, this.workout)
      .subscribe(() => {
        this.modalCtrl.dismiss(true); // true = uspešan update
      });
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }
}
