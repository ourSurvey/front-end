import Storage from './Storage';

enum Search {
  RECENT_SEARCH = 'recent_search',
}

export default class RecentSearch extends Storage<Search> {
  private static instance?: RecentSearch;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RecentSearch();
    }

    return this.instance;
  }

  public getSearches() {
    return this.get(Search.RECENT_SEARCH);
  }

  public setSearches(value: string) {
    this.set(Search.RECENT_SEARCH, value);
  }

  public clear() {
    this.clearItems([Search.RECENT_SEARCH]);
  }
}
