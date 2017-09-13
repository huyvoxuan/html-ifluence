import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { API } from '../../api';

@Injectable()
export class CommentService {
  constructor(private baseService: BaseService) {
  }
  /**
   * get all comment of tour/tip/event..
   * @param id {number}
  **/
  getComments(id: number, type?: string) {
    let url = API.URL.COMMENTS.TYPE.replace('{typeName}', type);
    url = `${url}${id}&pageNumber=1`;
    return this.baseService.getData(url);
  }
  /**
   * post a comment for tour/tip/event..
   * @param type {string}
   * @param body {FormData}
  **/
  postComment(type: string, body: FormData) {
    const url = `${API.URL.COMMENTS.ADD.PREFIX}${type}${API.URL.COMMENTS.ADD.SURFIX}`;
    // return this.baseService.postDataWithFormDataNew(url, body);
    return this.baseService.postDataFormDataType(url, body);
  }
}
