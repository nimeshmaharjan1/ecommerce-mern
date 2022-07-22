class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  /**
   * It searches for a keyword in the database and returns the result
   * @returns The query object
   */
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: 1,
          },
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }
  /**
   * We are creating a new object called filteredQuery, which is a copy of the queryString object. We
   * then remove the keys that we don't want to filter by, and then we replace the gt, gte, lt, and lte
   * with the $ sign
   * @returns The query object
   */
  filter() {
    const filteredQuery = { ...this.queryString };
    const keysToRemove = ["keyword", "page", "limit"];
    keysToRemove.forEach((key) => delete filteredQuery[key]);

    //Filter for price and rating
    let queryString = JSON.stringify(filteredQuery);
    /* greater than greater than or equals to
     * $gt $gte
     */
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  /**
   * If the current page is two then skip 10 items and show from the 11th item
   * @param resultPerPage - The number of results you want to show per page.
   */
  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    // if the current page is two then skip 10 items and show from the 11th item
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
export default APIFeatures;
