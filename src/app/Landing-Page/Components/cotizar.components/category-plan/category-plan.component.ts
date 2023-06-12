import { Component, Input } from '@angular/core';
import { planbeneficio } from 'src/app/Shared/models/Pages/planbeneficio.model';

@Component({
  selector: 'category-plan',
  templateUrl: './category-plan.component.html',
  styleUrls: ['./category-plan.component.css']
})
export class CategoryPlanComponent {

  @Input() plan! : planbeneficio;

}
