/* eslint-disable no-underscore-dangle */
import _ from "lodash";
import { action, observable, runInAction } from "mobx";

export default abstract class ListService<T> {
  protected getAPI: Function;

  @observable found: Array<T> = [];

  @observable total = 0;

  @observable isLoading = false;

  // _filters: object = {};

  // get filters(): object {
  //   return this._filters;
  // }

  // set filters(currentFilters: object) {
  //   this._filters = currentFilters;
  // }

  constructor(getAPI: Function) {
    this.getAPI = getAPI;
    this.total = 0;
  }

  protected abstract getFind(): {};

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected abstract parseJsonToInstance(json: any): T;

  @action
  reset(): void {
    this.total = 0;
    this.found = [];
    this.isLoading = true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected customizer = (objValue: any, srcValue: any) => {
    if (_.isArray(objValue) && _.isObject(srcValue) && !_.isEmpty(srcValue)) {
      return objValue.concat(srcValue);
    }
    return undefined;
  };

  @action
  async request(): Promise<void> {
    try {
      this.isLoading = true;
      const find = this.getFind();

      // _.mergeWith(find, this.filters, this.customizer);

      const { data } = await this.getAPI({
        find
      });
      this.total = data.total;

      runInAction(() => {
        try {
          this.found = data.found.map((item: any) =>
            this.parseJsonToInstance(item)
          );
        } catch (error) {
          throw new Error(
            `500 - Incorrect data type received from API: ${error}`
          );
        }

        this.isLoading = false;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
