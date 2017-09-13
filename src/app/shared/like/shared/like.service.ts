import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { API } from '../../api';

@Injectable()
export class LikeService {

  constructor(private baseService: BaseService) { }

  /**
   * like/unlike a event, attraction, tour, tip, comment
   * params define likes/{likeType:string}/{parentId:int}/{isLike:int}/like
   * @param liketype {string} event, attraction, tour, tip, comment
   * @param parentID {number}
   * @param isLike {number} - 0/1
  **/
  postLikeOrUnlike(type: string, parentID: number, isLike: number) {
    const url = `${API.URL.LIKE.DEFAULT}/${type}/${parentID}/${isLike}/like`;
    return this.baseService.postData(url, '');
  }
}
