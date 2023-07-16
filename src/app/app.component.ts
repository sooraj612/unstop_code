import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seatArray: any[][];
  selectedSeatNumbers: number[];
  seatCount: number;
  seatIndices: number[];
  reservedSeatNumbers: number[];

  constructor() {
    this.seatArray = [];
    this.selectedSeatNumbers = [];
    this.seatCount = 0;
    this.seatIndices = [];
    this.reservedSeatNumbers = [5, 10, 15, 62, 73, 52, 45]; // Example reserved seat numbers (seats+1)
    this.initializeSeats();
  }

  initializeSeats(): void {
    const totalSeats = 80;
    const rows = Math.floor(totalSeats / 7);
    const lastRowSeats = totalSeats % 7;

    let seatNumber = 1;

    for (let row = 1; row <= rows; row++) {
      const rowSeats = Array.from({ length: 7 }, () => {
        const seat = {
          seatNumber: seatNumber++,
          reserved: this.reservedSeatNumbers.includes(seatNumber),
        };
        return seat;
      });
      this.seatArray.push(rowSeats);
    }

    if (lastRowSeats > 0) {
      const lastRow = Array.from({ length: lastRowSeats }, () => {
        const seat = {
          seatNumber: seatNumber++,
          reserved: this.reservedSeatNumbers.includes(seatNumber),
        };
        return seat;
      });
      this.seatArray.push(lastRow);
    }

    this.calculateSeatIndices();
  }

  calculateSeatIndices(): void {
    const numRows = Math.ceil(this.seatArray.length / 7);
    this.seatIndices = Array.from({ length: numRows }, (_, index) => index * 7);
  }

  reserve(seatCount: number): void {
    const availableSeats = this.flattenSeatArray().filter(
      (seat) => !seat.reserved
    );

    if (seatCount > availableSeats.length) {
      alert('Sorry, there are not enough available seats.');
      return;
    }

    this.selectedSeatNumbers = [];

    for (let i = 0; i < seatCount && i < availableSeats.length; i++) {
      const seat = availableSeats[i];
      this.selectedSeatNumbers.push(seat.seatNumber);
      seat.reserved = true;
    }

    this.seatCount = 0;
  }

  flattenSeatArray(): any[] {
    return ([] as any[]).concat(...this.seatArray);
  }

  isSeatSelected(seatNumber: number): boolean {
    return this.selectedSeatNumbers.includes(seatNumber);
  }
}
