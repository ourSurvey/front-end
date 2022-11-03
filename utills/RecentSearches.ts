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
    const list = this.get(Search.RECENT_SEARCH);
    if (!list) {
      return JSON.stringify([]);
    }
    return this.get(Search.RECENT_SEARCH);
  }

  public setSearches(value: string) {
    const localData = this.getSearches();
    const searchData = localData ? JSON.parse(localData as string) : [];
    const newList = [...new Set([value, ...searchData])]; //중복 값 제거
    if (searchData.length > 30) {
      searchData.pop();
      this.set(Search.RECENT_SEARCH, JSON.stringify([value, ...searchData]));
    } else {
      this.set(Search.RECENT_SEARCH, JSON.stringify(newList));
    }
  }

  public deleteSearch(value: string) {
    const localData = this.getSearches();
    const searchData = localData ? JSON.parse(localData as string) : [];
    const newList = searchData.filter((item: string) => item !== value);
    this.set(Search.RECENT_SEARCH, JSON.stringify(newList));
  }

  public clear() {
    this.clearItems([Search.RECENT_SEARCH]);
  }
}
