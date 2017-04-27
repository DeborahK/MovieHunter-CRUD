import { MovieHunterCLIPage } from './app.po';

describe('movie-hunter-cli App', () => {
  let page: MovieHunterCLIPage;

  beforeEach(() => {
    page = new MovieHunterCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
