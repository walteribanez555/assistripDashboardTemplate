import { Pipe, PipeTransform , Injectable} from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';

@Pipe({ name: 'extractDate' })

@Injectable()
export class ExtractDatePipe implements PipeTransform {

  constructor(private utilsService: UtilsService) { }

  transform(value: string): string {
    return value.split('T')[0].replace(/-/g, "/");
  }
}
