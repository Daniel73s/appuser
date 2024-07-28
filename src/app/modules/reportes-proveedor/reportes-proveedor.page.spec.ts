import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesProveedorPage } from './reportes-proveedor.page';

describe('ReportesProveedorPage', () => {
  let component: ReportesProveedorPage;
  let fixture: ComponentFixture<ReportesProveedorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReportesProveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
