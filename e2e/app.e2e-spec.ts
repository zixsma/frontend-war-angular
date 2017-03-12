import { FrontendWarAngularPage } from './app.po';

describe('frontend-war-angular App', () => {
  let page: FrontendWarAngularPage;

  beforeEach(() => {
    page = new FrontendWarAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
