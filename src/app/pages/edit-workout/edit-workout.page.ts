import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from '../../services/firebase.service';

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
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.page.html',
  styleUrls: ['./edit-workout.page.scss'],
  standalone: false
})
export class EditWorkoutPage {

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  allExercises: Exercise[] = [
  { id: 1, name: 'Push-ups' },
  { id: 2, name: 'Pull-ups' },
  { id: 3, name: 'Squats' },
  { id: 4, name: 'Lunges' },
  { id: 5, name: 'Plank' }
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
