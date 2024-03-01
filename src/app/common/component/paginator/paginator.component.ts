import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

/* Resuable Component to apply pagination on a page */

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @ViewChild('page') page!: ElementRef;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.page.nativeElement.value = this.currentPage;
      this.pageChanged.emit(page);
    }
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }


  goToPage(page: string): void {
    const pageNumber = parseInt(page, 10);
    if (pageNumber && pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.pageChanged.emit(pageNumber);
    }
  }
}
