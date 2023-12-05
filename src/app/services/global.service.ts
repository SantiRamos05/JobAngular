import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public convertToDate(releasedDate: string): Date {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    const [day, month, year] = releasedDate.split(" ");
    const monthIndex = months.findIndex(m => m === month);
    return new Date(`${year}-${monthIndex + 1}-${day}`);
  }
}
