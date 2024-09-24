import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesColegioPage } from './reportes-colegio.page';

describe('ReportesColegioPage', () => {
  let component: ReportesColegioPage;
  let fixture: ComponentFixture<ReportesColegioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportesColegioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
