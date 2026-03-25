import { inject, Injectable, Signal } from '@angular/core';
import { IdHttpService } from './id-http.service';

@Injectable({
  providedIn: 'root',
})
export class IdService {

  private idHttpService: IdHttpService = inject(IdHttpService);

  public readonly online: Signal<boolean> = this.idHttpService.online;

}
