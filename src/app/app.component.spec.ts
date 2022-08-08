import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'jesttest'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jesttest');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'jesttest app is running!'
    );
  });

  // exact equality
  it('2 + 2 es 4', () => {
    expect(2 + 2).toBe(4);
  });
  // object testing
  it('Object values', () => {
    const data = { name: 'pablo' };
    expect(data).toEqual({ name: 'pablo' });
  });

  it('null values', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it('Zero values', () => {
    const n = 0;
    expect(n).not.toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it('2+2', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe or ToEqual son equivalentes para numeros
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  it('adding floatoing poinst numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).toBeCloseTo(0.3); // necesitamos usar tobecloseto porque los numero reales no son exactos y esa operacion da 0.3333
  });

  // strings
  it('no hay un D en techops', () => {
    expect('Techops').not.toMatch(/D/);
  });

  it('existe una palabra World en techopsWorld', () => {
    expect('Techopsworld').toMatch(/world/);
  });
});
