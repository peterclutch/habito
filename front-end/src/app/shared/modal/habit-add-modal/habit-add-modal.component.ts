import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ModalOverlayRef } from '../modal-overlay-ref';
import { Router } from '@angular/router';
import { HabitService } from '../../service/habit.service';
import { HABITO_MODAL_DATA } from '../modal.token';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from '../../directive/button/button.directive';
import { Routes } from '../../../routes';
import { Habit } from '../../model/habit.model';

@Component({
  templateUrl: './habit-add-modal.component.html',
  styleUrls: ['./habit-add-modal.component.scss']
})
export class HabitAddModalComponent implements OnInit {

  _degree: number = 0;
  loading: boolean = false;
  habitForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    icon: ['', [Validators.required]]
  })
  buttonType = ButtonType;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private habitService: HabitService,
    public modalRef: ModalOverlayRef,
    @Inject(HABITO_MODAL_DATA) public action: (data: any) => void
  ) { }

  get degree(): string {
    return `${this._degree}deg`;
  }

  close(): void {
    this.modalRef.close();
  }

  createHabit(): void {
    this.loading = true;

    this.habitService.create(this.habitForm.value).subscribe((habit: Habit) => {
      this.close();
      this.action(habit);
      this.router.navigate([Routes.habits(habit.id)])
    }, () => {
      this.loading = false;
    });
  }

  ngOnInit(): void {
    setInterval(() => {
      this._degree = this._degree >= 360 ? 0 : this._degree + 2;
    }, 80);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.close();
  }
}
