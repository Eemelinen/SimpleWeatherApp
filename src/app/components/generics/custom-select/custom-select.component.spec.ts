import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomSelectComponent } from './custom-select.component';

const imageFolderUrl = 'assets/images';

fdescribe('CustomSelectComponent', () => {
  let component: CustomSelectComponent;
  let fixture: ComponentFixture<CustomSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectComponent);
    component = fixture.componentInstance;
    component.imageFolderUrl = imageFolderUrl;
    component.options = ['test', 'test2'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a dropdown element', () => {
    expect(component.dropdownElement).toBeTruthy();
  });

  it('should have a button with currentValue in img src inside it', () => {
    component.currentValue = 'test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dropdown-image').src)
      .toContain(`${imageFolderUrl}/${component.currentValue.toLowerCase()}.svg`);
  });

  it('button content element should have currentValue as its innerHtml', () => {
    component.currentValue = 'test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dropdown-value').innerText)
      .toContain(component.currentValue);
  });

  it('should have a dropdown element with a list of options', () => {
    expect(component.dropdownElement).toBeTruthy();
  });

  it('dropdown-list should have 1 item per option', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.list-item-content').length).toEqual(component.options.length);
  });

  it('list-item-content element should have an image with imgFolderUrl and option in its source',
    () => {
      const compiled = fixture.nativeElement;
      const listItems = compiled.querySelectorAll('.list-item-content');
      listItems.forEach((listItem: any, index: number) => {
        expect(listItem.querySelector('img').src)
          .toContain(`${imageFolderUrl}/${component.options[index].toLowerCase()}.svg`);
      });
    });

  it('clicking on a list item should set currentValue to the option', () => {
    const compiled = fixture.nativeElement;
    const listItems = compiled.querySelectorAll('.list-item-content');
    listItems[1].click();
    fixture.detectChanges();
    expect(component.currentValue).toEqual(component.options[1]);
  });

  it('clicking dropdown-button should result in dropdown-list having class dropdown-open',
    () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.dropdown-list').classList).not.toContain('dropdown-open');
      compiled.querySelector('.dropdown-button').click();
      fixture.detectChanges();
      expect(compiled.querySelector('.dropdown-list').classList).toContain('dropdown-open');
  });
});
