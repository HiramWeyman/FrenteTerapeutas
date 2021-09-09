import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordtrabajoComponent } from './recordtrabajo.component';

describe('RecordtrabajoComponent', () => {
  let component: RecordtrabajoComponent;
  let fixture: ComponentFixture<RecordtrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordtrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordtrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
