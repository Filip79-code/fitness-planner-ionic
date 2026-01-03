import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',               // Ruta za login stranicu
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'workout-schedule',
    loadChildren: () => import('./pages/workout-schedule/workout-schedule.module').then( m => m.WorkoutSchedulePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'track-nutrition',
    loadChildren: () => import('./pages/track-nutrition/track-nutrition.module').then( m => m.TrackNutritionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-workout',
    loadChildren: () => import('./pages/edit-workout/edit-workout.module').then( m => m.EditWorkoutPageModule)
  },
  {
    path: 'edit-meal',
    loadChildren: () => import('./pages/edit-meal/edit-meal.module').then( m => m.EditMealPageModule)
  },
  {
    path: 'daily-goals',
    loadChildren: () => import('./pages/daily-goals/daily-goals.module').then( m => m.DailyGoalsPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
